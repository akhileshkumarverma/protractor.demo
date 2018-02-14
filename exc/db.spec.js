var sql = require('mssql');

describe('test db connection', function () {


    it('tests db select', function (done) {
        selectQuery().then(function _onSuccess(result){

            // ES5
            // result.recordsets[0].forEach((element)=> console.log(element));

            // ES6
            for (let value of result.recordset){
                console.log(value)
            };

            done();
        }).catch(function _onFailure(err){
            done.fail(err);
        })
    })
});

function selectQuery() {
    return new Promise(function (fulfill, reject) {
        var config = {
            user: 'QAAdmin',
            password: 'QAAdmin2008',
            server: '10.1.32.32',
            port: '49406',
            database: 'test_persistence_payment',

            options: {
                encrypt: true
            }
    };
        var connection = new sql.ConnectionPool(config);
        connection.connect((err) => {
            if (err) reject(err);

        let query = "select * from [test_Persistence_Payment].[dbo].[RecurringDonationDefinition]"
        query = "SELECT rtrim(VoucherCode) FROM Voucher WHERE (VoucherBookCode = 'MEGA')"

        connection.request()
        .query(query, (err, result) => {

            console.log('Rows affected: ' + result.rowsAffected)
            console.log('Query: %s', query)
            console.log('Err: ' + err)
            console.log('Output: ' + result.output)
            console.log('returnValue: ' + result.returnValue)

            if (err) reject(err);
            else fulfill(result);
        });
    });
    });
}