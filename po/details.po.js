var helper = require('./../helpers/helper.js');

var detailsPage = function() {

    //--------------------------------------------------------------------------
    // Elements
    //--------------------------------------------------------------------------

    this.lnkSliders = $('.fa-sliders');

    this.inAmount = $('#amount');

    this.giftCardAmount = $('.green-code');

    this.inMessage = $('#message');

    this.inEmail = $('#email');

    this.inFirstName = $('#firstName');

    this.inLastName = $('#lastName');

    this.chkAnonymous = $('#anonymous');

    this.chkHideMessage = $('#hideMessage');

    this.chkHideDonor = $('#hideDonation');

    this.chkRepeat = $('#repeat');

    this.btnDonateNow = $('.button');

    this.lnkAddBenef = $('.fa-plus-circle')

    // gift aid
    this.elGiftAid = $('.gift-aid');

    this.inGiftAidSwitch = $('[id$="AidSwitch"]~label');

    this.elGiftAidSection = $('[formgroupname="giftAidGroup"]');

    this.inGiftAidStreet = $('#streetAddress');

    this.inGiftAidAddress2 = $('#streetAddress2');

    this.inGiftAidCity = $('#city');

    this.inGiftAidZipCode = $('#zipCode');

    this.inUKTaxPayer = $('#isUKTax');

    //--------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------

	this.getHeadingText = () => $('h1.text-center').getText()


    this.clickSliders = function () {
    	helper.waitUntilElementClickable(this.lnkSliders);
    	browser.sleep(1000);  // once in a while it clicks but it doesnt react to click
        this.lnkSliders.click();
    };

	this.clickAddBenef = function () {
		browser.sleep(1000);
		helper.waitAndClick(this.lnkAddBenef);
	};

    this.enterAmount = function (value) {
        this.inAmount.clear()
        this.inAmount.sendKeys(value);
    };

    this.getAmount = function () {
        return this.inAmount.getAttribute('value');
    };

    this.getGiftCardAmount = function () {
		return this.giftCardAmount.getText();
    };

    this.getGiftCardText = function () {
		return $('.voucher-info>p').getText();
    };

    this.selectCurrency = function (value="EUR - Euro (€)") {
        let elFinder = $("[dropdowntype=\"currency\"]")
        helper.scrollIntoView(elFinder);
        helper.waitAndClick(elFinder);

        let dropDown = $('gw-currency-dropdown ');
        helper.waitUntilElementPresent(dropDown);

        let countrySelect = element(by.cssContainingText('gw-currency-dropdown span', value));
        helper.waitAndClick(countrySelect);

        helper.waitUntilElementIsNotPresent(dropDown);
    };

	this.enterMessage = function (value) {
		this.inMessage.sendKeys(value);
	};

	this.enterEmail = function (value) {
		this.inEmail.clear();
		this.inEmail.sendKeys(value);
	};

	this.getLoggedInText = () => element(by.cssContainingText('p','You are logged in as')).getText();

	this.enterFirstName = function (value) {
        this.inFirstName.clear();
		this.inFirstName.sendKeys(value);
	};

	this.getFirstName = function () {
		return this.inFirstName.getAttribute('value');
	};

	this.enterLastName = function (value) {
        this.inLastName.clear();
		this.inLastName.sendKeys(value);
	};

	this.clickDonateNow = function () {
        helper.scrollIntoView(this.btnDonateNow);
        browser.sleep(1000);
		helper.waitAndClick(this.btnDonateNow);
	};

	this.checkRepeatDonation = function () {
		helper.waitUntilElementClickable(this.chkRepeat);
		this.chkRepeat.click();
	};

	this.checkDontPublishName = function () {
		helper.waitUntilElementClickable(this.chkHideDonor);
		this.chkHideDonor.click();
	};

	this.clickChckAnonymous = () => this.chkAnonymous.click();

	this.clickLnkChangePayment = function () {
		let elFinder = element(by.cssContainingText('span', 'Change payment method'))
		helper.waitAndClick(elFinder);
	};

	this.clickBeneficaryName = function (value) {
		$('.ben-names').element(by.cssContainingText('span', value)).click();
	};

	// gift aid

	this.clickGiftAidSwitch = function () {
		helper.waitUntilElementClickable(this.inGiftAidSwitch);
		this.inGiftAidSwitch.click();
	};

	this.enterGiftAidStreet = function (value) {
		this.inGiftAidStreet.sendKeys(value);
	};

    this.enterGiftAidAddress2 = function (value) {
        this.inGiftAidAddress2.sendKeys(value);
    };

	this.enterGiftAidCity = function (value) {
		this.inGiftAidCity.sendKeys(value);
	};

	this.enterGiftAidZip = function (value) {
		this.inGiftAidZipCode.sendKeys(value);
	};

	this.clickUkTaxPayer = function () {
		this.inUKTaxPayer.click();
	};

	this.clickLogoutGiftAid = () => {
		$('.aS_infoCaution').element(by.cssContainingText('span', 'log out')).click()
	};


	// help panels

    this.clickIconRepeatHelp = function () {
        $('.repeat-frequency .fa-info-circle').click();
        helper.waitUntilElementPresent(helper.overlayContent);
    };

    this.clickIconMsgHelp = function () {
        $('[for="message"] .fa-info-circle').click();
        helper.waitUntilElementPresent(helper.overlayContent);
    };

    this.clickIconAnonHelp = function () {
        $('[for="anonymous"] .fa-info-circle').click();
        helper.waitUntilElementPresent(helper.overlayContent);
    };

    this.clickIconPublishHelp = function () {
        $('[for="hideDonation"] .fa-info-circle').click();
        helper.waitUntilElementPresent(helper.overlayContent);
    };

    this.clickGiftAidFindOutLnk = function () {
        $('.gift-aid').element(by.cssContainingText('.fake-link', 'Find out more')).click();
        helper.waitUntilElementPresent(helper.overlayContent);
    };
};

module.exports = new detailsPage();
