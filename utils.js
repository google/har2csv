/**
 * Copyright 2020 Google LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 **/


/**
 * Extracts the input and output command line arguments for the paths
 * returns an object with input and output path values
 * @return {Object}
 */
function extractCommandArgs() {
  const args = process.argv.slice(2, process.argv.length);

  if (typeof args[0] != 'undefined' && typeof args[1] != 'undefined') {
    return {
      inputPath: args[0],
      outputPath: args[1],
    };
  }

  throw new Error('Invalid paths for input and output files');
}

module.exports = {
  extractCommandArgs,
};
