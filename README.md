pg-bluebird
===========

PostgreSQL client extension for bluebird promise support

[![Build Status](https://travis-ci.org/leventkaragol/pg-bluebird.png?branch=master)](https://travis-ci.org/leventkaragol/pg-bluebird) [![Code Climate](https://codeclimate.com/github/leventkaragol/pg-bluebird.png)](https://codeclimate.com/github/leventkaragol/pg-bluebird)

## Features

<img align="right" width="148" height="148" src="http://1.bp.blogspot.com/-I0ScUCTSpVs/U15gK6M86uI/AAAAAAAAVCI/i9XUxIyMt38/s1600/pg-bluebird.png">

pg-bluebird module is designed to bring Promises/A+ ability to well known pg module. You can use it just like standard pg module with promise support instead of async callback functions.

Please see the example below.


## Example

```javascript
    var Pgb = require("pg-bluebird");

    var pgb = new Pgb();

    var cnn;

    pgb.connect("postgres://test:test@localhost/testdb")
        .then(function (connection) {

            cnn = connection;

            return cnn.client.query("SELECT * from table1");
        })
        .then(function (result) {

            console.log(result.rows);

            return cnn.client.query("SELECT * from table2");
        })
        .then(function (result) {

            console.log(result.rows);

            return cnn.client.query("SELECT * from table3");
        })
        .then(function (result) {

            console.log(result.rows);
        })
        .catch(function (error) {

            console.log(error);
        });
```


## Running Tests

To run the test suite, first invoke the following command within the repo, installing the development dependencies:

    $ npm install

Then run the tests:

    $ make test


## License

The MIT License (MIT)

Copyright (c) 2014 H.Levent KARAGÖL

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.