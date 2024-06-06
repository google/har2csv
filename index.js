#!/usr/bin/env node
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

const fs = require('fs');
const match = require('@menadevs/objectron');
const stringify = require('csv-stringify');
const commander = require('commander');


commander
 .arguments('<harInputPath> <harOutputPath>')
 .action(run)
 .parse(process.argv);

function run(harInputPath, harOutputPath) {
  const harFileText = fs.readFileSync(harInputPath);
  const harFile = JSON.parse(harFileText);

  let flatEntries = [];

  if(harFile.log && harFile.log.entries) {
    harFile.log.entries.forEach((entry) => {
      const currentEntry = evaluateHarEntry(entry);

      if(currentEntry.match) {
        const flatEntry = {
          ...currentEntry.groups,
          ...currentEntry.matches.timings
        };

        if (!flatEntries.length) {
          flatEntries.push(Object.keys(flatEntry));
        }

        flatEntries.push(Object.values(flatEntry));
      }
    });

    stringify(flatEntries, function(err, output) {
      fs.writeFile(harOutputPath, output, function (err) {
        if (err) return console.log(err);
      });
    });
  } else {
    console.error('Invalid HAR file!');
  }
}

function evaluateHarEntry(harEntry) {
  const baseEntryPattern = {
    pageref: /(?<pageRef>page_\d+)/,
    startedDateTime: /(?<startedDateTime>.*)/,
    request: {
      method: /(?<requestMethod>GET|POST)/,
      url: /(?<requestUrl>https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/,
      httpVersion: /(?<requestHttpVersion>.*)/,
      headersSize: /^(?<requestHeaderSize>\-?(\d+\.?\d*|\d*\.?\d+))$/,
      bodySize: /^(?<requestHeaderSize>\-?(\d+\.?\d*|\d*\.?\d+))$/,
    },
    response: {
      status: /^(?<responseStatus>[0-9]{3})/,
      content: {
        size: /^(?<responseContentSize>\-?(\d+\.?\d*|\d*\.?\d+))$/,
      },
      headers: [
        { name: /content-type/i, value: /(?<responseContentType>.*)/ },
        { name: /content-length/i, value: /(?<responseContentLength>.*)/ },
        { name: /cache-control/i, value: /(?<responseCacheControl>.*)/ },
      ]
    },
    timings: (val) => val,
    time: /^(?<time>\-?(\d+\.?\d*|\d*\.?\d+))$/
  };

  return match(harEntry, baseEntryPattern);
}

