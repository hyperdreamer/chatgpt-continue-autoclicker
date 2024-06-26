// Define the extension version and update description
const currentVersion = "1.5.3"; // Replace with your current extension version
const updateDescription = `Fixed new update on the UI of ChatGPT causing issues on the Auto Full Mode.`;

// Check if the extension has been updated
chrome.runtime.onInstalled.addListener(async function (details) {
  if (details.reason === "install") {
    // This block will be executed only when the extension is installed
    const tabs = await chrome.tabs.query({ url: "https://chatgpt.com/*" });

    if (tabs.length > 0) {
      await chrome.notifications.create({
        type: "basic",
        iconUrl: "./images/icon128.png",
        title: "Reload OpenAI Tabs?",
        message:
          "Would you like to reload your OpenAI tabs to activate the extension?",
        buttons: [{ title: "Reload" }],
        priority: 2,
      });
    }
  } else if (details.reason === "update") {
    // This block will be executed only when the extension is updated
    const tabs = await chrome.tabs.query({ url: "https://chatgpt.com/*" });

    if (tabs.length > 0) {
      await chrome.notifications.create({
        type: "basic",
        iconUrl: "./images/icon128.png",
        title: "Continue Generating was updated!",
        message:
          "Your extension has been updated to version " +
          currentVersion +
          ". \n" +
          updateDescription,
        buttons: [{ title: "Great! Reload OpenAI Tabs!" }],
        priority: 2,
      });
    }
  }
});

chrome.notifications.onButtonClicked.addListener(async function () {
  const tabs = await chrome.tabs.query({ url: "https://chatgpt.com/*" });

  tabs.forEach((tab) => {
    chrome.tabs.reload(tab.id);
  });
});



