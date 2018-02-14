var searchPage            = require('./../../po/search.po');
var helper                = require('./../../helpers/helper.js');
var usersData             = require('./../../data/users/data');
var detailsPage           = require('./../../po/details.po');
var paymentPage           = require('./../../po/payment.po');
var loginPage             = require('./../../po/login.po');
var signUp                = require('./../../po/signup.po');
var fbPage                = require('./../../po/site/fb_login.po');

describe('Third Party', function () {

    var widgetUrl = usersData.widgetUrl;
    var memberFbEmail = usersData.emails.memberFbEmail;
    var memberFbName = usersData.memberFbName;
    var passwordFb = usersData.emails.passwordFb;
    var nonprofitName = usersData.nonprofitName;

    let thirdParty = {
        'Facebook': 'Log into Facebook | Facebook',
        'Google': 'Sign in - Google Accounts',
        'Yahoo': 'Yahoo - login'
    }


    describe('Sub suite: Login and signup => fb, yahoo, google windows open', function () {

        beforeAll(function () {
            browser.get(widgetUrl);
            helper.waitUntilElementPresent(helper.widgetPanel);
        });

        afterAll(function () {
            helper.clearAllData();
            browser.ignoreSynchronization = false
        });

        it('should click sign in', function () {
            helper.clickLnkTopBarSignIn();
        });

        it('should login => click on each 3rd party and close window', () => {
            helper.waitUntilElementPresent(helper.loginPanel);
            browser.ignoreSynchronization = true;

            for (let key in thirdParty){
                helper.selectThirdPartyProvider(key);
                helper.waitUntilWindowCount(2);
                helper.switchToNextWindow();
                expect(browser.getTitle()).toBe(thirdParty[key])
                helper.closeAndSwitchToPreviousWindow();
                helper.waitUntilWindowCount(1);
            };
        });

        it('should click sign up link', function () {
            loginPage.clickLnkSignUp();
            helper.waitUntilElementPresent(helper.signupMemberPanel);
        });

        it('should signup => click on each 3rd party and close window', () => {
            helper.waitUntilElementPresent(helper.signupMemberPanel);

            for (let key in thirdParty){
                helper.selectThirdPartyProvider(key);
                helper.waitUntilWindowCount(2);
                helper.switchToNextWindow();
                expect(browser.getTitle()).toBe(thirdParty[key])
                helper.closeAndSwitchToPreviousWindow();
                helper.waitUntilWindowCount(1);
            };
        });
    });

    describe('Sub suite: Login with fb', function () {

        beforeAll(function () {
            browser.get(widgetUrl);
            helper.waitUntilElementPresent(helper.widgetPanel);
        });

        afterAll(function () {
            helper.clearAllData();
            browser.ignoreSynchronization = false
        });

        it('should click sign in', function () {
            helper.clickLnkTopBarSignIn();
        });

        it('should select login with fb and navigate to fb window', () => {
            helper.waitUntilElementPresent(helper.loginPanel);
            browser.ignoreSynchronization = true;

            helper.selectThirdPartyProvider('Facebook');
            helper.waitUntilWindowCount(2);
            helper.switchToNextWindow();
            expect(browser.getTitle()).toBe(thirdParty['Facebook'])
        });

        it('should log in on fb', () => {
            fbPage.logInFb(memberFbEmail, passwordFb)
        })

        it('should be logged in', () =>{
            expect(helper.getWindowTitle()).toEqual('test');
            helper.waitUntilElementPresent(helper.lnkTopBarAvatar);
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

        it('should verify logged in fb details', function () {
            helper.waitUntilElementPresent(helper.donationDetailsPanel);
            expect(detailsPage.getLoggedInText()).toContain(memberFbEmail);
            expect(detailsPage.getLoggedInText()).toContain(memberFbName);
        });
    });
});
