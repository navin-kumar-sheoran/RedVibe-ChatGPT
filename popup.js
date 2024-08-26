document.getElementById('enableButton').addEventListener('click', () => {
  chrome.storage.local.set({ extensionEnabled: true }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0]) {
              chrome.tabs.sendMessage(tabs[0].id, { action: 'enable' });
          }
      });
  });
});

