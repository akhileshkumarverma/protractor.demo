const searchPage            = require('./../../po/search.po');
const usersData             = require('./../../data/users/data');
const detailsPage           = require('./../../po/details.po');
const paymentPage           = require('./../../po/payment.po');
const helper                = require('./../../helpers/helper.js');
const redeemPage            = require('./../../po/redeem.po');
const previewPage           = require('./../../po/preview.po');
const loginPage             = require('./../../po/login.po');
const successPage           = require('./../../po/success.po');
const manager               = require('./../../db/manager');

describe('Suite: Members only gift cards', function () {

    const baseUrl = usersData.baseUrl
    const widgetUrl = usersData.widgetUrl
    const widgetUrlFundraiserGB = usersData.widgetUrlFundraiserGB;
    const widgetUrlSingleWhitelist = usersData.widgetUrlSingleWhitelist;
    const companyNameWhitelist = usersData.companyNameWhitelist;
    const bookCode = "T1GB";
    let giftCardCode;
    const amount = '£ 20.00'
    const donationDetails = "Donation Details - test"

    describe('Sub suite: Guest attempts to redeem', function () {

        const memberGBEmail = usersData.emails.memberGBEmail;
        const password = usersData.emails.password;

        beforeAll(function (done) {
            browser.get(widgetUrlFundraiserGB);
            helper.logUrl(widgetUrlFundraiserGB);
            helper.waitUntilElementPresent(helper.donationDetailsPanel);

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

        it('should enter amount and email', () => {
            helper.waitUntilElementPresent(detailsPage.inAmount);
            detailsPage.enterAmount('20');
            detailsPage.enterEmail('test@protractor.com');
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

        it('should click make without gift card - resets panel', () => {
            redeemPage.clickLnkMakeWtGiftCard();
        });

        it('should enter amount and email', () => {
            helper.waitUntilElementPresent(detailsPage.inAmount);
            detailsPage.enterAmount('20');
            detailsPage.enterEmail('test@protractor.com');
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

        it('should click use gift card', () => {
            redeemPage.clickBtnUseGiftCard();
            helper.waitUntilElementPresent(helper.loginPanel);
        });

        it('should log in as a member', function () {
            loginPage.enterEmail(memberGBEmail);
            loginPage.enterPassword(password);
            loginPage.clickBtnLogIn();
            helper.waitUntilElementIsNotPresent(helper.spinner);

            helper.waitUntilElementPresent(helper.donationPreviewPanel);
            expect(helper.lnkTopBarAvatar.isPresent()).toBeTruthy();
        });

        it('should verify gift card on preview', () => {
            helper.waitUntilElementPresent(previewPage.giftCardIcon);
            helper.waitUntilElementPresent(previewPage.giftCardProviderAvatar);
            expect(previewPage.getDonationAmount()).toEqual(amount);
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

            expect(successPage.lnkViewDonation.isPresent()).toBeFalsy();
            expect(successPage.lnkSignUp.isPresent()).toBeFalsy();

            expect(successPage.lnkRepeatDonation.isPresent()).toBeFalsy();
            expect(successPage.lnkRequestReceipt.isPresent()).toBeTruthy();
        });

    });

    xdescribe('Sub suite: Redeem as logged in charity and request receipt lnk', function () {

        const nonprofitEmail = usersData.emails.nonprofitEmailAc1;
        const password = usersData.emails.password;

        beforeAll(function (done) {
            browser.get(widgetUrlSingleWhitelist);
            helper.logUrl(widgetUrlSingleWhitelist);
            helper.waitUntilElementPresent(helper.donationDetailsPanel);

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

        it('should enter amount and email', () => {
            helper.waitUntilElementPresent(detailsPage.inAmount);
            detailsPage.enterAmount('20');
            detailsPage.enterEmail('test@protractor.com');
        });

        it('should sign in',function () {
            helper.clickLnkTopBarSignIn();
            helper.waitUntilElementPresent(helper.loginPanel);
            expect(helper.lnkTopBarAvatar.isPresent()).toBeFalsy();
        });

        it('should log in as a nonprofit', function () {
            loginPage.enterEmail(nonprofitEmail);
            loginPage.enterPassword(password);
            loginPage.clickBtnLogIn();
            helper.waitUntilElementIsNotPresent(helper.spinner);

            helper.waitUntilElementPresent(helper.donationDetailsPanel);
            expect(helper.lnkTopBarAvatar.isPresent()).toBeTruthy();
        });

        it('should add message', function () {
            detailsPage.enterMessage('Gift card message!');
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
            expect(previewPage.getDonorDetails(nonprofitEmail).isPresent()).toBeTruthy();
        })

        it('should click donate btn', function () {
            previewPage.clickBtnDonate();
            helper.waitUntilElementPresent(helper.successPanel);
        });

        it('verify success panel', function () {
            expect(successPage.lnkShareEmail.isDisplayed()).toBeTruthy();
            expect(successPage.lnkShareTwitter.isDisplayed()).toBeTruthy();
            expect(successPage.lnkShareFb.isDisplayed()).toBeTruthy();
            expect(successPage.lnkViewDonation.isPresent()).toBeFalsy();

            expect(successPage.lnkRepeatDonation.isPresent()).toBeTruthy();
            expect(successPage.lnkRequestReceipt.isDisplayed()).toBeTruthy();
            expect(successPage.lnkSignUp.isPresent()).toBeFalsy();
        });

        it('should click on request receipts lnk', function () {
            successPage.clickLnkRequestReceipt();
        });

        it('wait for a new request receipt window', function () {
            browser.ignoreSynchronization = true;
            helper.waitUntilWindowCount(2);
            helper.switchToNextWindow();
            expect(helper.getWindowTitle()).toEqual(donationDetails);
            helper.closeAndSwitchToPreviousWindow();
        });

        it('wait for window closed', function () {
            helper.waitUntilWindowCount(1);
        });
    });

    describe('Sub suite: Redeem as logged in member and request receipt lnk', function () {

        const memberGBEmail = usersData.emails.memberGBEmail;
        const password = usersData.emails.password;

        beforeAll(function (done) {
            browser.get(widgetUrlFundraiserGB);
            helper.logUrl(widgetUrlFundraiserGB);
            helper.waitUntilElementPresent(helper.donationDetailsPanel);

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

        it('should enter amount and email', () => {
            helper.waitUntilElementPresent(detailsPage.inAmount);
            detailsPage.enterAmount('20');
            detailsPage.enterEmail('test@protractor.com');
        });

        it('should sign in',function () {
            helper.clickLnkTopBarSignIn();
            helper.waitUntilElementPresent(helper.loginPanel);
            expect(helper.lnkTopBarAvatar.isPresent()).toBeFalsy();
        });

        it('should log in as a member', function () {
            loginPage.enterEmail(memberGBEmail);
            loginPage.enterPassword(password);
            loginPage.clickBtnLogIn();
            helper.waitUntilElementIsNotPresent(helper.spinner);

            helper.waitUntilElementPresent(helper.donationDetailsPanel);
            expect(helper.lnkTopBarAvatar.isPresent()).toBeTruthy();
        });

        it('should add message, country, repeat donation chck', function () {
            detailsPage.checkRepeatDonation();
            detailsPage.enterMessage('Gift card message!');
        });

        it('should click donate now button', () => {
            detailsPage.clickDonateNow();
        });

        it('should enter valid gift card code', () => {
            helper.waitUntilElementPresent(helper.paymentMethodsPanel);
            paymentPage.clickShowOnlyRepeat();
            paymentPage.clickPaymentMethod('test Gift Card');
            helper.clickYesWarning();
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
        })

        it('should click donate btn', function () {
            previewPage.clickBtnDonate();
            helper.waitUntilElementPresent(helper.successPanel);
        });

        it('verify success panel', function () {
            expect(successPage.lnkShareEmail.isDisplayed()).toBeTruthy();
            expect(successPage.lnkShareTwitter.isDisplayed()).toBeTruthy();
            expect(successPage.lnkShareFb.isDisplayed()).toBeTruthy();
            expect(successPage.lnkViewDonation.isPresent()).toBeFalsy();

            expect(successPage.lnkRepeatDonation.isPresent()).toBeFalsy();
            expect(successPage.lnkRequestReceipt.isDisplayed()).toBeTruthy();
            expect(successPage.lnkSignUp.isPresent()).toBeFalsy();
        });
        
        it('should click on request receipts lnk', function () {
            successPage.clickLnkRequestReceipt();
        });

        it('wait for a new request receipt window', function () {
            browser.ignoreSynchronization = true;
            helper.waitUntilWindowCount(2);
            helper.switchToNextWindow();
            expect(helper.getWindowTitle()).toEqual(donationDetails);
            helper.closeAndSwitchToPreviousWindow();
        });

        it('wait for window closed', function () {
            helper.waitUntilWindowCount(1);
        });
    });

    describe('Sub suite: Logged in as a company', function () {

        const memberGBEmail = usersData.emails.memberGBEmail;
        const companyEmailWhitelist = usersData.emails.companyEmailWhitelist;
        const password = usersData.emails.password;

        beforeAll(function (done) {
            browser.get(widgetUrlSingleWhitelist);
            helper.logUrl(widgetUrlSingleWhitelist);
            helper.waitUntilElementPresent(helper.donationDetailsPanel);

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

        it('should enter amount and email', () => {
            helper.waitUntilElementPresent(detailsPage.inAmount);
            detailsPage.enterAmount('20');
            detailsPage.enterEmail('test@protractor.com');
        });

        it('should sign in',function () {
            helper.clickLnkTopBarSignIn();
            helper.waitUntilElementPresent(helper.loginPanel);
            expect(helper.lnkTopBarAvatar.isPresent()).toBeFalsy();
        });

        it('should log in as a company', function () {
            loginPage.enterEmail(companyEmailWhitelist);
            loginPage.enterPassword(password);
            loginPage.clickBtnLogIn();
            helper.waitUntilElementIsNotPresent(helper.spinner);

            helper.waitUntilElementPresent(helper.donationDetailsPanel);
            expect(helper.lnkTopBarAvatar.isPresent()).toBeTruthy();
        });

        it('should add message, country', function () {
            detailsPage.enterMessage('Gift card message!');
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

        // check if no duplciated
        it('should verify gift card on preview', () => {
            helper.waitUntilElementPresent(previewPage.giftCardIcon);
            helper.waitUntilElementPresent(previewPage.giftCardProviderAvatar);
            expect(previewPage.getDonationAmount()).toEqual(amount);
        })

        it('should click donate btn', function () {
            previewPage.clickBtnDonate();
            helper.waitUntilElementPresent(helper.successPanel);
        });

        it('verify success panel', function () {
            expect(successPage.lnkShareEmail.isDisplayed()).toBeTruthy();
            expect(successPage.lnkShareTwitter.isDisplayed()).toBeTruthy();
            expect(successPage.lnkShareFb.isDisplayed()).toBeTruthy();

            expect(successPage.lnkSignUp.isPresent()).toBeFalsy();

            expect(successPage.lnkViewDonation.isPresent()).toBeFalsy();
            expect(successPage.lnkRepeatDonation.isPresent()).toBeFalsy();
            expect(successPage.lnkRequestReceipt.isPresent()).toBeTruthy();
        });

        it('should company logout', function () {
            helper.clickTopBarAvatar();
            helper.waitUntilElementPresent(helper.overlayContent);
            helper.clickLogout();
        });

        it('should reset - see whitelisted widget', () => {
            helper.waitUntilElementPresent(helper.donationDetailsPanel);
            expect(detailsPage.chkRepeat.isEnabled()).toBeTruthy();
            expect(detailsPage.chkRepeat.isSelected()).toBeFalsy();
        });

        it('should be able to enter amount: 1000 and email', function () {
            detailsPage.enterAmount('1000');
            detailsPage.enterEmail('test@protractor.com');
        });

    });


    describe('Sub suite: /redeem/code link', function () {

        let pageTitle = companyNameWhitelist + ' ([automation.whitelistmulticompany.test]) - test profile';

        beforeAll(function (done) {
            manager.db.selectQuery('selectGcCode', {'{bookCode}': bookCode}).then(function _onSuccess(result){
                giftCardCode = bookCode + result.recordset[1][''].toString();
                helper.logInfo(`gift card code: ${giftCardCode}`)
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
            browser.get(`${baseUrl}/redeem/${giftCardCode}`);
            helper.logUrl(`${baseUrl}/redeem/${giftCardCode}`);
        });

        it('should see iframe over company profile', function () {
            helper.waitUntilElementPresent($('iframe'));
            expect(helper.getPageTitle()).toEqual(pageTitle);
        });

        it('should switch to frame', () =>{
            helper.switchToIFrame();
            helper.waitUntilElementPresent(helper.redeemPanel);
            browser.ignoreSynchronization = false;
        });

        it('should click use gift card', () => {
            redeemPage.clickBtnUseGiftCard();
        });

        it('should redirect to login', function () {
            helper.waitUntilElementPresent(helper.loginPanel);
        });

    });
});
