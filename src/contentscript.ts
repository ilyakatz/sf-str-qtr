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

import { fillOutForm } from "./FilloutForm";

// @ts-ignore
chrome.runtime.onMessage.addListener(
  // @ts-ignore
  (message: { data: FormDataItem[] }, sender, sendResponse) => {
    const formData = message.data;
    fillOutForm(
      formData[0].typeOfStay,
      formData[0].currentQuarter,
      formData[0].currentYear,
      formData[0].checkIn + "/" + formData[0].currentYear,
      formData[0].checkOut + "/" + formData[0].currentYear,
      formData[0].airbnbId
    );
  }
);
