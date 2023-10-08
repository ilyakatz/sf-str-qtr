// import { fillOutForm } from "./FilloutForm";
import FormDataItem from "./FormDataItem";

export function fillInForm(formData: FormDataItem[]) {
  // Implement your logic here using the formData array
  console.log("Form data submitted:", formData);


  // @ts-ignore
  chrome.tabs.query(
    { active: true, lastFocusedWindow: true },
    // @ts-ignore
    (tabs: chrome.tabs.Tab[]) => {
      // @ts-ignore
      tabs.forEach((tab: chrome.tabs.Tab) => {
        // @ts-ignore
        chrome.tabs.sendMessage(tab.id, {
          data: formData,
        });
      });
    }
  );
}
