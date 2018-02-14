var searchPage      = require('./../../po/search.po');
var detailsPage     = require('./../../po/details.po');
var paymentPage     = require('../../po/payment.po');
var previewPage     = require('./../../po/preview.po')
var usersData       = require('./../../data/users/data');
var helper          = require('./../../helpers/helper.js');

describe('Suite: Repeat donation', function () {

    var baseUrl = usersData.baseUrl;
    var widgetUrl = usersData.widgetUrl;
    var nonprofitName = usersData.nonprofitName;
    var fundraiserName = usersData.fundraiserName;
    var repeatMethods = 8;

    describe('Sub suite: Pre donation, dont publish name', function () {

        beforeAll(function () {
            browser.get(widgetUrl);
            helper.waitUntilElementPresent(helper.widgetPanel);
        });

        afterAll(function () {
            helper.clearAllData();
        });

        it('should search [automation.nonprofit.test] and click upon it', function () {
            helper.waitUntilElementPresent(searchPage.inSearch);
            searchPage.enterNameToSearch(nonprofitName);
            searchPage.selectSearchBtn();
            searchPage.selectSearchResultBeneficiaryName(nonprofitName, null);
        });

        it('should continue', function () {
            helper.selectContinueBtn();
        });

        it('should select repeat donation', function () {
            helper.waitUntilElementPresent(helper.donationDetailsPanel);
            detailsPage.checkRepeatDonation();
        });

        it('should select JPY - currency', function () {
            detailsPage.selectCurrency('JPY - Japanese Yen (¥)');
        });

        it('should enter amount: 1000.1 and email', function () {
            detailsPage.enterAmount('1000.1');
            detailsPage.enterEmail('test@protractor.com');
        });

        it('should trim decimals for JPY', function () {
            expect(detailsPage.getAmount()).toEqual('1000');
        });

        it('should select dont publish name', function () {
            detailsPage.checkDontPublishName();
        });

        it('should click donate now button', function () {
            detailsPage.clickDonateNow();
        });

        it('should verify payment method panel', function () {
            helper.waitUntilElementPresent(helper.paymentMethodsPanel);
            expect(paymentPage.chckShowOnlyRepeat.isSelected()).toBe(true);
            expect(paymentPage.elPaymentMethods.count()).toBe(repeatMethods);
        });

        it('should click payment method and continue', function () {
            paymentPage.clickPaymentMethod();
            paymentPage.clickContinue();
        });

        it('should see repeat donation every month and jpy with no decimals', function () {
            helper.waitUntilElementPresent(helper.donationPreviewPanel);
            expect(previewPage.txtGiftAid.isPresent()).toBeFalsy();
            expect(previewPage.txtRepeatEvery.isPresent()).toBeTruthy();
            expect(previewPage.getRepeatEveryTxt()).toContain('month');
            // expect(previewPage.getDonationAmount()).toEqual('¥ 1,000');     BUG
        });
        
        it('should see donations only visible to beneficiaries', function () {
            expect(previewPage.txtVisibleTobeneficiaries.isPresent()).toBeTruthy();
        });

    });

    describe('Sub suite: Pre donation - select not supported method', function () {

        beforeAll(function () {
            browser.get(widgetUrl);
            helper.waitUntilElementPresent(helper.widgetPanel);
        });

        afterAll(function () {
            helper.clearAllData();
        });

        it('should search [automation.nonprofit.test] and click upon it', function () {
            helper.waitUntilElementPresent(searchPage.inSearch);
            searchPage.enterNameToSearch(nonprofitName);
            searchPage.selectSearchBtn();
            searchPage.selectSearchResultBeneficiaryName(nonprofitName, null);
        });

        it('should continue', function () {
            helper.selectContinueBtn();
        });

        it('should select repeat donation', function () {
            helper.waitUntilElementPresent(helper.donationDetailsPanel);
            detailsPage.checkRepeatDonation();
        });

        it('should enter amount: 1000 and email', function () {
            detailsPage.enterAmount('1000');
            detailsPage.enterEmail('test@protractor.com');
        });

        it('should click donate now button', function () {
            detailsPage.clickDonateNow();
        });

        it('should verify payment method panel', function () {
            helper.waitUntilElementPresent(helper.paymentMethodsPanel);
            expect(paymentPage.chckShowOnlyRepeat.isSelected()).toBe(true);
            expect(paymentPage.elPaymentMethods.count()).toBe(repeatMethods);
        });

        it('should display all payment methods', function () {
            paymentPage.clickShowOnlyRepeat();
            expect(paymentPage.elPaymentMethods.count()).toBe(14);
        });

        it('should display repeat donations payment methods', function () {
            paymentPage.clickShowOnlyRepeat();
            expect(paymentPage.elPaymentMethods.count()).toBe(repeatMethods);
        });

        it('should display all payment methods', function () {
            paymentPage.clickShowOnlyRepeat();
            expect(paymentPage.elPaymentMethods.count()).toBe(14);
        });

        it('should click Paypal payment method and No on warning', function () {
            paymentPage.clickPaymentMethod('Paypal');
            helper.clickNoThanksWarning();
        });

        it('should see continue disabled', function () {
            expect(paymentPage.btnContinue.isEnabled()).toBeFalsy();
        });

        it('should click Paypal payment method and Yes on warning', function () {
            paymentPage.clickPaymentMethod('Paypal');
            helper.clickYesWarning();
            expect(paymentPage.btnContinue.isEnabled()).toBeTruthy();
        });

        it('should click continue', function () {
            paymentPage.clickContinue();
        });

        it('should not see repeat donation', function () {
            helper.waitUntilElementPresent(helper.donationPreviewPanel);
            expect(previewPage.txtRepeatEvery.isPresent()).toBeFalsy();
            expect(previewPage.txtOnceOff.isPresent()).toBeTruthy();
        });

        it('should not see donations only visible to beneficiaries', function () {
            expect(previewPage.txtVisibleTobeneficiaries.isPresent()).toBeFalsy();
        });

        it('should see Paypal as payment method', function () {
            expect(helper.getSpanByContainingText("Paypal").isDisplayed()).toBeTruthy();
            expect(helper.getSpanByContainingText("Visa").isPresent()).toBeFalsy();
        });

        it('should click on details bullet', function () {
            helper.clickDetailsBullet();
        });

        it('repeat donation displaying and disabled ', function () {
            expect(detailsPage.chkRepeat.isPresent()).toBeTruthy();
            expect(detailsPage.chkRepeat.isEnabled()).toBeFalsy();
        });

        it('should change amount to 900', function () {
            detailsPage.enterAmount('900');
        });

        it('should click change method link', function () {
            detailsPage.clickLnkChangePayment();
            helper.waitUntilElementPresent(helper.paymentMethodsPanel);
        });

    });

});
