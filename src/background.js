browser.browserAction.onClicked.addListener(function (tab) {
  if (tab) {
    browser.tabs
      .executeScript(tab.id, {
        file: "js/content-script.js",
      })
      .then(() => {
        chrome.tabs.sendMessage(tab.id, { active: true });
      });
  }
});

browser.tabs.onActivated.addListener(function (active) {
  chrome.tabs.sendMessage(active.tabId, { active: true });
  chrome.tabs.query({ active: false }, function (result) {
    result.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, { active: false });
    });
  });
});
