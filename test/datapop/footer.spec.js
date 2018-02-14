var helper                = require('./../../helpers/helper.js');
var usersData             = require('./../../data/users/data');
var detailsPage           = require('./../../po/details.po');

describe('Suite: Footer', function () {

    var baseUrl = usersData.baseUrl;
    var widgetUrl = usersData.widgetUrl;
    var widgetUrlSingleWhitelist = usersData.widgetUrlSingleWhitelist;
    var companyNameSingleWhitelist = usersData.companyNameSingleWhitelist;

    var arr;
    let langs = ['de', 'es', 'fr', 'it', 'pl', 'pt-BR', 'ko', 'ja', 'zh-TW', 'zh-CN', 'en']
    let deMakeADonation = "Spenden";

    beforeAll(function () {
        browser.get(widgetUrl);
        helper.waitUntilElementPresent(helper.widgetPanel);
        arr = helper.getAllLangOptionsValues();
    });

    afterAll(function () {
        helper.clearAllData();
    });

    it('should see all languages', function () {
        expect(arr.sort()).toEqual(langs.sort());
    });

    it('should select each language', function () {
        for (let lng of langs) {
            helper.selectLanguage(lng);
        }
    });

    it('should open company widget', function () {
        browser.get(widgetUrlSingleWhitelist);
        helper.logUrl(widgetUrlSingleWhitelist);
        helper.waitUntilElementPresent(helper.widgetPanel);
        arr = helper.getAllLangOptionsValues();
    });

    it('should see all languages', function () {
        expect(arr.sort()).toEqual(langs.sort());
    });
    
    it('should click owner', function () {
        helper.selectLnkFooterOwner()
    });

    it('should verify overlay', function () {
        helper.waitUntilElementPresent(helper.overlayContent);
        expect(helper.getOverlayBeneficiaryName()).toContain(companyNameSingleWhitelist);
    });

    it('should close overlay', function () {
        helper.closeOverlay();
        helper.waitUntilElementIsNotPresent(helper.overlayContent)
    });

    it('should select de language', function () {
        helper.selectLanguage('de');
    });

    it('should verify language changed to German', function () {
        expect(detailsPage.getHeadingText()).toBe(deMakeADonation);
    });

});
