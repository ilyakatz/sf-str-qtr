// Copyright 2023 ilya
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// debugger;
// var iframeObject = document.getElementById("myIframe");

// const { send } = require("process");

// function handleIframeMutation(mutations) {
//   mutations.forEach((mutation) => {
//     if (mutation.type === "childList") {
//       mutation.addedNodes.forEach((node) => {
//         if (node.tagName && node.tagName.toLowerCase() === "iframe") {
//           sendIframeToBackground(node);
//           // var iframe = window.frames["ACADialogFrame"];
//           // if (iframe !== undefined) {
//             // sendIframeToBackground(iframe);
//           // }
//         }
//       });
//     }
//   });
// }

// function sendIframeToBackground(iframe) {
//   chrome.runtime.sendMessage({ iframeReference: iframe });
// }

// // Create a MutationObserver to watch for DOM changes
// const observer = new MutationObserver(handleIframeMutation);
// observer.observe(document, { childList: true, subtree: true });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'UpdateIframeElement') {
    const iframe = document.getElementById('myIframe');
    const iframeDocument = iframe.contentDocument;
    const element = iframeDocument.getElementById('myElement');
    element.innerHTML = 'New HTML content';
  }
});