var searchPage       = require('./../../po/search.po');
var detailsPage      = require('./../../po/details.po');
var paymentPage      = require('../../po/payment.po');
var previewPage      = require('./../../po/preview.po')
var incompletePage   = require('./../../po/incomplete.po')
var usersData        = require('./../../data/users/data');
var helper           = require('./../../helpers/helper.js');


describe('Suite: Incomplete', function () {

    const invalidEmailErr = "Invalid email (example: john@abc.com)"
    const baseUrl = usersData.baseUrl;
    const widgetUrl = usersData.widgetUrl;
    const nonprofitName = usersData.nonprofitName;
    const fundraiserName = usersData.fundraiserName;

    describe('Sub suite: Try again and cancel', function () {

        beforeAll(function () {
            browser.get(widgetUrl);
            helper.waitUntilElementPresent(helper.widgetPanel);
        });

        afterAll(() => helper.clearAllData());

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

        it('should select dont publish my name', function () {
            detailsPage.checkDontPublishName();
        });

        it('should select anonymous - dont publish gets disabled', function () {
            detailsPage.clickChckAnonymous();
            expect(detailsPage.chkHideDonor.isSelected()).toBeFalsy();
            expect(detailsPage.chkHideDonor.isEnabled()).toBeFalsy();
        });

        it('should enter amount: 1000, incorrect email', function () {
            detailsPage.enterAmount('1000');
            detailsPage.enterEmail('QAtest@protractor/com');
        });

        it('should click donate now button', function () {
            detailsPage.clickDonateNow();
        });

        it('should not be allowed to proceed', function () {
            expect(helper.getValidationFormErrText()).toEqual(invalidEmailErr);
        });

        it('should enter correct email: startswith UpperCase', function () {
            detailsPage.enterEmail('QAtest@protractor.com');
        });

        it('should click donate now button', function () {
            detailsPage.clickDonateNow();
        });

        it('should click payment method and continue', function () {
            helper.waitUntilElementPresent(helper.paymentMethodsPanel);
            paymentPage.clickPaymentMethod();
            paymentPage.clickContinue();
        });

        it('should see anonymous text', function () {
            helper.waitUntilElementPresent(helper.donationPreviewPanel);
            expect(previewPage.txtAnonymous.isPresent()).toBeTruthy();
            expect(previewPage.txtVisibleTobeneficiaries.isPresent()).toBeFalsy();
        });

        it('should verify anchored edit links', function () {
            expect(previewPage.getEditDetailsLnkHref()).toContain('#emailTag');
            expect(previewPage.getEditAnonymousLnkHref()).toContain('#amountTag');
            expect(previewPage.getEditAmountLnkHref()).toContain('#amountTag');
            expect(previewPage.getEditMessageLnkHref()).toContain('#messageTag');
            expect(previewPage.getFirstNameLnkHref()).toContain('details#emailTag');
            expect(previewPage.getLastNameLnkHref()).toContain('details#emailTag');
            expect(previewPage.getPaymentMethodLnkHref()).toContain('/widget/donate/payment');
        });

        it('should continue to world pay', function () {
            previewPage.clickBtnDonate();
            previewPage.clickContinueOverlay();
        });

        it('wait for a new window', function () {
            helper.waitUntilWindowCount(2);
        });

        it('should close world pay window', function () {
            browser.ignoreSynchronization = true;
            helper.switchToNextWindow();
            helper.closeAndSwitchToPreviousWindow();
        });

        it('wait for window closed', function () {
            helper.waitUntilWindowCount(1);
            browser.ignoreSynchronization = false;
        });

        it('should see incomplete panel', function () {
            helper.waitUntilElementPresent(helper.incompletePanel);
        });

        it('should click try again', function () {
            incompletePage.clickLnkTryAgain();
        });

        it('should continue to world pay', function () {
            helper.waitUntilElementPresent(helper.donationPreviewPanel);
            previewPage.clickBtnDonate();
            previewPage.clickContinueOverlay();
        });

        it('wait for a new window', function () {
            helper.waitUntilWindowCount(2);
        });

        it('should close world pay window', function () {
            browser.ignoreSynchronization = true;
            helper.switchToNextWindow();
            helper.closeAndSwitchToPreviousWindow();
        });

        it('wait for window closed', function () {
            helper.waitUntilWindowCount(1);
            browser.ignoreSynchronization = false;
        });

        it('should see incomplete panel', function () {
            helper.waitUntilElementPresent(helper.incompletePanel);
        });

        it('should cancel', function () {
            incompletePage.clickLnkCancel();
        });

        it('should donation get cancelled', function () {
            helper.waitUntilElementPresent(searchPage.inSearch);
            searchPage.enterNameToSearch(nonprofitName);
        });

    });

});
