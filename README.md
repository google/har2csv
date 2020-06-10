# Har2CSV

> Convert HTTP session HAR file logs into CSV format

This CLI tool provides you with an easy way to convert [HAR file](http://www.softwareishard.com/blog/har-12-spec/) HTTP log entries into a flat CSV format to make  it easier to analyze. The utility ignores fields that are not essential for analyzing requests/responses such as content and those that might carry private information such as cookies.

## Usage


### Install and run

**Requires node v10.13.x or above**

```
# Install

npm install har2csv -g

# Run

har2csv path/to/input.har path/to/output.csv
```

### Generating a HAR file from a browser session

Example using Chrome:

- Open the Dev Tools panel via Ctrl + Shift + i
- Click the “Network” menu item on the top menu bar of the panel
- The HTTP session is recorded by default, navigate to the pages / resources you're inspecting
- Once ready to export the data, right-click anywhere on the list of items in the Network resource list and select “Save all as HAR with content”

## Extracted log entry fields

| Entry path  | CSV column name |
| ------------- | ------------- |
| pageref  | pageRef |
| startedDateTime  | startedDateTime |
| request.method  | requestMethod |
| request.url  | requestUrl |
| request.httpVersion  | requestHttpVersion |
| request.headerSize  | requestHeaderSize |
| request.bodySize  | requestBodySize |
| response.status  | responseStatus |
| response.content.size  | responseContentSize |
| response.headers.name['content-type']  | responseContentType |
| response.headers.name['content-length']  | responseContentType |
| response.headers.name['cache-control']  | responseCacheControl |
| timings.blocked  | blocked |
| timings.dns  | dns |
| timings.ssl  | ssl |
| timings.connect  | connect |
| timings.send  | send |
| timings.wait  | wait |
| timings.receive  | receive |
| time  | time |

**Note: Entries that don't match the above fields / paths are not included in the result CSV file**

## WIP 

- Support TSV format
- Add flag for excluding columns from the result
- Output stats from the conversion e.g. # of requests, GET vs POST etc...

## License

[Apache 2.0](LICENSE)

## Contributors

- [Ayman Farhat](https://github.com/aymanfarhat)

## Disclaimer

This is not an official Google product.
