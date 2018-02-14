const searchPage            = require('./../../po/search.po');
const usersData             = require('./../../data/users/data');
const detailsPage           = require('./../../po/details.po');
const paymentPage           = require('./../../po/payment.po');
const helper                = require('./../../helpers/helper.js');
const redeemPage            = require('./../../po/redeem.po');
const previewPage           = require('./../../po/preview.po')
const manager               = require('./../../db/manager');

describe('Suite: Company gift cards', function () {

    const baseUrl = usersData.baseUrl
    const widgetUrl = usersData.widgetUrl
    const widgetUrlFundraiserGB = usersData.widgetUrlFundraiserGB;
    const companyNameWhitelist = usersData.companyNameWhitelist;
    const invalidCodeErr = "Sorry, your gift card code is invalid.";
    const bookCode = "T1US";
    let validCode;

    describe('Sub suite: Invalid and valid code', function () {

        beforeAll(function (done) {
            browser.get(widgetUrlFundraiserGB);
            helper.logUrl(widgetUrlFundraiserGB);
            helper.waitUntilElementPresent(helper.donationDetailsPanel);

            manager.db.selectQuery('selectGcCode', {'{bookCode}': bookCode}).then(function _onSuccess(result){
                validCode = bookCode + result.recordset[0][''].toString();
                helper.logInfo(`gift card code: ${validCode}`)
                done();
            }).catch(function _onFailure(err){
                done.fail(err);
            });
        });

        afterAll(function () {
            helper.clearAllData();
        });

        it('should enter amount and email', () => {
            helper.waitUntilElementPresent(detailsPage.inAmount);
            detailsPage.enterAmount('1000');
            detailsPage.enterEmail('test@protractor.com');
        });

        it('should click donate now button', () => {
            detailsPage.clickDonateNow();
        });

        it('should enter invalid gift card code => INVALID_CODE', () => {
            helper.waitUntilElementPresent(helper.paymentMethodsPanel);
            paymentPage.clickPaymentMethod('test Gift Card');
            paymentPage.enterGiftCardCode('INVALID_CODE');
            paymentPage.clickContinue();
        });

        it('should error: ' + invalidCodeErr, () => {
            expect(helper.getValidationFormErrText()).toContain(invalidCodeErr);
        });

        it('should enter invalid gift card code => prefixed $', () => {
            paymentPage.enterGiftCardCode("$" + validCode);
            paymentPage.clickContinue();
        });

        it('should error: ' + invalidCodeErr, () => {
            expect(helper.getValidationFormErrText()).toContain(invalidCodeErr);
        });

        it('should enter valid gift card code', () => {
            helper.waitUntilElementPresent(helper.paymentMethodsPanel);
            paymentPage.enterGiftCardCode(validCode);
            paymentPage.clickContinue();
        });

        it('should see redeem panel', ()=> {
            helper.waitUntilElementPresent(helper.redeemPanel)
        });

        it('should click make without gift card - resets panel', () => {
            redeemPage.clickLnkMakeWtGiftCard();
        });

        it('should enter amount and email', () => {
            helper.waitUntilElementPresent(detailsPage.inAmount);
            detailsPage.enterAmount('1000');
            detailsPage.enterEmail('test@protractor.com');
        });

        it('should click donate now button', () => {
            detailsPage.clickDonateNow();
        });

        it('should enter valid gift card code', () => {
            helper.waitUntilElementPresent(helper.paymentMethodsPanel);
            paymentPage.clickPaymentMethod('test Gift Card');
            paymentPage.enterGiftCardCode(validCode);
            paymentPage.clickContinue();
        });

        it('should click use gift card', () => {
            redeemPage.clickBtnUseGiftCard();
            helper.waitUntilElementPresent(helper.donationPreviewPanel);
        })

        it('should verify gift card on preview', () => {
            helper.waitUntilElementPresent(previewPage.giftCardIcon);
            helper.waitUntilElementPresent(previewPage.giftCardProviderAvatar);
            expect(previewPage.getDonationAmount()).toEqual('US$ 20.00');
        })

        it('should click on gift card owner', function () {
            previewPage.clickLnkCompanyPM(companyNameWhitelist);
            helper.waitUntilElementPresent(helper.overlayContent);
            expect(helper.getOverlayBeneficiaryName()).toContain(companyNameWhitelist)
        });

        it('should close overlay', function () {
            helper.closeOverlay()
            helper.waitUntilElementIsNotPresent(helper.overlayContent)
        });

    });

    describe('Sub suite: /redeem/code link', function () {

        let pageTitle = companyNameWhitelist + ' ([automation.whitelistmulticompany.test]) - test profile';

        beforeAll(function (done) {
            manager.db.selectQuery('selectGcCode', {'{bookCode}': bookCode}).then(function _onSuccess(result){
                validCode = bookCode + result.recordset[1][''].toString();
                helper.logInfo(`gift card code: ${validCode}`)
                done();
            }).catch(function _onFailure(err){
                done.fail(err);
            });

            browser.ignoreSynchronization = true;
        });

        afterAll(function () {
            helper.clearAllData();
            browser.ignoreSynchronization = false;
        });

        it('should open /redeem url', function () {
            browser.get(`${baseUrl}/redeem/${validCode}`);
            helper.logUrl(`${baseUrl}/redeem/${validCode}`);
        });

        it('should see iframe over company profile', function () {
            helper.waitUntilElementPresent($('iframe'));
            expect(helper.getPageTitle()).toEqual(pageTitle);
        });

        it('should switch to frame', () =>{
            helper.switchToIFrame();
            helper.waitUntilElementPresent(helper.redeemPanel);
        });

        it('should click use gift card and see whitelist on seach panel', () => {
            redeemPage.clickBtnUseGiftCard();
            helper.waitUntilElementPresent(helper.searchResultsPanel);
            expect(searchPage.whitelistText.isDisplayed).toBeTruthy();
        });

    });


    describe('Sub suite: /redeem/code link - opt out', function () {

        let pageTitle = companyNameWhitelist + ' ([automation.whitelistmulticompany.test]) - test profile';
        const nonprofitNameAc1 = usersData.nonprofitNameAc1;

        beforeAll(function (done) {
            manager.db.selectQuery('selectGcCode', {'{bookCode}': bookCode}).then(function _onSuccess(result){
                validCode = bookCode + result.recordset[1][''].toString();
                helper.logInfo(`gift card code: ${validCode}`)
                done();
            }).catch(function _onFailure(err){
                done.fail(err);
            });

            browser.ignoreSynchronization = true;
        });

        afterAll(function () {
            helper.clearAllData();
            browser.ignoreSynchronization = false;
        });

        it('should open /redeem url', function () {
            browser.get(`${baseUrl}/redeem/${validCode}`);
            helper.logUrl(`${baseUrl}/redeem/${validCode}`);
        });

        it('should see iframe over company profile', function () {
            helper.waitUntilElementPresent($('iframe'));
            expect(helper.getPageTitle()).toEqual(pageTitle);
        });

        it('should switch to frame', () =>{
            helper.switchToIFrame();
            helper.waitUntilElementPresent(helper.redeemPanel);
        });

        it('should click link to donate w/t gift card', () => {
            redeemPage.clickLnkMakeWtGiftCard();
            helper.waitUntilElementPresent(helper.searchResultsPanel);
            expect(searchPage.whitelistText.isDisplayed).toBeTruthy();
        });

        it('should search nonprofit: nonprofitNameAc1',function () {
            helper.waitUntilElementPresent(searchPage.inSearch);
            searchPage.enterNameToSearch(nonprofitNameAc1);
            searchPage.selectSearchBtn();
            helper.selectBenefPassport(nonprofitNameAc1);
        });

        it('should continue', function () {
            helper.selectContinueBtn();
        });

        it('should verify repeat enabled and not checked', function () {
            helper.waitUntilElementPresent(helper.donationDetailsPanel);
            expect(detailsPage.chkRepeat.isEnabled()).toBeTruthy();
            expect(detailsPage.chkRepeat.isSelected()).toBeFalsy();
        });

    });
});
