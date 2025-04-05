let usageTime = 0;
let activeTabId = null;
let startTime = null;

chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, tab => {
    if (tab.url.includes("instagram.com")) {
      startTime = Date.now();
      activeTabId = tab.id;
    } else {
      if (startTime && activeTabId === activeInfo.tabId) {
        usageTime += Date.now() - startTime;
        startTime = null;
      }
    }
    chrome.storage.local.set({ usageTime });
  });
});

chrome.alarms.onAlarm.addListener(() => {
  if (usageTime > 30 * 60 * 1000) {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "Instagram Limit Reached",
      message: "You’ve spent over 30 minutes today!",
      priority: 2
    });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("checkInstagramUsage", { periodInMinutes: 1 });
});
