
//  npm install protractor-browser-logs --save-dev
//  https://github.com/wix/protractor-browser-logs

// Evaluated:
// An error was thrown in an afterAll
// AfterAll Failed: UNEXPECTED MESSAGE: {"level":"SEVERE","message":
// "https://widget-test-dev.s3.amazonaws.com/head/2.chunk.js 280:28 \"User login failed!\""}


var browserLogs           = require('protractor-browser-logs');
var usersData             = require('./../data/users/data');
var pageObject            = require('../po/__pages').container.PageObject;
var templatePage          = pageObject.getTemplatePage();
var searchPage            = pageObject.getSearchPage();
var detailsPage           = pageObject.getDetailsPage();
var loginPage             = pageObject.getLoginPage();
var loginMainPage         = pageObject.getLoginMainPage();
var paymentPage           = pageObject.getPaymentPage();
var previewPage           = pageObject.getPreviewPage();
var helper                = require('./helper.js');

describe('Home page:', function () {

	describe('login as company', function () {

		var baseUrl = usersData.baseUrl
		var widgetUrl = usersData.widgetUrl
		var fundraiserWorldGBName = usersData.fundraiserWorldGBName;
		var companyNameWhitelist = usersData.companyNameWhitelist;
		var nonprofitName = usersData.nonprofitName;
		var memberName55 = usersData.memberName55;
		var companyEmailWhitelist = usersData.emails.companyEmailWhitelist;
		var companyNameWhitelist = usersData.companyNameWhitelist;
		var password = usersData.emails.password;
		var logs;

		beforeAll(function () {
			logs = browserLogs(browser);
			logs.ignore(logs.INFO);
			logs.ignore(logs.DEBUG);

			browser.get(widgetUrl);
			helper.waitUntilElementPresent(helper.widgetPanel);
		});

		afterAll(function () {
			return logs.verify();

			helper.clearAllData();
		});

		it('should search: fundraiserWorldGBName',function () {
			helper.waitUntilElementPresent(searchPage.inSearch);
			searchPage.enterNameToSearch(fundraiserWorldGBName);
			searchPage.selectSearchBtn();
			helper.selectBenefPassport(fundraiserWorldGBName);

			expect(helper.lnkTopBarSignIn.isPresent()).toBeTruthy();
			expect(helper.lnkTopBarAvatar.isPresent()).toBeFalsy();
			expect(searchPage.lnkMyConnections.isPresent()).toBeFalsy();
		});

		it('should continue', function () {
			helper.selectContinueBtn();
		});

		it('should click sign in', function () {
			helper.clickLnkTopBarSignIn();
			helper.waitUntilElementPresent(helper.loginPanel);
		});

		it('should log in as a company', function () {
			loginPage.enterEmail(companyEmailWhitelist);
			loginPage.enterPassword('incorrectPass');
			loginPage.clickBtnLogIn();
			helper.waitUntilElementIsNotPresent(helper.spinner);
		})

	});
});