var helper = require('./../helpers/helper.js');

var loginPage = function () {

    //--------------------------------------------------------------------------
    // Elements
    //--------------------------------------------------------------------------

    this.inEmail = $('#email');

    this.inPassword = $('#password');

    this.btnLogin = $('.login').element(by.cssContainingText('button', 'Log in'));

    this.lnkGoBack = $('[href*="/donation/details"].fa-arrow-circle-left');

    this.lnkSignUp = element(by.cssContainingText('a', 'Sign up'));

    //--------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------

    this.clickBtnLogIn = function () {
        helper.waitAndClick(this.btnLogin);
    };

	this.clickLnkBack = function () {
        helper.waitAndClick(this.lnkGoBack);
	};

	this.clickLnkSignUp = function () {
	    helper.waitUntilElementIsNotPresent(helper.spinner);
        helper.waitAndClick(this.lnkSignUp);
	};

    this.enterEmail = function (value) {
		this.inEmail.sendKeys(value);
		helper.logInfo('email: ' + value);
	};

	this.enterPassword = function (value) {
		this.inPassword.sendKeys(value)
        helper.logInfo('password: ' + value);
	};

};

module.exports = new loginPage();
