const searchPage            = require('./../../po/search.po');
const usersData             = require('./../../data/users/data');
const detailsPage           = require('./../../po/details.po');
const paymentPage           = require('./../../po/payment.po');
const helper                = require('./../../helpers/helper.js');
const previewPage           = require('./../../po/preview.po');
const successPage           = require('./../../po/success.po');
const loginPage             = require('./../../po/login.po');
const slidersPage           = require('./../../po/sliders.po');
const manager               = require('./../../db/manager');

describe('Suite: Guest gift cards', function () {

    const baseUrl = usersData.baseUrl
    const widgetUrlFundraiserGB = usersData.widgetUrlFundraiserGB;
    const acharity50GBAlias = usersData.dataPop.acharity50GBAlias;
    const acharity50GBName = usersData.dataPop.acharity50GBName;
    const nonprofitEmail = usersData.emails.nonprofitEmailAc1;
    const password = usersData.emails.password;
    const giftCardBuyerEmail = "auto.giftcard@test.com";
    const amount = '€ 50.00';
    const position = 4;
    const guestEmail = 'test@protractor.com'

    let bookCode;
    let giftCardCodePartly;
    let giftCardCode;
    let giftCardCodeSliced;

    describe('Sub suite: fundraiser widget', function () {

        beforeAll(function (done) {
            browser.get(widgetUrlFundraiserGB);
            helper.logUrl(widgetUrlFundraiserGB);
            helper.waitUntilElementPresent(helper.donationDetailsPanel);

            manager.db.selectQuery('selectGcBook', {'{email}': giftCardBuyerEmail}).then(function _onSuccess(result){
                bookCode = result.recordset[0]['VoucherBookCode'].toString();
                helper.logInfo(`bookCode: ${bookCode}`)
                done();
            }).catch(function _onFailure(err){
                done.fail(err);
            });
        });

        afterAll(function () {
            helper.clearAllData();
        });

        it('should query db', (done) => {
            manager.db.selectQuery('selectGcCode', {'{bookCode}': bookCode}).then(function _onSuccess(result){
                helper.logInfo('giftCardCodePartly: ' + String(result.recordset[0]['']))
                giftCardCodePartly = result.recordset[0][''].toString();
                done();
            }).catch(function _onFailure(err){
                done.fail(err);
            });
        });

        it('should print out codes', () => {
            giftCardCode = bookCode + giftCardCodePartly;
            helper.logInfo(`bookCode: ${bookCode}`)
            helper.logInfo(`giftCardCodePartly: ${giftCardCodePartly}`)
            helper.logInfo(`giftCardCode: ${giftCardCode}`)
        });

        it('should enter amount and email', () => {
            helper.waitUntilElementPresent(detailsPage.inAmount);
            detailsPage.enterAmount('1000');
            detailsPage.enterEmail(guestEmail);
        });

        it('should select United Kingdom country', function () {
            helper.selectCountry('United Kingdom');
            expect(detailsPage.elGiftAid.isPresent()).toBeTruthy();
        });

        it('should click donate now button', () => {
            detailsPage.clickDonateNow();
        });

        it('should enter valid gift card code', () => {
            helper.waitUntilElementPresent(helper.paymentMethodsPanel);
            paymentPage.clickPaymentMethod('test Gift Card');
            paymentPage.enterGiftCardCode(giftCardCode);
        });

        it('should continue', function () {
            paymentPage.clickContinue();
            helper.waitUntilElementPresent(helper.donationPreviewPanel)
        });

        it('should come back to payment panel via bullet', function () {
            helper.clickPaymentBullet();
            helper.waitUntilElementPresent(helper.paymentMethodsPanel);
            expect(paymentPage.getDonationTxt()).toMatch(`.+${amount}`)
        });

        it('should continue', function () {
            paymentPage.clickContinue();
            helper.waitUntilElementPresent(helper.donationPreviewPanel)
        });

        it('should verify gift card on preview', () => {
            helper.waitUntilElementPresent(previewPage.giftCardIcon);
            expect(previewPage.giftCardProviderAvatar.isPresent()).toBeFalsy();
            expect(previewPage.getDonationAmount()).toEqual(amount);
            expect(previewPage.lnkEditGiftAid.isPresent()).toBeFalsy();
        });

        it('should click add beneficiaries', () =>{
            previewPage.clickIconAddBeneficiaries();
            helper.waitUntilElementPresent(helper.searchResultsPanel);
        });

        it('should search nonprofit: acharity50GBAlias',function () {
            helper.waitUntilElementPresent(searchPage.inSearch);
            searchPage.enterNameToSearch(acharity50GBAlias);
            searchPage.selectSearchBtn();
            helper.selectBenefPassport(acharity50GBName);
        });

        it('should continue', function () {
            helper.selectContinueBtn('preview');
        });

        it('should click icon sliders', function () {
            previewPage.clickIconSliders()
        });

        it('should click btn continue on sliders', function () {
            expect(slidersPage.getDonationAmount()).toMatch('You are donating.+50.00.');
            helper.selectContinueBtn('preview');
        });

        it('should see preview: guest email', function () {
            expect(previewPage.getDonorDetails(guestEmail).isDisplayed()).toBeTruthy();
        });

        it('should click sign in',function () {
            helper.clickLnkTopBarSignIn();
            helper.waitUntilElementPresent(helper.loginPanel);
        });

        it('should log in as a nonprofit', function () {
            loginPage.enterEmail(nonprofitEmail);
            loginPage.enterPassword(password);
            loginPage.clickBtnLogIn();
            helper.waitUntilElementIsNotPresent(helper.spinner);

            helper.waitUntilElementPresent(helper.donationPreviewPanel);
            expect(helper.lnkTopBarAvatar.isPresent()).toBeTruthy();
        });

        it('should see preview: nonprofit email', function () {
            expect(previewPage.getDonorDetails(nonprofitEmail).isDisplayed()).toBeTruthy();
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
            expect(successPage.lnkViewDonation.isDisplayed()).toBeTruthy();

            expect(successPage.lnkSignUp.isPresent()).toBeFalsy();
            expect(successPage.lnkRepeatDonation.isPresent()).toBeFalsy();
            expect(successPage.lnkRequestReceipt.isPresent()).toBeFalsy();
        });

    });

    describe('Sub suite: /redeem/giftCardCode', function () {

        const pageTitle = "Home - test";
        const acharity50GBAlias = usersData.dataPop.acharity50GBAlias;
        const acharity50GBName = usersData.dataPop.acharity50GBName;

        beforeAll(function (done) {
            manager.db.selectQuery('selectGcBook', {'{email}': giftCardBuyerEmail}).then(function _onSuccess(result){
                bookCode = result.recordset[0]['VoucherBookCode'].toString();
                helper.logInfo(`bookCode: ${bookCode}`)
                done();
            }).catch(function _onFailure(err){
                done.fail(err);
            });

            browser.ignoreSynchronization = true;
        });

        afterAll(function () {
            helper.clearAllData();
        });

        it('should query db', (done) => {
            manager.db.selectQuery('selectGcCode', {'{bookCode}': bookCode}).then(function _onSuccess(result){
                helper.logInfo('giftCardCodePartly: ' + String(result.recordset[0]['']))
                giftCardCodePartly = result.recordset[0][''].toString();
                done();
            }).catch(function _onFailure(err){
                done.fail(err);
            });
        });

        it('should print out codes', () => {
            giftCardCode = bookCode + giftCardCodePartly;
            giftCardCodeSliced = [giftCardCode.slice(0, position), "-", giftCardCode.slice(position, position *2),
                "-", giftCardCode.slice(position *2)].join('');

            helper.logInfo(`bookCode: ${bookCode}`)
            helper.logInfo(`giftCardCodePartly: ${giftCardCodePartly}`)
            helper.logInfo(`giftCardCode: ${giftCardCode}`)
            helper.logInfo(`giftCardCodeSliced: ${giftCardCodeSliced}`)
        });

        it('should open /redeem/${giftCardCode} url', function () {
            browser.get(`${baseUrl}/redeem/${giftCardCode}`);
            helper.logUrl(`${baseUrl}/redeem/${giftCardCode}`);
        });

        it('should see iframe over company profile', function () {
            helper.waitUntilElementPresent($('iframe'));
            expect(helper.getPageTitle()).toEqual(pageTitle);
        });

        it('should switch to frame', () =>{
            helper.switchToIFrame();
            helper.waitUntilElementPresent(helper.searchResultsPanel);
        });

        it('should recover from sychronization', () =>{
            browser.ignoreSynchronization = false;
        })

        it('should select nonprofit: acharity50GBAlias',function () {
            helper.waitUntilElementPresent(searchPage.inSearch);
            searchPage.enterNameToSearch(acharity50GBAlias);
            searchPage.selectSearchBtn();
            helper.selectBenefPassport(acharity50GBName);
        });

        it('should continue', function () {
            helper.selectContinueBtn();
        });

        it('should verify amount and repeat disabled', function () {
            helper.waitUntilElementPresent(helper.donationDetailsPanel);
            expect(detailsPage.getGiftCardAmount()).toEqual(amount);
            expect(detailsPage.chkRepeat.isEnabled()).toBeFalsy();
            detailsPage.enterEmail('test@protractor.com');
        });

        it('should click donate now button', () => {
            detailsPage.clickDonateNow();
        });

        it('should verify gift card on preview', () => {
            helper.waitUntilElementPresent(previewPage.giftCardIcon);
            expect(previewPage.giftCardProviderAvatar.isPresent()).toBeFalsy();
            expect(previewPage.getDonationAmount()).toEqual(amount);
            expect(previewPage.lnkEditGiftAid.isPresent()).toBeFalsy();
            expect(previewPage.getPaymentMethodTxt()).toContain(giftCardCodeSliced);
        });

        it('should click donate btn', function () {
            previewPage.clickBtnDonate('success');
        });

        it('verify success panel', function () {
            expect(successPage.lnkShareEmail.isDisplayed()).toBeTruthy();
            expect(successPage.lnkShareTwitter.isDisplayed()).toBeTruthy();
            expect(successPage.lnkShareFb.isDisplayed()).toBeTruthy();
            expect(successPage.lnkViewDonation.isDisplayed()).toBeTruthy();
            expect(successPage.lnkSignUp.isDisplayed()).toBeTruthy();

            expect(successPage.lnkRepeatDonation.isPresent()).toBeFalsy();
            expect(successPage.lnkRequestReceipt.isPresent()).toBeFalsy();
        });

    });
});
