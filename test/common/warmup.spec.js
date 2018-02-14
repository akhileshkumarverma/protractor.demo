const helper                = require('./../../helpers/helper.js');
const usersData             = require("../../data/users/data");

//https://github.com/test/test/tree/develop/test.Web/MVC/Controllers/NgWidget

describe('Suite: Warm up giving widget 2.0 - SDB', function () {

    const baseUrl = usersData.baseUrl
    const widgetUrl = usersData.widgetUrl

    beforeAll( () => browser.ignoreSynchronization = true );

    afterAll(function () {
      browser.ignoreSynchronization = false;
    });

    it('www main site',function () {
        browser.get(baseUrl);
    });

    it('various widget urls',function () {
        browser.get(widgetUrl);
        helper.waitUntilElementPresent(helper.widgetPanel);

        browser.get(widgetUrl + '?SpoofIPToCountry=GB');
        helper.waitUntilElementPresent(helper.widgetPanel);

    });

    it('should be json - /v1/widget/',function () {
        browser.get(baseUrl + "/v1/widget/fundraisersBeneficiaries?beneficiaryIds=944");
        browser.get(baseUrl + "/v1/widget/search?acceptdonations=yes&q=[automation.uk&pagenumber=1");
        browser.get(baseUrl + "/v1/widget/search?acceptdonations=yes&q=[automation.fundraiser&pagenumber=1");
        browser.get(baseUrl + "/v1/widget/search?acceptdonations=yes&country=US&subcountry=US%3aAL&pagenumber=1");
        browser.get(baseUrl + "/v1/widget/fundraisersBeneficiaries?beneficiaryIds=1314");
        browser.get(baseUrl + "/v1/widget/search?acceptdonations=yes&pagenumber=1");
        browser.get(baseUrl + "/v1/widget/paymentmethods");
        browser.get(baseUrl + "/v1/widget/redeem");
    });

    it('should be no 500 errors - NgWidgetPackage.cs /v1/widget - all 404', function () {
        browser.get(baseUrl + "/v1/widget/donate/confirm/bibit");
        browser.get(baseUrl + "/v1/widget/ngprocesssaved");
        browser.get(baseUrl + "/v1/widget/donate/success");
        browser.get(baseUrl + "/v1/widget/donate/failure");
        browser.get(baseUrl + "/v1/widget/donate/pending");
        browser.get(baseUrl + "/v1/widget/fundraisersBeneficiaries");
        browser.get(baseUrl + "/v1/widget/beneficiaries");
        browser.get(baseUrl + "/v1/widget/emailupdate");
        browser.get(baseUrl + "/v1/widget/login");
        browser.get(baseUrl + "/v1/widget/logout");
        browser.get(baseUrl + "/v1/widget/signup/member");
        browser.get(baseUrl + "/v1/widget/isemailaddressinuse");
        browser.get(baseUrl + "/v1/widget/updatecountry");
        browser.get(baseUrl + "/v1/widget/confirmpassword");
        browser.get(baseUrl + "/v1/widget/usersessionstatus");
    });

});

