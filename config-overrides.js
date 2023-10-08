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

const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = function override(config, env) {
  // Add a new entry point for contentscript.js
  config.entry = {
    main: ["./src/index.tsx"],
    contentscript: ["./src/contentscript.ts"],
  };
  return config;
};
