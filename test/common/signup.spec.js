var searchPage            = require('./../../po/search.po');
var detailsPage           = require('./../../po/details.po');
var paymentPage           = require('../../po/payment.po');
var loginPage             = require('./../../po/login.po');
var signUp                = require('./../../po/signup.po');
var previewPage           = require('./../../po/preview.po');
var usersData             = require("../../data/users/data");
var helper                = require("../../helpers/helper.js");

describe("Suite: Sign up", function () {

    var widgetUrl = usersData.widgetUrl
	var fundraiserWorldGBName = usersData.fundraiserWorldGBName;

  describe('Sub suite: As individual from uk', function () {

	var randomEmail = helper.randomAlphabeticLow(5) + '.' + helper.randomAlphabeticLow(5) + "@tc.com"
	var incorrectEmail = helper.randomAlphabeticLow(5) + '.' + helper.randomAlphabeticLow(5) + "@tc."
	const invalidEmailErr = "Invalid email (example: john@abc.com)"
	var randomFirstName =  helper.randomAlphabeticLow(10);
	var randomLastName =  helper.randomAlphabeticLow(10);
	var password = usersData.emails.password;

    beforeAll(function () {
		browser.get(widgetUrl);
		helper.waitUntilElementPresent(helper.widgetPanel);
    });

    afterAll(function () {
    	helper.clearAllData();
    });

    it('should search: fundraiserWorldGBName',function () {
        helper.waitUntilElementPresent(searchPage.inSearch);
        searchPage.enterNameToSearch(fundraiserWorldGBName);
        searchPage.selectSearchBtn();
        helper.selectBenefPassport(fundraiserWorldGBName);
	});

    it('should continue', function () {
        helper.selectContinueBtn();
    });

    it('should click sign in', function () {
		helper.clickLnkTopBarSignIn();
		helper.waitUntilElementPresent(helper.loginPanel);
	});

    it('should click sign up link', function () {
    	loginPage.clickLnkSignUp();
		helper.waitUntilElementPresent(helper.signupMemberPanel);
	});

    it('should enter incorrect details', function () {
		signUp.enterFirstName(randomFirstName);
		signUp.enterLastName(randomLastName);
		helper.selectCountry('United Kingdom');
        signUp.enterEmail(incorrectEmail);
        signUp.enterPassword(password);
        signUp.selectChckTerms();
	});

	it('should not be allowed to sign up', function () {
		signUp.clickBtnSignup();
		helper.waitUntilElementIsNotPresent(helper.spinner);
		expect(helper.getValidationFormErrText()).toEqual(invalidEmailErr);
	});

    it('should correct details', function () {
        signUp.enterEmail(randomEmail);
	});

    it('should sign up', function () {
    	signUp.clickBtnSignup();
		helper.waitUntilElementIsNotPresent(helper.spinner);
		helper.waitUntilElementPresent(helper.donationDetailsPanel);
	});

    it('verify company details', function () {
        expect(detailsPage.getLoggedInText()).toContain(randomFirstName);
        expect(detailsPage.getLoggedInText()).toContain(randomLastName);
        expect(detailsPage.getLoggedInText()).toContain(randomEmail);
        expect(helper.getSelectedCountry()).toBe('United Kingdom');
	});

    it('should go to search', function () {
        helper.clickSearchBullet();
	});

    it('should not see my connections', function () {
        expect(searchPage.lnkMyConnections.isPresent()).toBeFalsy();
	});

    it('should continue', function () {
      helper.selectContinueBtn();
    });

    it('should enter amount: 20.01', function () {
        detailsPage.enterAmount('20.01');
    });

    it('should click donate now button', function () {
        detailsPage.clickDonateNow();
    });

    it('should click payment method and continue', function () {
		helper.waitUntilElementPresent(helper.paymentMethodsPanel);
		paymentPage.clickPaymentMethod();
		paymentPage.clickContinue();
    });

    it('should see preview', function () {
        helper.waitUntilElementPresent(helper.donationPreviewPanel);
		expect(previewPage.getDonorDetails(randomFirstName).isPresent()).toBeTruthy();
		expect(previewPage.getDonorDetails(randomLastName).isPresent()).toBeTruthy();
		expect(previewPage.getDonorDetails(randomEmail).isPresent()).toBeTruthy();
		expect(previewPage.getDonorDetails('United Kingdom').isPresent()).toBeTruthy();
		expect(previewPage.getDonationAmount()).toMatch('.+20.01');
    });

	it('should gift aid be not applied but donation qualifies', function () {
		expect(previewPage.txtGiftAid.isPresent()).toBeTruthy();
		expect(previewPage.txtGiftAidAmount.isPresent()).toBeFalsy();
	});

	it('should go to details panel', function () {
    	helper.clickDetailsBullet();
		helper.waitUntilElementPresent(helper.donationDetailsPanel);
	});

	it('should log out', function () {
		helper.clickTopBarAvatar();
		helper.waitUntilElementPresent(helper.overlayContent);

		helper.clickLogout();
	});

	it('should be logged out: search panel', function () {
		helper.waitUntilElementPresent(helper.searchResultsPanel);
		helper.waitUntilElementPresent(searchPage.inSearch);

		expect(helper.lnkTopBarAvatar.isPresent()).toBeFalsy();
	});
  });

  describe('Sub suite: Fail to sign up', function () {

	var companyEmail          = usersData.emails.companyEmail;
	var memberEmail           = usersData.emails.memberEmail;
	var nonprofitEmail        = usersData.emails.nonprofitEmailAc1;
	var randomFirstName       =  helper.randomAlphabeticLow(10);
	var randomLastName        =  helper.randomAlphabeticLow(10);
	var password              = usersData.emails.password;
	var emailUsedErr          = 'Email address not available. Please try another';

	beforeAll(function () {
		browser.get(widgetUrl);
		helper.waitUntilElementPresent(helper.widgetPanel);
	});

	afterAll(function () {
		helper.clearAllData();
	});

	it('should search: fundraiserWorldGBName',function () {
		helper.waitUntilElementPresent(searchPage.inSearch);
		searchPage.enterNameToSearch(fundraiserWorldGBName);
		searchPage.selectSearchBtn();
	});

	it('should click sign in from search panel', function () {
		helper.clickLnkTopBarSignIn();
		helper.waitUntilElementPresent(helper.loginPanel);
	});

	it('should click sign up link', function () {
		loginPage.clickLnkSignUp();
		helper.waitUntilElementPresent(helper.signupMemberPanel);
	});

	it('should enter details: company used email', function () {
		signUp.enterFirstName(randomFirstName);
		signUp.enterLastName(randomLastName);
		helper.selectCountry('United Kingdom');
		signUp.enterEmail(companyEmail);
		signUp.enterPassword(password);
		signUp.selectChckTerms();
	});

	it('should click sign up button', function () {
		signUp.clickBtnSignup();
		helper.waitUntilElementIsNotPresent(helper.spinner);
	});

	it('should not sign up: email used', function () {
		expect(helper.signupMemberPanel.isPresent()).toBeTruthy();
		expect(helper.donationDetailsPanel.isPresent()).toBeFalsy();
	});

	it('should error: ' + emailUsedErr, function () {
		expect(helper.getValidationFormErrText()).toContain(emailUsedErr);
	});

	it('should enter details: member used email', function () {
		signUp.enterEmail(memberEmail);
		signUp.enterPassword(password);
	});

	it('should click sign up button', function () {
		signUp.clickBtnSignup();
		helper.waitUntilElementIsNotPresent(helper.spinner);
	});

	it('should not sign up: email used', function () {
		expect(helper.signupMemberPanel.isPresent()).toBeTruthy();
		expect(helper.donationDetailsPanel.isPresent()).toBeFalsy();
	});

	it('should error: ' + emailUsedErr, function () {
		expect(helper.getValidationFormErrText()).toContain(emailUsedErr);
	});

	it('should enter details: nonprofit used email', function () {
		signUp.enterEmail(nonprofitEmail);
		signUp.enterPassword(password);
	});

	it('should click sign up button', function () {
		signUp.clickBtnSignup();
		helper.waitUntilElementIsNotPresent(helper.spinner);
	});

	it('should not sign up: email used', function () {
		expect(helper.signupMemberPanel.isPresent()).toBeTruthy();
		expect(helper.donationDetailsPanel.isPresent()).toBeFalsy();
	});

	it('should error: ' + emailUsedErr, function () {
	  expect(helper.getValidationFormErrText()).toContain(emailUsedErr);
	});

  });
});
