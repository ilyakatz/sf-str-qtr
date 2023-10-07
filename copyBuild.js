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

// const fs = require('fs-extra');
// const path = require('path');

// const sourceDirectory = path.join(__dirname, 'build'); // Replace 'path-to-react-app' with the actual path to your React app
// const destinationDirectory = path.join(__dirname, 'chrome', 'build'); // Change 'build' to the desired destination folder name

// // Check if the source directory exists
// if (fs.existsSync(sourceDirectory)) {
//   // Copy the 'build' folder to the destination directory
//   fs.copySync(sourceDirectory, destinationDirectory);
//   console.log('Build folder copied successfully.');
// } else {
//   console.error('Source directory does not exist. Please check the path.');
// }


const fs = require('fs-extra');
const path = require('path');

const sourceDirectory = path.join(__dirname, 'build'); // Replace 'path-to-react-app' with the actual path to your React app
const destinationDirectory = path.join(__dirname, 'chrome', 'build'); // Change 'build' to the desired destination folder name

// Check if the source directory exists
if (!fs.existsSync(sourceDirectory)) {
  console.error('Source directory does not exist. Please check the path.');
  process.exit(1);
}

// Copy the 'build' folder to the destination directory
fs.copySync(sourceDirectory, destinationDirectory);

console.log('Build folder copied successfully.');

// Modify the index.html file to replace "/static" with "static"
const indexPath = path.join(destinationDirectory, 'index.html');
fs.readFile(indexPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading index.html:', err);
    process.exit(1);
  }

  // Replace "/static" with "static" in the HTML content
  const modifiedContent = data.replace(/\/static/g, 'static');

  // Write the modified content back to index.html
  fs.writeFile(indexPath, modifiedContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing modified index.html:', err);
      process.exit(1);
    }
    console.log('index.html modified successfully.');
  });
});