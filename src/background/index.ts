
chrome.runtime.onMessage.addListener(
  function (request, sender) {
    if (request.message === "activate_icon") {
      chrome.pageAction.show(sender.tab.id);
    }
  });
