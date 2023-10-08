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

  $formJquery("select")[0].value = typeOfStay;
  if ($formJquery("select")[0].value === typeOfStay) {
    console.log(`✅ Type of stay set to  ${$formJquery("select")[0].value}`);
  } else {
    console.log(`❌ Type of stay is not set correctly`);
  }
}

function updateAirbnbListingId(airbnbId) {
  var $listingId = $formJquery('label:contains("Listing ID:")');
  var $listingIdInput = $listingId.parents(".ACA_Form").find("input");
  $listingIdInput.val(airbnbId);
  if ($listingIdInput.val() === airbnbId) {
    console.log(`✅ listing id set to ${airbnbId}`);
  } else {
    console.log(`❌ listing id is not set correctly`);
  }
}

function selectAirbnb() {
  var serviceLabel = $formJquery('label:contains("Service Name:")');
  var serviceSelect = serviceLabel.parents(".ACA_Form").find("select");
  var serviceDropdownValues = [];
  $formJquery(serviceSelect)
    .find("option")
    .each(function () {
      var value = $formJquery(this).val();
      if (value !== "") {
        serviceDropdownValues.push(value);
      }
    });
  var service = serviceDropdownValues[0];
  serviceSelect.val(service);
  console.log(`✅ service set to  ${service}`);
}

function updateCheckoutDate(checkOutDate) {
  var checkoutDate = $formJquery('label:contains("Check Out Date:")');
  checkoutDate.parents(".ACA_Form").find("input").val(checkOutDate);
}

function updateCheckinDate(checkInDate) {
  var checkinDate = $formJquery('label:contains("Check In Date:")');
  checkinDate.parents(".ACA_Form").find("input").val(checkInDate);
}

function setCurrentYear(currentYear) {
  var reportingYearLabel = $formJquery('label:contains("Reporting Year:")');
  reportingYearLabel.parents(".ACA_Form").find("input").val(currentYear);
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
  var reportingPeriodLabel = $formJquery('label:contains("Reporting Period:")');
  var reportingPeriodSelect = reportingPeriodLabel
        .parents(".ACA_Form")
        .find("select");
  reportingPeriodSelect.val(currentQuarterValue);
  if (reportingPeriodSelect.val() === quarters[currentQuarter]) {
    console.log(`✅ listing id set to ${currentQuarter}`);
  } else {
    console.log(`❌ listing id is not set correctly ${reportingPeriodSelect.val()}`);
  }
}

function submitForm() {
  var submitButton = $formJquery("#ctl00_phPopup_btnSubmit");
//   submitButton.click(function (res) {
//     // Check if the click was successful
//     if (true) {
//       console.log(`✅ forms submitted`);
//     } else {
//       console.log(`❌ form could not be submitted`);
//     }
//   });
//   submitButton.trigger("click");
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