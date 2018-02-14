exports.sql = {
    selectGcCode: {
                     statement: "SELECT rtrim(VoucherCode) FROM Voucher WHERE (VoucherBookCode = '{bookCode}') " +
                                "AND [VoucherStatusId] = '1'",
                     database: "test_persistence_payment"
                    },
    selectGcBook: {
                     statement: "SELECT [VoucherBookCode] FROM [dbo].[VoucherBook] WHERE [PurchaserEmail] = '{email}'",
                     database: "test_persistence_payment"
                    },
};