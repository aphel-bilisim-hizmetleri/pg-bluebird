"use strict";

function PGBlueBird() {
}

PGBlueBird.prototype.constructor = PGBlueBird;
PGBlueBird.prototype.pg = require("pg");
PGBlueBird.prototype.connect = function (connectionString) {

   
    var bluebird = require("bluebird");

    var deferred = bluebird.pending();

    this.pg.connect(connectionString, function (error, client, done) {

        if (error) {

            deferred.reject(error);
        } else {

            client._query = client.query;

            client.query = function (statement, values) {

                var innerDeferred = bluebird.pending();

                client._query(statement, values, function (innerError, result) {

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
