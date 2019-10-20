// config
var token = "619912bfb465edf0f936ed7f25369b4fdccd7e1a"
var user = "IAmNaN"
var repo = "aimee"
var dataSet = {}

function queryGithub(t,u,r) {
  $.ajax({
    method: "POST",
    url: "https://api.github.com/graphql",
    contentType: "application/json",
    headers: {
      Authorization: "bearer " + t
    },
    data: JSON.stringify({
      query: `query {
        repository(owner:"` + u + `", name:"` + r + `") {
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

queryGithub(token, user, repo)

// debugger
