chrome.action.onClicked.addListener(async (tab) => {
    chrome.storage.local.get('extensionEnabled', (result) => {
        const isEnabled = result.extensionEnabled !== false;
        const newStatus = !isEnabled;

        // Update the extension's enabled state in storage
        chrome.storage.local.set({ extensionEnabled: newStatus });

        // Send a message to the content script to apply or remove styles
        chrome.tabs.sendMessage(tab.id, { action: newStatus ? 'enable' : 'disable' });
    });
});
