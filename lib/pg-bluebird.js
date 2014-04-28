"use strict";

var bluebird = require("bluebird");

var PGBlueBird = function (pg, connectionString) {
    this._pg = pg;
    this._connectionString = connectionString;
};

PGBlueBird.prototype.connect = function () {

    var deferred = bluebird.pending();

    this._pg.connect(this._connectionString, function (error, client, done) {

        if (error) {

            deferred.reject(error);
        } else {

            client._query = client.query;

            client.query = function (statement) {

                var innerDeferred = bluebird.pending();

                client._query(statement, function (err, result) {

                    if (innerError) {
                        innerDeferred.reject(innerError);
                    }

                    innerDeferred.fulfill(result);
                });

                return innerDeferred.promise;
            };

            deferred.fulfill({client: client, done: done});
        }
    });

    return deferred.promise;
};

module.exports = PGBlueBird;