var helper = require('./../helpers/helper.js');

var signUp = function () {

    //--------------------------------------------------------------------------
    // Elements
    //--------------------------------------------------------------------------

    this.inFirstName = $('#firstName');

    this.inLastName = $('#lastName');

    this.inEmail = $('#email');

    this.inPassword = $('#password');

    //--------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------
    
    this.enterFirstName = function (value) {
        this.inFirstName.sendKeys(value);
	};

	this.enterLastName = function (value) {
		this.inLastName.sendKeys(value);
	};

	this.enterEmail = function (value) {
		this.inEmail.clear();
		this.inEmail.sendKeys(value);
		helper.logInfo('email: ' + value)
	};

	this.enterPassword = function (value) {
		this.inPassword.sendKeys(value);
        helper.logInfo('password: ' + value)
	};

    this.clickBtnSignup = function () {
        $('button[type="submit"]').click();
    };

	this.selectChckTerms = function () {
		$('#terms').click();
	};


};

module.exports = new signUp();
