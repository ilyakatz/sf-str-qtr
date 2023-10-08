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

let formElement = null;
var $formJquery = null;
let specificFrame: document = null;

function setupContext() {
  console.log(`Updating context`);
  specificFrame = window.frames["ACADialogFrame"].document;
  formElement = specificFrame.querySelector("form");
  console.log(`✅ Updated frame context`);
}

export function fillOutForm(
  typeOfStay = "Hosted",
  currentQuarter,
  currentYear,
  checkIn,
  checkOut,
  airbnbId
) {
  setupContext();
  updateTypeOfStay(typeOfStay);
  updateCurrentQuarter(currentQuarter);
  setCurrentYear(currentYear);
  updateCheckinDate(checkIn);
  updateCheckoutDate(checkOut);
  selectAirbnb();
  updateAirbnbListingId(airbnbId);
  submitForm();
}

function updateTypeOfStay(typeOfStay) {
  console.log(`Updating type of stay`);
  const selectElement = specificFrame.querySelector("select");
  selectElement.value = typeOfStay;
  if (selectElement.value === typeOfStay) {
    console.log(`✅ Type of stay set to ${selectElement.value}`);
  } else {
    console.log(`❌ Type of stay is not set correctly`);
  }
}

function updateAirbnbListingId(airbnbId) {
  console.log(`Updating Airbnb Listing ID`);

  // Find the label element
  var labels = specificFrame.querySelectorAll("label");
  var labelElement = null;
  labels.forEach(function (label) {
    if (label.innerText === "Listing ID:") {
      labelElement = label;
    }
  });

  if (labelElement) {
    // Find the input element
    var input = labelElement.closest(".ACA_Form").querySelector("input");

    if (input) {
      input.value = airbnbId;
    } else {
      console.log(`❌ Input element not found for ${input}`);
    }
  } else {
    console.log(`❌ Label element not found for ${labelElement}`);
  }
}

function selectAirbnb() {
  console.log(`Selecting Airbnb service`);

  // Find the label element
  var labels = specificFrame.querySelectorAll("label");
  var serviceLabel = null;
  var regex = /^Service Name/;
  labels.forEach(function (label) {
    if (regex.test(label.textContent)) {
      serviceLabel = label;
    }
  });

  if (serviceLabel) {
    // Find the parent element with class "ACA_Form"
    var parentACAForm = serviceLabel.closest(".ACA_Form");

    if (parentACAForm) {
      // Find the select element within the parent element
      var serviceSelect = parentACAForm.querySelector("select");

      if (serviceSelect) {
        // Create an array for storing select options values
        var serviceDropdownValues = [];

        // Iterate through the option elements
        serviceSelect.querySelectorAll("option").forEach(function (option) {
          var value = option.value;
          if (value !== "") {
            serviceDropdownValues.push(value);
          }
        });

        if (serviceDropdownValues.length > 0) {
          var service = serviceDropdownValues[0];

          // Set the value of the select element
          serviceSelect.value = service;
          console.log(`✅ Service set to ${service}`);
        } else {
          console.log(`❌ No valid service values found`);
        }
      } else {
        console.log(`❌ Select element not found within .ACA_Form`);
      }
    } else {
      console.log(`❌ .ACA_Form parent element not found`);
    }
  } else {
    console.log(`❌ Label element not found`);
  }
}

function updateCheckoutDate(checkOutDate) {
  if (updateDate("Check Out Date:", checkOutDate)) {
    console.log(`✅ Check Out Date updated successfully`);
  } else {
    console.log(`❌ Check Out Date update failed`);
  }
}

function updateCheckinDate(checkInDate) {
  if (updateDate("Check In Date:", checkInDate)) {
    console.log(`✅ Check In Date updated successfully`);
  } else {
    console.log(`❌ Check In Date update failed`);
  }
}

