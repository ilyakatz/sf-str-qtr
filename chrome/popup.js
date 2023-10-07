const root = document.getElementById("root");
const iframe = document.createElement("iframe");

iframe.src = chrome.runtime.getURL("build/index.html");
iframe.frameBorder = 0;
iframe.width = "100%";
iframe.height = "100%";
iframe.style.maxHeight = "none";

root.appendChild(iframe);
