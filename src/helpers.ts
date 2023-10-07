// import { fillOutForm } from "./FilloutForm";
import FormDataItem from "./FormDataItem";

export function fillInForm(formData: FormDataItem[]) {
  // Implement your logic here using the formData array
  console.log("Form data submitted:", formData);
  // Call your backend API or perform any required actions
  // fillOutForm(
  //   formData[0].typeOfStay,
  //   formData[0].currentQuarter,
  //   formData[0].currentYear,
  //   formData[0].checkIn + formData[0].currentYear,
  //   formData[0].checkOut + formData[0].currentYear,
  //   formData[0].airbnbId
  // );

  // @ts-ignore
  chrome.tabs.query(
    { active: true, lastFocusedWindow: true },
    // @ts-ignore
    (tabs: chrome.tabs.Tab[]) => {
      // @ts-ignore
      tabs.forEach((tab: chrome.tabs.Tab) => {
        // @ts-ignore
        chrome.tabs.sendMessage(tab.id, {
          message: formData,
        });
      });
    }
  );
}
