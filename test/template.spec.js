const searchPage            = require('./../../po/search.po');
const helper                = require('./../../helpers/helper.js');
const usersData             = require('./../../data/users/data');
const detailsPage           = require('./../../po/details.po');
const paymentPage           = require('../../po/payment.po');

describe('Suite: ', function () {

    const baseUrl = usersData.baseUrl;
    const widgetUrl = usersData.widgetUrl;

    describe('Sub suite: ', function () {

    beforeAll(function () {
        browser.get(widgetUrl);
        helper.waitUntilElementPresent(helper.widgetPanel);
    });

    afterAll(function () {
        helper.clearAllData();
    });

    it('should enter and search nonprofit',function () {
        searchPage.enterNameToSearch('ac1');
        searchPage.selectSearchBtn();
    });
  });

});
