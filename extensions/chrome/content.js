// config
var options = {}
var dataSet = {}

function queryGithub(token,user,repo) {
  $.ajax({
    method: "POST",
    url: "https://api.github.com/graphql",
    contentType: "application/json",
    headers: {
      Authorization: "bearer " + token
    },
    data: JSON.stringify({
      query: `query {
        repository(owner:"` + user + `", name:"` + repo + `") {
          issues(last: 100) {
            edges {
              node {
                id
                number
                databaseId
                bodyHTML
              }
            }
          }
        }
      }`
    })
  })
  .done(function(response) {
    createDataSet(response)
    updateUI()
  })
  .fail(function(failed) {
    console.log(failed)
  })
}

function loadOptions() {
  chrome.storage.sync.get(function(data) {
    options = data;
    var pathArray = window.location.pathname.split('/');
    options["ghUser"] = pathArray[1]
    options["ghRepo"] = pathArray[2]
    queryGithub(options["ghToken"], options["ghUser"], options["ghRepo"])
  })
}

function parseForTimes(body) {
  times = {}
  $(body).filter("pre[lang='times']").text().split("\n").forEach(function(j) {
    a = j.split(':')
    name = a[0]
    hours = parseInt(a[1])
    if ((name != "") && (hours != undefined)) { times[name] = hours }
  })
  return times
}

function parseIssue(issue) {
  dataSet[issue.databaseId] = parseForTimes(issue.bodyHTML)
}

function createDataSet(response) {
  response.data.repository.issues.edges.forEach(function(item) { parseIssue(item.node) })
}

function updateUI() {
  var issues = $(".Box").find(".Box-row");
  issues.each(function( index, el ) {
    id = $(el).data('id')
    value = Object.values(dataSet[id]).reduce((a, hours) => a += hours)
    snippet = '<div class="float-right col-6 no-wrap pt-2 pr-3 text-right">' + 
      '<span class="progress-bar v-align-middle" style="height: 6px;"><span class="progress" style="width: 20%"></span></span><span class="task-progress-counts">' +
        value + " hrs" +
      '</span>' +
    '</div>'
    $(el).children().first().children().last().children().last().append($(snippet))
  })  
}

loadOptions()
