const searchPage            = require('./../../po/search.po');
const helper                = require('./../../helpers/helper.js');
const usersData             = require('./../../data/users/data');
const detailsPage           = require('./../../po/details.po');
const paymentPage           = require('../../po/payment.po');
const loginMainPage         = require('../../po/site/login_main.po');

describe('Suite: Company matching', function () {

  var baseUrl = usersData.baseUrl
  var widgetUrlMatch = usersData.widgetUrlMatch
  var widgetUrlMatchWhitelist = usersData.widgetUrlMatchWhitelist;
  var widgetUrlMatchStopped = usersData.widgetUrlMatchStopped
  var nonprofitName = usersData.nonprofitName;

  describe('Sub suite: Guest, widget with no whitelist', function () {

        beforeAll(function () {
            browser.get(widgetUrlMatch);
            helper.logUrl(widgetUrlMatch);

            var panels = [helper.searchResultsPanel, helper.matchPanel];
            panels.forEach(helper.waitUntilElementPresent);
        });

        afterAll(function () {
            helper.clearAllData();
        });

        it('should enter and search nonprofit',function () {
            searchPage.enterNameToSearch(nonprofitName);
            searchPage.selectSearchBtn();
        });

        it('should see matching 80% up to 10', () => {
            expect(helper.getMatchText()).toContain('80%');
            expect(helper.getMatchUpToText()).toMatch('up to a maximum of');
            expect(helper.getMatchMaxText()).toContain('10');
        });

        it('should click on company link in match section', () => {
            helper.clickLnkMatchCompany('acompany');
            helper.waitUntilElementPresent(helper.overlayContent);
            expect(helper.getOverlayBeneficiaryName()).toContain('acompany');
            expect(helper.getOverlayBeneficiaryName()).toContain('(company9)');
        });

        it('should close overlay', function () {
            helper.closeOverlay();
            helper.waitUntilElementIsNotPresent(helper.overlayContent);
        });

        it('should select beneficary and continue', function () {
            searchPage.selectSearchResultBeneficiaryName(nonprofitName, null);
            helper.selectContinueBtn();
        });

        it('should see matching 80% up to 10', () => {
            expect(helper.getMatchText()).toContain('80%');
            expect(helper.getMatchUpToText()).toMatch('up to a maximum of');
            expect(helper.getMatchMaxText()).toContain('10');
        });

        it('should enter amount: 1000 and email', function () {
            detailsPage.enterAmount('1000');
            detailsPage.enterEmail('test@protractor.com');
        });

        it('should click Donate', function () {
            detailsPage.clickDonateNow();
        });

        it('should click payment method and continue', function () {
            helper.waitUntilElementPresent(helper.paymentMethodsPanel);
            paymentPage.clickPaymentMethod();
            paymentPage.clickContinue();
        });

        it('should see matching 80% up to 10', () => {
            expect(helper.getMatchText()).toContain('80%');
            expect(helper.getMatchUpToText()).toMatch('up to a maximum of');
            expect(helper.getMatchMaxText()).toContain('10');
        });

  });

  describe('Sub suite: Logged in, widget with whitelist', function () {

        let companyMatchEmail = usersData.emails.companyMatchEmail;
        let password = usersData.emails.password;

        beforeAll(function () {
            browser.ignoreSynchronization = true;
            browser.get(baseUrl + '/login');
            helper.logUrl(baseUrl + '/login');
        });

        afterAll(function () {
            helper.clearAllData();
        });

        it('should sign in', function () {
            helper.waitUntilElementVisible(loginMainPage.inEmail);
            loginMainPage.logInMainSite(companyMatchEmail, password)
        });

        it('load up widget', function () {
            browser.ignoreSynchronization = false;
            browser.get(widgetUrlMatchWhitelist);
            helper.logUrl(widgetUrlMatchWhitelist);
            helper.waitUntilElementPresent(helper.searchResultsPanel);
            helper.waitUntilElementPresent(helper.matchPanel);
        });

        it('should see matching text: 100%', () => {
            expect(searchPage.inSearch.isPresent()).toBeFalsy();
            expect(helper.getMatchText()).toContain('100%');
        });

        it('should select 2 beneficiaries and continue', function () {
            searchPage.selectNthResultBeneficiaryAvatar(2);
            searchPage.selectNthResultBeneficiaryAvatar(3);
            helper.selectContinueBtn();
        });

        it('should see matching text: 100%', () => {
            expect(helper.getMatchText()).toContain('100%');
        });

        it('should enter amount: 1000', function () {
            detailsPage.enterAmount('1000');
        });

        it('should click Donate', function () {
            detailsPage.clickDonateNow();
        });

        it('should click payment method and continue', function () {
            helper.waitUntilElementPresent(helper.paymentMethodsPanel);
            paymentPage.clickPaymentMethod();
            paymentPage.clickContinue();
        });

        it('should see matching text: 100%', () => {
            expect(helper.getMatchText()).toContain('100%');
        });

        it('should company logout', function () {
            helper.clickTopBarAvatar();
            helper.waitUntilElementPresent(helper.overlayContent);
            helper.clickLogout();
        });

        it('should reset - see matching block and whitelist', () => {
            helper.waitUntilElementPresent(helper.searchResultsPanel);
            helper.waitUntilElementPresent(helper.matchPanel);
            expect(searchPage.inSearch.isPresent()).toBeFalsy();
            expect(helper.getMatchText()).toContain('100%');
        });
    });

  describe('Sub suite: Stopped matching program', function () {

      beforeAll(function () {
          browser.get(widgetUrlMatchStopped);
          helper.logUrl(widgetUrlMatchStopped);
          helper.waitUntilElementPresent(helper.searchResultsPanel);
      });

      afterAll(function () {
          helper.clearAllData();
      });

      it('should not see match component',function () {
          expect(helper.matchPanel.isPresent()).toBeFalsy();
      });
  });

});