function updateDate(labelText, dateValue) {
  // Find the label element
  var labels = specificFrame.querySelectorAll("label");
  var dateLabel = null;
  labels.forEach(function (label) {
    if (label.textContent.includes(labelText)) {
      dateLabel = label;
    }
  });

  if (dateLabel) {
    // Find the input element
    var dateInput = dateLabel.closest(".ACA_Form").querySelector("input");

    if (dateInput) {
      // Set the value of the input element
      dateInput.value = dateValue;
      return true; // Operation succeeded
    } else {
      console.log(`❌ Input element not found for ${labelText}`);
    }
  } else {
    console.log(`❌ Label element not found for ${labelText}`);
  }
  return false; // Operation failed
}

function setCurrentYear(currentYear) {
  // Find the label element
  var labels = specificFrame.querySelectorAll("label");
  var reportingYearLabel = null;
  labels.forEach(function (label) {
    if (label.textContent.includes("Reporting Year:")) {
      reportingYearLabel = label;
    }
  });

  if (reportingYearLabel) {
    // Find the input element
    var reportingYearInput = reportingYearLabel
      .closest(".ACA_Form")
      .querySelector("input");

    if (reportingYearInput) {
      // Set the value of the input element
      reportingYearInput.value = currentYear;
    } else {
      console.log(`❌ Input element not found`);
    }
  } else {
    console.log(`❌ Label element not found`);
  }
}

function updateCurrentQuarter(currentQuarter) {
  var quarters = {
    1: "January-March",
    2: "April-June",
    3: "July-September",
    4: "October-December",
  };

  var currentQuarterValue = quarters[currentQuarter];
  console.log("Updating current quarter to " + currentQuarterValue);

  // Find the label element
  var labels = specificFrame.querySelectorAll("label");
  var reportingPeriodLabel = null;
  labels.forEach(function (label) {
    if (label.textContent.includes("Reporting Period:")) {
      reportingPeriodLabel = label;
    }
  });

  if (reportingPeriodLabel) {
    // Find the select element
    var reportingPeriodSelect = reportingPeriodLabel
      .closest(".ACA_Form")
      .querySelector("select");

    if (reportingPeriodSelect) {
      // Set the value of the select element
      reportingPeriodSelect.value = currentQuarterValue;

      if (reportingPeriodSelect.value === quarters[currentQuarter]) {
        console.log(`✅ Current quarter set to ${currentQuarter}`);
      } else {
        console.log(
          `❌ Current quarter is not set correctly ${reportingPeriodSelect.value}`
        );
      }
    } else {
      console.log(`❌ Select element not found`);
    }
  } else {
    console.log(`❌ Label element not found`);
  }
}

// function submitForm() {
//   var submitButton = $formJquery("#ctl00_phPopup_btnSubmit");
//     submitButton.click(function (res) {
//       // Check if the click was successful
//       if (true) {
//         console.log(`✅ forms submitted`);
//       } else {
//         console.log(`❌ form could not be submitted`);
//       }
//     });
//     submitButton.trigger("click");
// }

function submitForm() {
  console.log(`Submitting form`);
  
  // Find the submit button by its ID
  var submitButton = specificFrame.querySelector("#ctl00_phPopup_btnSubmit");

  if (submitButton) {
    // Create and dispatch a click event on the submit button
    var clickEvent = new Event("click", {
      bubbles: true,
      cancelable: true,
    });

    submitButton.dispatchEvent(clickEvent);

    console.log(`✅ Form submitted`);
  } else {
    console.log(`❌ Submit button not found`);
  }
}


/* ============= Run the scripts ============ */
// const currentQuarter = 3;
// const currentYear = 2023;
// const airbnbId = "49043049";
// const checkIn = "08/25/" + currentYear;
// const checkOut = "09/01/" + currentYear;
// const typeOfStay = "Hosted";

// fillOutForm(
//   typeOfStay,
//   currentQuarter,
//   currentYear,
//   checkIn,
//   checkOut,
//   airbnbId
// );
