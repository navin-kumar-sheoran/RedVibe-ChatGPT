function changePageTitle() {
    document.title = "Bonjour's ChatGPT";
  }
  function replaceSvgWithPng() {
    // Find the SVG element you want to replace
    const svgElement = document.querySelector('svg.icon-md'); // Update selector to match your SVG
  
    if (svgElement) {
        // Create a new img element
        const imgElement = document.createElement('img');
  
        // Set the src attribute to the path of your PNG image
        imgElement.src = chrome.runtime.getURL('red-icon.jpg');
  
        // Optionally, you can set the alt attribute and other attributes
        imgElement.alt = 'Custom Image';
        imgElement.width = svgElement.getAttribute('width'); // or set a specific width
        imgElement.height = svgElement.getAttribute('height'); // or set a specific height
  
        // Replace the SVG with the new img element
        svgElement.parentNode.replaceChild(imgElement, svgElement);
    }
  }
  // Function to apply custom styles
  function applyStyles() {
    changePageTitle();
  
     // Remove existing styles with the same ID
    removeAllElementsWithId('my-extension-styles');
    removeAllElementsWithId('my-extension-styles');
   
    const styleSheet = document.createElement('style');
    styleSheet.id = 'my-extension-styles';
    styleSheet.textContent = `
    :root {
      --text-primary: var(--gray-100);
      --text-secondary: var(--gray-400);
      --text-tertiary: var(--gray-500);
      --text-quaternary: var(--gray-600);
      --text-placeholder: hsla(0, 0%, 100%, .8);
      --text-error: #f93a37;
      --border-light: hsla(0, 0%, 100%, .1);
      --border-medium: hsla(0, 0%, 100%, .15);
      --border-heavy: hsla(0, 0%, 100%, .2);
      --border-xheavy: hsla(0, 0%, 100%, .25);
      --border-sharp: hsla(0, 0%, 100%, .05);
      --main-surface-primary: var(--gray-800);
      --main-surface-secondary: var(--gray-750);
      --main-surface-tertiary: var(--gray-700);
      --sidebar-surface-primary: var(--gray-900);
      --sidebar-surface-secondary: var(--gray-800);
      --sidebar-surface-tertiary: var(--gray-750);
      --link: #7ab7ff;
      --link-hover: #5e83b3;
      --surface-error: 249 58 55;
    }
      .hover\\:bg-token-sidebar-surface-secondary:hover {
        background-color: #195055 !important;
      }
      .bg-token-main-surface-primary {
        background-color: transparent !important;
      }
      main {
        background-image: url('${chrome.runtime.getURL('wallpaper.jpg')}') !important;
        background-size: cover !important;
        background-repeat: no-repeat !important;
        background-position: center !important;
        background-blend-mode: darken;
        background-color: rgba(0, 0, 0, 0.5);
      }
      .dark\\:bg-token-main-surface-secondary:is(.dark *) {
        background: radial-gradient(#ab3939, transparent) !important;
      }
      nav {
        background: radial-gradient(#ab3939, transparent) !important;
      }
      .bg-token-sidebar-surface-primary {
        background-color: #693a43 !important;
      }
      .bg-token-sidebar-surface-secondary {
        background-color: #b77b7b !important;
      }
      .disabled\\:dark\\:bg-token-text-quaternary:is(.dark *):disabled {
        background-color: #198b75 !important;
      }
      .dark\\:bg-white:is(.dark *) {
        background-color: rgb(236, 122, 122) !important;
      }
      .text-token-text-secondary {
        color: #ffffff;
        background: radial-gradient(#ab3939, transparent) !important;
      }
      div#radix-\\:r29\\: {
        display: none !important; /* Override the existing display: none */
      }
      .group.flex.cursor-pointer.items-center.gap-1.rounded-lg.py-1\\.5.px-3.text-lg.font-semibold.hover\\:bg-token-main-surface-secondary.radix-state-open\\:bg-token-main-surface-secondary.text-token-text-secondary.overflow-hidden.whitespace-nowrap {
        display: none !important;
      }
        .bg-\\[\\#f4f4f4\\] {
    --tw-bg-opacity: 1;
     color: #ffffff;
    background: radial-gradient(#ab3939, transparent) !important;
  } a.group.flex.gap-2.p-2\\.5.text-sm.cursor-pointer.focus\\:ring-0.radix-disabled\\:pointer-events-none.radix-disabled\\:opacity-50.group.items-center.hover\\:bg-token-sidebar-surface-secondary.m-0.rounded-lg.px-2 {
            display: none !important;
          }
            .bg-gray-950 {
    --tw-bg-opacity: 1;
    background: radial-gradient(#72405591, #301c1c);
  }
    `;
    document.head.appendChild(styleSheet);
  
    // Change text content
    const targetElement = document.querySelector('.text-token-text-secondary');
    if (targetElement) {
      targetElement.textContent = "Bonjour's ChatGPT";
    }
  }
  
  // Function to remove all elements with the specified ID
  function removeAllElementsWithId(id) {
    const elements = document.querySelectorAll(`#${id}`);
    elements.forEach(element => {
        element.remove();
    });
  }
  
  // Function to remove custom styles
  function removeStyles() {
    removeAllElementsWithId('my-extension-styles');
  
    // Restore the original text content if needed
    const targetElement = document.querySelector('.text-token-text-secondary');
    if (targetElement) {
        targetElement.textContent = "ChatGPT"; // Restore to original text
    }
  }
  
  // Apply styles based on stored state
  chrome.storage.local.get('extensionEnabled', (result) => {
    if (result.extensionEnabled !== false) {
        applyStyles();
    }
  });
  
  // Function to observe DOM changes and apply styles if needed
  function observeDOMChanges() {
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // Apply styles and text changes when elements are added
                applyStyles();
                //replaceSvgWithPng();
            }
        }
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  }
  
  // Start observing DOM changes
  observeDOMChanges();
  
  // Listen for messages from the background script or popup
  chrome.runtime.onMessage.addListener((message) => {
    console.log(message);
    if (message.action === 'enable') {
        applyStyles();
    } else if (message.action === 'disable') {
        removeStyles();
    }
  });
  