$("#save").click(function() {
  chrome.storage.sync.set({
    ghToken: $("#ghToken").val()
  })
})

jQuery(function() {
  chrome.storage.sync.get(function(data) {
    options = data;
    $("#ghToken").val(options["ghToken"])
  })
})
