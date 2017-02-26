// Global accessor that the popup uses.
var tab2url = {};
var selectedId = null;
var selectedUrl = null;

function updateTab(tabId, url) {
  tab2url[tabId] = url;
  if (!url) {
    chrome.pageAction.hide(tabId);
  } else {
    chrome.pageAction.show(tabId);
    if (selectedId == tabId) {
      updateSelected(tabId);
    }
  }
}

function updateSelected(tabId) {
  selectedUrl = tab2url[tabId];
  selectedId = tabId;
  if (selectedUrl)
    chrome.pageAction.setTitle({tabId:tabId, title:selectedUrl});
}

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  if (change.status == "complete") {
    updateTab(tabId, tab.url);
  }
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, info) {
  selectedId = tabId;
  updateSelected(tabId);
});

// Ensure the current selected tab is set up.
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  updateTab(tabs[0].id, tabs[0].url);
});