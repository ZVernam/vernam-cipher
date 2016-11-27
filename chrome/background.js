chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                // When a page contains a password input
                new chrome.declarativeContent.PageStateMatcher({
                    css: ['input[type="password"]']
                })
            ],
            // ... show the page action.
            actions: [new chrome.declarativeContent.ShowPageAction() ]
        }]);
    });
});