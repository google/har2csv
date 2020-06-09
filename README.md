# Har2CSV

> Convert HTTP session HAR file logs into CSV format

This CLI tool provides you with an easy way to convert [HAR file](http://www.softwareishard.com/blog/har-12-spec/) HTTP log entries into a flat CSV format to make  it easier to analyze.

## Usage

**Requires node v10.13.x or above**

- Download the HAR file you'd like to extract log entries from
- Install via `npm install har2csv -g`
- To convert a HAR file `har2csv path/to/input.har path/to/output.csv`

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

## License

[Apache 2.0](LICENSE)

## Contributors

- [Ayman Farhat](https://github.com/aymanfarhat)

## Disclaimer

This is not an official Google product.
