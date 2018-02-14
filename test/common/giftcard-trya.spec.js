const searchPage            = require('./../../po/search.po');
const usersData             = require('./../../data/users/data');
const detailsPage           = require('./../../po/details.po');
const paymentPage           = require('./../../po/payment.po');
const helper                = require('./../../helpers/helper.js');
const redeemPage            = require('./../../po/redeem.po');
const previewPage           = require('./../../po/preview.po');
const successPage           = require('./../../po/success.po');

describe('Suite: Gift cards', function () {

    const baseUrl = usersData.baseUrl
    const widgetUrl = usersData.widgetUrl
    const widgetUrlFundraiserGB = usersData.widgetUrlFundraiserGB;
    const codeTRYA = 'TRYA-GIFT-CARD';
    const codeKLM = 'TRYA-5X34-KLM3';
    const amount = 'US$ 20.00'

    describe('Sub suite: TRYA-GIFT-CARD', function () {

        beforeAll(function () {
            browser.get(widgetUrlFundraiserGB);
            helper.logUrl(widgetUrlFundraiserGB);
            helper.waitUntilElementPresent(helper.donationDetailsPanel);
        });

        afterAll(function () {
            helper.clearAllData();
        });

        it('should enter amount and email', () => {
            detailsPage.enterAmount('1000');
            detailsPage.enterEmail('test@protractor.com');
        });

        it('should click donate now button', () => {
            detailsPage.clickDonateNow();
        });

        it('should enter valid gift card code', () => {
            helper.waitUntilElementPresent(helper.paymentMethodsPanel);
            paymentPage.clickPaymentMethod('test Gift Card');
            paymentPage.enterGiftCardCode(codeTRYA);
            paymentPage.clickContinue();
        });

        it('should click use gift card', () => {
            expect(redeemPage.getGiftCardAmountText()).toContain(amount)
            redeemPage.clickBtnUseGiftCard();
            helper.waitUntilElementPresent(helper.donationPreviewPanel);
        })

        it('should verify gift card on preview', () => {
            helper.waitUntilElementPresent(previewPage.giftCardIcon);
            expect(previewPage.giftCardProviderAvatar.isPresent()).toBeTruthy();
            expect(previewPage.getDonationAmount()).toEqual(amount);
        })

        it('should click donate btn', function () {
            previewPage.clickBtnDonate();
        });

        it('should see success panel', function () {
            helper.waitUntilElementPresent(helper.demoGiftCardPanel);
            expect(successPage.blockGiftCardDemo.isPresent()).toBeTruthy();
            expect(successPage.iconSuccess.isPresent()).toBeTruthy();
        });

        it('should click buy gift cards', function () {
            browser.ignoreSynchronization = true
            successPage.clickBtnBuyGiftCards();
        });

        it('should go to buy donation gift cards - test', function () {
            expect(helper.getPageTitle()).toContain('buy donation gift cards - test')
        });
    });

    describe('Sub suite: /redeem/TRYA-5X34-KLM3 link', function () {

        const pageTitle = "test-global (test-global) - test profile";

        beforeAll(function () {
            browser.ignoreSynchronization = true;
        });

        afterAll(function () {
            helper.clearAllData();
            browser.ignoreSynchronization = false;
        });

        it('should open /redeem url', function () {
            browser.get(`${baseUrl}/redeem/${codeKLM}`);
            helper.logUrl(`${baseUrl}/redeem/${codeKLM}`);
        });

        it('should see iframe over company profile', function () {
            helper.waitUntilElementPresent($('iframe'));
            expect(helper.getPageTitle()).toEqual(pageTitle);
        });

        it('should switch to frame', () =>{
            helper.switchToIFrame();
            helper.waitUntilElementPresent(helper.redeemPanel);
        });

        it('should click lnk make without gift card => reset panel', () =>{
            redeemPage.clickLnkMakeWtGiftCard();
            helper.waitUntilElementPresent(helper.searchResultsPanel);
        });

    });

});
