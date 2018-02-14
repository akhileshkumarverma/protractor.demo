const searchPage            = require('./../../po/search.po');
const usersData             = require('./../../data/users/data');
const detailsPage           = require('./../../po/details.po');
const paymentPage           = require('./../../po/payment.po');
const helper                = require('./../../helpers/helper.js');
const redeemPage            = require('./../../po/redeem.po');
const previewPage           = require('./../../po/preview.po')
const giftcardPage          = require('./../../po/giftcard.po');
const successPage           = require('./../../po/success.po');
const loginPage             = require('./../../po/login.po');
const manager               = require('./../../db/manager');

describe('Suite: Default gift card', function () {

    const widgetUrlLockedGiftCard = usersData.widgetUrlLockedGiftCard;
    const widgetUrlUnLockedGiftCard = usersData.widgetUrlUnLockedGiftCard;
    const widgetUrlLockedGiftCardWhitelist = usersData.widgetUrlLockedGiftCardWhitelist;
    const widgetUrlUnLockedGiftCardWhitelist = usersData.widgetUrlUnLockedGiftCardWhitelist;
    const nonprofitNameAc1 = usersData.nonprofitNameAc1;
    const acharity50GBName = usersData.dataPop.acharity50GBName;
    const acharity50GBAlias = usersData.dataPop.acharity50GBAlias;
    const nonprofitName = usersData.nonprofitName;
    const shortErr = "Your gift card code should be at least 12 characters long.";
    const noGiftCardErr = "Please enter your gift card code.";
    const invalidCharsErr = "Sorry, this text has invalid characters.";
    const bookCode = "T1US";
    const amount = 'US$ 20.00';
    const donationDetails = "Donation Details - test"
    let giftCardCode;

    xdescribe('Sub suite: locked gift card', function () {

        beforeAll(function (done) {
            browser.get(widgetUrlLockedGiftCard);
            helper.logUrl(widgetUrlLockedGiftCard);
            helper.waitUntilElementPresent(helper.donationGiftCardsPanel);

            manager.db.selectQuery('selectGcCode', {'{bookCode}': bookCode}).then(function _onSuccess(result){
                giftCardCode = bookCode + result.recordset[0][''].toString();
                helper.logInfo(`gift card code: ${giftCardCode}`)
                done();
            }).catch(function _onFailure(err){
                done.fail(err);
            });
        });

        afterAll(function () {
            helper.clearAllData();
        });

        it('should error - gift card code', () => {
            giftcardPage.enterGiftCardCode(' ')
            helper.selectContinueBtn('error');
            expect(helper.getValidationFormErrText()).toEqual(shortErr);
        });

        it('should enter correct gift card code', () => {
            giftcardPage.enterGiftCardCode(giftCardCode)
            helper.selectContinueBtn('redeem');
        });

        it('should not see donate w/t gift card lnk', () => {
            expect(redeemPage.lnkMakeWtGiftCard.isPresent()).toBeFalsy();
            expect(redeemPage.btnUseGiftCard.isPresent()).toBeTruthy();
        });

        it('should click use gift card and verify bullets count', () => {
            redeemPage.clickBtnUseGiftCard();
            helper.waitUntilElementPresent(helper.searchResultsPanel);
            expect(helper.getBulletCount()).toBe(3);
        });

        it('should search nonprofit: acharity50GBAlias',function () {
            helper.waitUntilElementPresent(searchPage.inSearch);
            searchPage.enterNameToSearch(acharity50GBAlias);
            searchPage.selectSearchBtn();
            helper.selectBenefPassport(acharity50GBName);
        });

        it('should add [automation.nonprofit.test]',function () {
            searchPage.enterNameToSearch(nonprofitName);
            searchPage.selectSearchBtn();
            helper.selectBenefPassport(nonprofitName);
        });

        it('should continue', function () {
            helper.selectContinueBtn();
        });

        it('should enter amount email', function () {
            detailsPage.enterEmail('test@protractor.com');
            expect(detailsPage.getGiftCardAmount()).toEqual(amount);
            expect(detailsPage.getGiftCardText()).toContain('Donation gift card from');
        });

        it('should click on Donate now', function () {
            detailsPage.clickDonateNow();
        });

        it('should verify gift card on preview', () => {
            helper.waitUntilElementPresent(previewPage.giftCardIcon);
            helper.waitUntilElementPresent(previewPage.giftCardProviderAvatar);
            expect(previewPage.getDonationAmount()).toEqual(amount);
        });

        it('should verify beneficiaries amounts', function () {
            let items = previewPage.getAllAmountsBenef();
            expect(items).toEqual([
                {index: 0, text: 'US$ 10.00'},
                {index: 1, text: 'US$ 10.00'},
            ]);
        });

        it('should click lnk edit beneficiaries', function () {
            previewPage.clickEditBeneficiariesLnk();
            helper.waitUntilElementPresent(helper.slidersPanel);
            expect(helper.elErrorTxt.isPresent()).toBeFalsy();
        });

        it('should go back from beneficiaries panel', function () {
            helper.waitUntilElementPresent(helper.slidersPanel);
        });

    });

    xdescribe('Sub suite: unlocked gift card', function () {

        beforeAll(function (done) {
            browser.get(widgetUrlUnLockedGiftCard);
            helper.logUrl(widgetUrlUnLockedGiftCard);
            helper.waitUntilElementPresent(helper.donationGiftCardsPanel);

            manager.db.selectQuery('selectGcCode', {'{bookCode}': bookCode}).then(function _onSuccess(result){
                giftCardCode = bookCode + result.recordset[0][''].toString();
                helper.logInfo(`gift card code: ${giftCardCode}`)
                done();
            }).catch(function _onFailure(err){
                done.fail(err);
            });
        });

        afterAll(function () {
            helper.clearAllData();
            browser.ignoreSynchronization = false;
        });

        // it('should error - gift card code', () => {
        //     giftcardPage.enterGiftCardCode('')
        //     helper.selectContinueBtn('error');
        //     expect(helper.getValidationFormErrText()).toEqual(noGiftCardErr);
        // });

        it('should error - gift card code', () => {
            giftcardPage.enterGiftCardCode("XSCB<html>6Q8J")
            helper.selectContinueBtn('error');
            expect(helper.getValidationFormErrText()).toEqual(invalidCharsErr);
        });

        it('should enter correct gift card code', () => {
            giftcardPage.enterGiftCardCode(giftCardCode)
            helper.selectContinueBtn('redeem');
        });

        it('should see both lnks', () => {
            expect(redeemPage.lnkMakeWtGiftCard.isPresent()).toBeTruthy();
            expect(redeemPage.btnUseGiftCard.isPresent()).toBeTruthy();
        });

        it('should click lnk donate without & test out bullet count', () => {
            redeemPage.clickLnkMakeWtGiftCard();
            helper.waitUntilElementPresent(helper.searchResultsPanel);
            expect(helper.getBulletCount()).toBe(4);
        });

        it('should search nonprofit: acharity50GBAlias',function () {
            helper.waitUntilElementPresent(searchPage.inSearch);
            searchPage.enterNameToSearch(acharity50GBAlias);
            searchPage.selectSearchBtn();
            helper.selectBenefPassport(acharity50GBName);
        });

        it('should add [automation.nonprofit.test]',function () {
            searchPage.enterNameToSearch(nonprofitName);
            searchPage.selectSearchBtn();
            helper.selectBenefPassport(nonprofitName);
        });

        it('should continue', function () {
            helper.selectContinueBtn();
        });

        it('should enter amount email', function () {
            detailsPage.enterEmail('test@protractor.com');
            detailsPage.enterAmount('20');
        });

        it('should click donate now button', () => {
            detailsPage.clickDonateNow();
        });

        it('should enter valid gift card code', () => {
            helper.waitUntilElementPresent(helper.paymentMethodsPanel);
            paymentPage.clickPaymentMethod('test Gift Card');
            paymentPage.enterGiftCardCode(giftCardCode);
            paymentPage.clickContinue();
        });

        it('should see redeem panel', ()=> {
            helper.waitUntilElementPresent(helper.redeemPanel)
        });

        it('should click use gift card', () => {
            redeemPage.clickBtnUseGiftCard();
            helper.waitUntilElementPresent(helper.donationPreviewPanel);
        });

        it('should verify gift card on preview', () => {
            helper.waitUntilElementPresent(previewPage.giftCardIcon);
            helper.waitUntilElementPresent(previewPage.giftCardProviderAvatar);
            expect(previewPage.getDonationAmount()).toEqual(amount);
        });

        it('should verify beneficiaries amounts', function () {
            let items = previewPage.getAllAmountsBenef();
            expect(items).toEqual([
                {index: 0, text: 'US$ 10.00'},
                {index: 1, text: 'US$ 10.00'},
            ]);
        });

        it('should click donate btn', function () {
            previewPage.clickBtnDonate();
        });

        it('should see success panel', function () {
            helper.waitUntilElementPresent(helper.successPanel);
        });

        it('verify success panel', function () {
            expect(successPage.lnkShareEmail.isDisplayed()).toBeTruthy();
            expect(successPage.lnkShareTwitter.isDisplayed()).toBeTruthy();
            expect(successPage.lnkShareFb.isDisplayed()).toBeTruthy();
            expect(successPage.lnkSignUp.isDisplayed()).toBeTruthy();

            expect(successPage.lnkViewDonation.isDisplayed()).toBeTruthy();
            expect(successPage.lnkRepeatDonation.isPresent()).toBeFalsy();
            expect(successPage.lnkRequestReceipt.isPresent()).toBeFalsy();
        });
        
        it('should select view donation', function () {
            successPage.clickLnkViewDonation();
        });

        it('wait for a new donation details window', function () {
            browser.ignoreSynchronization = true;
            helper.waitUntilWindowCount(2);
            helper.switchToNextWindow();
            expect(helper.getCurrentUrl()).toContain('orders');
            // expect(helper.getCurrentUrl()).not.toContain('RequestReceipt');
            helper.closeAndSwitchToPreviousWindow();
        });

        it('wait for window closed', function () {
            helper.waitUntilWindowCount(1);
        });

    });

    xdescribe('Sub suite: locked gift card whitelisted', function () {

        /*
        whitelist of one
        logged in member
         */

        const memberGBEmail = usersData.emails.memberGBEmail;
        const password = usersData.emails.password;

        beforeAll(function (done) {
            browser.get(widgetUrlLockedGiftCardWhitelist);
            helper.logUrl(widgetUrlLockedGiftCardWhitelist);
            helper.waitUntilElementPresent(helper.donationGiftCardsPanel);

            manager.db.selectQuery('selectGcCode', {'{bookCode}': bookCode}).then(function _onSuccess(result){
                giftCardCode = bookCode + result.recordset[0][''].toString();
                helper.logInfo(`gift card code: ${giftCardCode}`)
                done();
            }).catch(function _onFailure(err){
                done.fail(err);
            });
        });

        afterAll(function () {
            helper.clearAllData();
            browser.ignoreSynchronization = false;
        });

        it('should enter correct gift card code', () => {
            giftcardPage.enterGiftCardCode(giftCardCode)
            helper.selectContinueBtn('redeem');
        });

        it('should not see donate w/t lnk', () => {
            expect(redeemPage.lnkMakeWtGiftCard.isPresent()).toBeFalsy();
            expect(redeemPage.btnUseGiftCard.isPresent()).toBeTruthy();
        });

        it('should click use gift card', () => {
            redeemPage.clickBtnUseGiftCard();
            helper.waitUntilElementPresent(helper.donationDetailsPanel);
            expect(helper.getBulletCount()).toBe(2);
        });

        it('should enter amount email', function () {
            detailsPage.enterEmail('test@protractor.com');
        });

        it('should click donate now button', () => {
            detailsPage.clickDonateNow();
        });

        it('should verify gift card on preview', () => {
            helper.waitUntilElementPresent(previewPage.giftCardIcon);
            helper.waitUntilElementPresent(previewPage.giftCardProviderAvatar);
            expect(previewPage.getDonationAmount()).toEqual(amount);
        });

        it('should click sign in',function () {
            helper.clickLnkTopBarSignIn();
            helper.waitUntilElementPresent(helper.loginPanel);

            expect(helper.lnkTopBarAvatar.isPresent()).toBeFalsy();
        });

        it('should log in as a member', function () {
            loginPage.enterEmail(memberGBEmail);
            loginPage.enterPassword(password);
            loginPage.clickBtnLogIn();
            helper.waitUntilElementIsNotPresent(helper.spinner);

            helper.waitUntilElementPresent(helper.donationPreviewPanel);
            expect(helper.lnkTopBarAvatar.isPresent()).toBeTruthy();
            expect(previewPage.lnkEditBeneficiaries.isPresent()).toBeFalsy();
        });

        it('should click donate btn', function () {
            previewPage.clickBtnDonate();
        });

        it('should see success panel', function () {
            helper.waitUntilElementPresent(helper.successPanel);
        });

        it('verify success panel', function () {
            expect(successPage.lnkShareEmail.isDisplayed()).toBeTruthy();
            expect(successPage.lnkShareTwitter.isDisplayed()).toBeTruthy();
            expect(successPage.lnkShareFb.isDisplayed()).toBeTruthy();
            expect(successPage.lnkSignUp.isPresent()).toBeFalsy();

            expect(successPage.lnkViewDonation.isDisplayed()).toBeTruthy();
            expect(successPage.lnkRepeatDonation.isPresent()).toBeFalsy();
            expect(successPage.lnkRequestReceipt.isPresent()).toBeFalsy();
        });

        it('should select view donation', function () {
            successPage.clickLnkViewDonation();
        });

        it('wait for a new donation details window', function () {
            browser.ignoreSynchronization = true;
            helper.waitUntilWindowCount(2);
            helper.switchToNextWindow();
            expect(helper.getCurrentUrl()).toContain('orders');
            helper.closeAndSwitchToPreviousWindow();
        });

        it('wait for window closed', function () {
            helper.waitUntilWindowCount(1);
            browser.ignoreSynchronization = false;
        });

        it('should member logout', function () {
            helper.clickTopBarAvatar();
            helper.waitUntilElementPresent(helper.overlayContent);
            helper.clickLogout();
        });

        it('should reset widget', () => {
            // helper.waitUntilElementPresent(helper.donationDetailsPanel);
            // expect(helper.getBulletCount()).toBe(3);   27099
        });

    });

    xdescribe('Sub suite: unlocked gift card whitelisted  - opt out', function () {

        /*
        whitelist of three
         */

        const memberGBEmail = usersData.emails.memberGBEmail;
        const password = usersData.emails.password;

        beforeAll(function (done) {
            browser.get(widgetUrlUnLockedGiftCardWhitelist);
            helper.logUrl(widgetUrlUnLockedGiftCardWhitelist);
            helper.waitUntilElementPresent(helper.donationGiftCardsPanel);

            manager.db.selectQuery('selectGcCode', {'{bookCode}': bookCode}).then(function _onSuccess(result){
                giftCardCode = bookCode + result.recordset[0][''].toString();
                helper.logInfo(`gift card code: ${giftCardCode}`)
                done();
            }).catch(function _onFailure(err){
                done.fail(err);
            });
        });

        afterAll(function () {
            helper.clearAllData();
        });

        it('should enter correct gift card code', () => {
            giftcardPage.enterGiftCardCode(giftCardCode)
            helper.selectContinueBtn('redeem');
        });

        it('should verify redeem panel', () => {
            expect(redeemPage.lnkMakeWtGiftCard.isPresent()).toBeTruthy();
            expect(redeemPage.btnUseGiftCard.isPresent()).toBeTruthy();
        });

        it('should click make donation w/t gift card lnk', () => {
            redeemPage.clickLnkMakeWtGiftCard();
            helper.waitUntilElementPresent(helper.searchResultsPanel);
            expect(helper.getBulletCount()).toBe(4);
        });

        it('should see whitelist', () => {
            expect(searchPage.whitelistText.isDisplayed()).toBeTruthy();
            expect(searchPage.inSearch.isPresent()).toBeFalsy();
            expect(searchPage.lnkAdvancedSearch.isPresent()).toBeFalsy();
        });

        it('should select beneficiary',function () {
            helper.selectBenefPassport(nonprofitNameAc1);
        });

        it('should continue', function () {
            helper.selectContinueBtn();
        });

        it('should enter amount and email, gift card not present', function () {
            detailsPage.enterEmail('test@protractor.com');
            detailsPage.enterAmount('1000');
            expect(detailsPage.giftCardAmount.isPresent()).toBeFalsy();
        });
    });


    describe('Sub suite: unlocked gift card whitelisted  - opt in', function () {

        /*
        whitelist of three
        logged in company
        change payment method
         */

        const companyEmail = usersData.emails.companyEmail;
        const password = usersData.emails.password;

        beforeAll(function (done) {
            browser.get(widgetUrlUnLockedGiftCardWhitelist);
            helper.logUrl(widgetUrlUnLockedGiftCardWhitelist);
            helper.waitUntilElementPresent(helper.donationGiftCardsPanel);

            manager.db.selectQuery('selectGcCode', {'{bookCode}': bookCode}).then(function _onSuccess(result){
                giftCardCode = bookCode + result.recordset[0][''].toString();
                helper.logInfo(`gift card code: ${giftCardCode}`)
                done();
            }).catch(function _onFailure(err){
                done.fail(err);
            });
        });

        afterAll(function () {
            helper.clearAllData();
            browser.ignoreSynchronization = false;
        });

        it('should enter correct gift card code', () => {
            giftcardPage.enterGiftCardCode(giftCardCode)
            helper.selectContinueBtn('redeem');
        });

        it('should verify redeem panel', () => {
            expect(redeemPage.lnkMakeWtGiftCard.isPresent()).toBeTruthy();
            expect(redeemPage.btnUseGiftCard.isPresent()).toBeTruthy();
        });

        it('should click use gift card', () => {
            redeemPage.clickBtnUseGiftCard();
            helper.waitUntilElementPresent(helper.searchResultsPanel);
        });

        it('should see whitelist', () => {
            expect(searchPage.whitelistText.isDisplayed()).toBeTruthy();
            expect(searchPage.inSearch.isPresent()).toBeFalsy();
            expect(searchPage.lnkAdvancedSearch.isPresent()).toBeFalsy();
        });

        it('should select beneficiary',function () {
            helper.selectBenefPassport(nonprofitNameAc1);
        });

        it('should continue', function () {
            helper.selectContinueBtn();
        });

        it('should enter amount email', function () {
            detailsPage.enterEmail('test@protractor.com');
        });

        it('should click donate now button', () => {
            detailsPage.clickDonateNow();
        });

        it('should verify gift card on preview', () => {
            helper.waitUntilElementPresent(previewPage.giftCardIcon);
            helper.waitUntilElementPresent(previewPage.giftCardProviderAvatar);
            expect(previewPage.getDonationAmount()).toEqual(amount);
        });

        it('should click sign in',function () {
            helper.clickLnkTopBarSignIn();
            helper.waitUntilElementPresent(helper.loginPanel);

            expect(helper.lnkTopBarAvatar.isPresent()).toBeFalsy();
        });

        it('should log in as a company', function () {
            loginPage.enterEmail(companyEmail);
            loginPage.enterPassword(password);
            loginPage.clickBtnLogIn();
            helper.waitUntilElementIsNotPresent(helper.spinner);

            helper.waitUntilElementPresent(helper.donationPreviewPanel);
            expect(helper.lnkTopBarAvatar.isPresent()).toBeTruthy();
            expect(previewPage.lnkEditBeneficiaries.isPresent()).toBeFalsy();
        });

        it('should click bullet => payment methods', function () {
            helper.clickPaymentBullet();
            helper.waitUntilElementPresent(helper.paymentMethodsPanel);
        });

        it('should change payment method and continue', function () {
            helper.waitUntilElementPresent(helper.paymentMethodsPanel);
            paymentPage.clickPaymentMethod();
            paymentPage.clickContinue();
        });

        it('should click bullet => search', function () {
            helper.clickSearchBullet();
            helper.waitUntilElementPresent(helper.searchResultsPanel);
            // expect(searchPage.inSearch.isPresent()).toBeFalsy();  27099
        });

        it('should company logout', function () {
            helper.clickTopBarAvatar();
            helper.waitUntilElementPresent(helper.overlayContent);
            helper.clickLogout();
        });

        it('should reset - see whitelist', () => {
            helper.waitUntilElementPresent(helper.searchResultsPanel);
            // expect(searchPage.inSearch.isPresent()).toBeFalsy();  27099
        });

    });

});
