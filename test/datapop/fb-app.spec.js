const usersData             = require('./../../data/users/data');
const detailsPage           = require('./../../po/details.po');
const paymentPage           = require('./../../po/payment.po');
const helper                = require('./../../helpers/helper.js');
const previewPage           = require('./../../po/preview.po');

describe('Suite: Facebook app', function () {

    const widgetUrlFacebook = usersData.widgetUrlFacebook;

    describe('Sub suite: https://www.facebook.com/abc/app/123', function () {

        beforeAll(function () {
            browser.ignoreSynchronization = true;
        });

        afterAll(function () {
            helper.clearAllData();
            browser.ignoreSynchronization = false;
        });

        it('should open widgetUrlFacebook', function () {
            helper.getUrl(widgetUrlFacebook);
            helper.scrollByOffset(0, 200);
        });

        it('should switch to iframe: app runner', () =>{
            helper.switchToWidgetIframeById('app_runner');
        });

        it('should switch to widget iframe: widgetIframe', () =>{
            helper.switchToWidgetIframeById();
            helper.waitUntilElementPresent(helper.donationDetailsPanel);
        });

        it('recover ignoreSynchronization s', () =>{
            browser.ignoreSynchronization = false;
        });

        it('should enter amount and email', () => {
            helper.waitUntilElementPresent(detailsPage.inAmount);
            detailsPage.enterAmount('1000');
            detailsPage.enterEmail("test@protractor.com");
        });

        it('should click donate now button', () => {
            detailsPage.clickDonateNow();
        });

        it('should click payment method and continue', function () {
            helper.waitUntilElementPresent(helper.paymentMethodsPanel);
            paymentPage.clickPaymentMethod();
            paymentPage.clickContinue();
        });

        it('should see preview panel', function () {
            helper.waitUntilElementPresent(helper.donationPreviewPanel);
        });

        it('should continue to world pay', function () {
            previewPage.clickBtnDonate();
            previewPage.clickContinueOverlay();
        });

        it('wait for a new window', function () {
            helper.waitUntilWindowCount(2);
        });

    });
});
