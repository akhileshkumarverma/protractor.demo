var sql           = require('mssql');
var statements    = require('./statements');
var helper        = require('./../helpers/helper');

/***

Example 1:

describe('test db connection', function () {

    it('tests db select', function (done) {
        selectQuery().then(function _onSuccess(result){

            // ES5
            // result.recordsets[0].forEach((element)=> console.log(element));

            // ES6
            for (let value of result.recordsets[0]){
                console.log(value)
            };

            done();
        }).catch(function _onFailure(err){
            done.fail(err);
        })
    })
});

 *
 */

exports.db = {

    selectQuery: function(select, placeholders={}) {

        let query = statements.sql[select].statement;
        let dbName = statements.sql[select].database;

        helper.logInfo('-----------------');
        helper.logInfo('Database Summary:');
        helper.logInfo('-----------------');

        for (const prop in placeholders){
            helper.logInfo(`placeholders.${prop} = ${placeholders[prop]}`);
            query = query.replace(prop, placeholders[prop])
        }
        helper.logInfo(`query: ${query}`);

        return new Promise(function (fulfill, reject) {
            var config = {
                user: browser.params.db.user,
                password: browser.params.db.password,
                server: browser.params.db.server,
                port: browser.params.db.port,
                database: dbName,

                options: {
                    encrypt: true
                }
            };
            var connection = new sql.ConnectionPool(config);
            connection.connect((err) => {
                if (err) reject(err);

                connection.request()
                    .query(query, (err, result) => {

                        helper.logInfo('rowsAffected: ' + result.rowsAffected);
                        helper.logInfo('err: ' + err);
                        helper.logInfo('output: ' + result.output);
                        helper.logInfo('recordset.length: ' + result.recordset.length);

                        if (err) reject(err);
                        else fulfill(result);
                    });
            });
        });
    }
}

