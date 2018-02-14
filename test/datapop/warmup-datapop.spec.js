const helper                = require('./../../helpers/helper.js');
const usersData             = require("../../data/users/data");
const searchPage            = require('./../../po/search.po.js')

//https://github.com/test/test/tree/develop/test.Web/MVC/Controllers/NgWidget

describe('Suite: Warm up giving widget 2.0 - datapop', function () {

    const baseUrl = usersData.baseUrl
    const embedUrl = usersData.embedUrl
    const widgetUrl = usersData.widgetUrl
    const widgetUrlAutoMultiWhitelist = usersData.widgetUrlAutoMultiWhitelist;
    const widgetUrlSingleWhitelist = usersData.widgetUrlSingleWhitelist;
    const widgetUrlAutoTest = usersData.widgetUrlAutoTest;
    const widgetUrlMatch = usersData.widgetUrlMatch;
    const widgetUrlFundraiserGB = usersData.widgetUrlFundraiserGB;

    beforeAll( () => browser.ignoreSynchronization = true );

    afterAll(function () {
      browser.ignoreSynchronization = false;
    });

    it('www main site',function () {
        helper.getUrl(baseUrl);
    });

    it('test blog => embedded widget', () => {
        helper.getUrl(embedUrl);
        helper.waitUntilElementPresent(helper.widgetEmbedFrame);
    });

    it('various widget urls',function () {
        helper.getUrl(widgetUrl);
        helper.waitUntilElementPresent(helper.widgetPanel);
        helper.clearAllData();

        helper.getUrl(widgetUrl + '?SpoofIPToCountry=GB');
        helper.waitUntilElementPresent(helper.widgetPanel);
        helper.clearAllData();

        helper.getUrl(widgetUrlAutoMultiWhitelist);
        helper.waitUntilElementPresent(helper.searchResultsPanel);
        helper.waitUntilElementPresent(searchPage.inSearch);
        searchPage.enterNameToSearch('acharity');
        searchPage.selectSearchBtn();
        helper.clearAllData();

        helper.getUrl(widgetUrlSingleWhitelist);
        helper.waitUntilElementPresent(helper.donationDetailsPanel);
        helper.clearAllData();

        helper.getUrl(widgetUrlAutoTest);
        helper.waitUntilElementPresent(helper.widgetPanel);
        helper.clearAllData();

        helper.getUrl(widgetUrlMatch);
        helper.waitUntilElementPresent(helper.widgetPanel);
        helper.clearAllData();

        helper.getUrl(widgetUrlFundraiserGB);
        helper.waitUntilElementPresent(helper.donationDetailsPanel);
        helper.clearAllData();
    });

    it('should be json => /v1/widget/',function () {
        helper.getUrl(baseUrl + "/v1/widget/fundraisersBeneficiaries?beneficiaryIds=944");
        helper.getUrl(baseUrl + "/v1/widget/search?acceptdonations=yes&q=[automation.uk&pagenumber=1");
        helper.getUrl(baseUrl + "/v1/widget/search?acceptdonations=yes&q=[automation.fundraiser&pagenumber=1");
        helper.getUrl(baseUrl + "/v1/widget/search?acceptdonations=yes&country=US&subcountry=US%3aAL&pagenumber=1");
        helper.getUrl(baseUrl + "/v1/widget/fundraisersBeneficiaries?beneficiaryIds=1314");
        helper.getUrl(baseUrl + "/v1/widget/search?acceptdonations=yes&pagenumber=1");
        helper.getUrl(baseUrl + "/v1/widget/paymentmethods");
        helper.getUrl(baseUrl + "/v1/widget/redeem");
    });

    it('should be no 500 errors => NgWidgetPackage.cs /v1/widget => all 404', function () {
        helper.getUrl(baseUrl + "/v1/widget/donate/confirm/bibit");
        helper.getUrl(baseUrl + "/v1/widget/ngprocesssaved");
        helper.getUrl(baseUrl + "/v1/widget/donate/success");
        helper.getUrl(baseUrl + "/v1/widget/donate/failure");
        helper.getUrl(baseUrl + "/v1/widget/donate/pending");
        helper.getUrl(baseUrl + "/v1/widget/fundraisersBeneficiaries");
        helper.getUrl(baseUrl + "/v1/widget/beneficiaries");
        helper.getUrl(baseUrl + "/v1/widget/beneficiaries?<script>");
        helper.getUrl(baseUrl + "/v1/widget/beneficiaries?SELECT%20FROM");
        helper.getUrl(baseUrl + "/v1/widget/emailupdate");
        helper.getUrl(baseUrl + "/v1/widget/login");
        helper.getUrl(baseUrl + "/v1/widget/logout");
        helper.getUrl(baseUrl + "/v1/widget/signup/member");
        helper.getUrl(baseUrl + "/v1/widget/isemailaddressinuse");
        helper.getUrl(baseUrl + "/v1/widget/updatecountry");
        helper.getUrl(baseUrl + "/v1/widget/confirmpassword");
        helper.getUrl(baseUrl + "/v1/widget/usersessionstatus");
    });

});

