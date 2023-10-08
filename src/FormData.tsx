// src/FormData.tsx

import React, { useState, useEffect } from "react";
import FormDataItem from "./FormDataItem"; // Import the FormDataItem type
import { fillInForm } from "./helpers";
import "./FormData.css"; // Import the CSS file

const initialFormDataItem: FormDataItem = {
  currentQuarter: "",
  currentYear: "", // Initialize as an empty string
  airbnbId: "",
  checkIn: "",
  checkOut: "",
  typeOfStay: "Hosted",
};

const FormData: React.FC = () => {
  const [formData, setFormData] = useState<FormDataItem[]>([
    initialFormDataItem,
  ]);
  const [currentYear, setCurrentYear] = useState<string>(""); // State variable for current year

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  //   index: number
  // ) => {
  //   const { name, value } = e.target;
  //   const updatedFormData = [...formData];
  //   updatedFormData[index] = { ...updatedFormData[index], [name]: value };
  //   setFormData(updatedFormData);
  // };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index] = { ...updatedFormData[index], [name]: value };
    setFormData(updatedFormData);

    // Update stored values in Chrome Storage
    // @ts-ignore
    chrome.storage.local.set({ [name]: value });
  };

  const handleAddRow = () => {
    setFormData([...formData, initialFormDataItem]);
  };

  const handleSubmit = () => {
    // Call the fillInForm function with the collected data
    fillInForm(formData);
  };

  useEffect(() => {
    // Get the current year when the component mounts
    const year = new Date().getFullYear();
    setCurrentYear(year.toString());
  }, []); // Empty dependency array ensures this effect runs once

  useEffect(() => {
    // Get the current year when the component mounts
    const year = new Date().getFullYear();
    setCurrentYear(year.toString());

    // Retrieve values from Chrome Storage and set them as defaults
    // @ts-ignore
    chrome.storage.local.get(
      ["currentQuarter", "currentYear", "airbnbId"],
      (result: any) => {
        if (result.currentQuarter) {
          initialFormDataItem.currentQuarter = result.currentQuarter;
        }
        if (result.currentYear) {
          initialFormDataItem.currentYear = result.currentYear;
        }
        if (result.airbnbId) {
          initialFormDataItem.airbnbId = result.airbnbId;
        }
        setFormData([initialFormDataItem]);
      }
    );
  }, []);

  return (
    <div>
      <h1>Enter Data</h1>
      <table>
        <thead>
          <tr>
            <th>Current Quarter</th>
            <th>Current Year</th>
            <th>Airbnb ID</th>
            <th>Check-In Date</th>
            <th>Check-Out Date</th>
            <th>Type of Stay</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  name="currentQuarter"
                  value={item.currentQuarter}
                  onChange={(e) => handleChange(e, index)}
                  className="small-input" // Add the "small-input" class
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  name="currentYear"
                  value={item.currentYear}
                  onChange={(e) => handleChange(e, index)}
                  className="small-input" // Add the "small-input" class
                  defaultValue={currentYear}
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  name="airbnbId"
                  value={item.airbnbId}
                  onChange={(e) => handleChange(e, index)}
                  className="small-input" // Add the "small-input" class
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  name="checkIn"
                  value={item.checkIn}
                  onChange={(e) => handleChange(e, index)}
                  className="small-input" // Add the "small-input" class
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  name="checkOut"
                  value={item.checkOut}
                  onChange={(e) => handleChange(e, index)}
                  className="small-input" // Add the "small-input" class
                  required
                />
              </td>
              <td>
                <select
                  name="typeOfStay"
                  value={item.typeOfStay}
                  onChange={(e) => handleChange(e, index)}
                  className="small-input" // Add the "small-input" class
                >
                  <option value="Hosted">Hosted</option>
                  <option value="Unhosted">Unhosted</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <button type="button" onClick={handleAddRow}>
        +
      </button> */}
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default FormData;
