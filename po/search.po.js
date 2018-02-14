var helper = require('./../helpers/helper.js');

var searchPage = function () {

    //--------------------------------------------------------------------------
    // Elements
    //--------------------------------------------------------------------------

    this.inSearch = $('[name="searchText"]');

    this.btnSearch = $('.search-btn');

    this.elBenefName = $$('.benificiary-name').first();

    this.elAllBenefPassports = $$('gw-passport');

    this.lnkAdvancedSearch = $('.advanced-search');

    this.lnkNewSearch = $('.new-search');

    this.selBenefType = $('[dropdowntype="beneficiaryType"]');

    this.btnBack = $('.back-button');

    this.lnkBackToSearch = $('.back-to-search');

    this.lnkMyConnections = $('.my-connections');

    this.whitelistText = element(by.cssContainingText('div.instructions-text', 'Please choose from the'))

    //--------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------

    this.enterNameToSearch = function (value) {
        this.inSearch.clear();
        this.inSearch.sendKeys(value);
    };

    this.selectSearchBtn = function () {
        helper.waitAndClick(this.btnSearch);
        helper.waitUntilElementIsNotPresent(helper.spinner);
    };

    this.selectAdvancedSearchLnk = function () {
        this.lnkAdvancedSearch.click();
        helper.waitUntilElementPresent(helper.advSearchSubPanel);
        helper.waitUntilElementIsNotPresent(helper.spinner);
        browser.sleep(1000);
    };

	this.selectMyConnectionsLnk = function () {
		helper.waitAndClick(this.lnkMyConnections);
		helper.waitUntilElementIsNotPresent(helper.spinner);
	};

	this.selectSearchResultBeneficiaryName = function (value, nth) {
        if (nth === null){
			$$('.beneficiary-details').first().element(by.cssContainingText('div', value)).click()
		} else {
			$$('.beneficiary-details').get(nth).element(by.cssContainingText('div', value)).click()
        }
    };

	this.getSearchResulBeneficiaryName = function () {
		return this.elBenefName.getText()
	};

    this.getAllBenefPassports = function () {
        return this.elAllBenefPassports.count()
    };

	this.selectNthResultBeneficiaryAvatar = function (nth) {
	    helper.waitUntilElementClickable($('gw-passport:nth-of-type(' + nth + ') .avatar'))
		$('gw-passport:nth-of-type(' + nth + ') .avatar').click()
	};

	// ---------------------------------------------
    // Advanced
    // ---------------------------------------------

    this.selectSearchAdvancedBtn = function () {
        helper.waitAndClick(element(by.cssContainingText('button', 'Search')));
        helper.waitUntilElementIsNotPresent(helper.spinner)
    };
    
    this.selectSearchNonprofitsOnly = function () {
        helper.waitAndClick(this.selBenefType);

        let dropDown = $('gw-beneficiary-type-dropdown');
        helper.waitUntilElementPresent(dropDown);

        let benefSelect = element(by.cssContainingText('gw-beneficiary-type-dropdown span', "Search Nonprofits Only"));
        helper.waitAndClick(benefSelect);

        helper.waitUntilElementIsNotPresent(dropDown);
    };

    this.selectSearchFundraisersOnly = function () {
        helper.waitAndClick(this.selBenefType);

        let dropDown = $('gw-beneficiary-type-dropdown');
        helper.waitUntilElementPresent(dropDown);

        let benefSelect = element(by.cssContainingText('gw-beneficiary-type-dropdown span', "Search Fundraisers Only"));
        helper.waitAndClick(benefSelect);

        helper.waitUntilElementIsNotPresent(dropDown);
    };

    this.selectSelectAll = function () {
        helper.waitAndClick(this.selBenefType);

        let dropDown = $('gw-beneficiary-type-dropdown');
        helper.waitUntilElementPresent(dropDown);

        let benefSelect = element(by.cssContainingText('gw-beneficiary-type-dropdown span', "Search All"));
        helper.waitAndClick(benefSelect);

        helper.waitUntilElementIsNotPresent(dropDown);
    };

    this.selectCategory = function (value) {
        let elFinder = $("[dropdowntype=\"category\"]")
        helper.waitAndClick(elFinder);

        let dropDown = $('gw-categories-dropdown');
        helper.waitUntilElementPresent(dropDown);

        let categorySelect = element(by.cssContainingText('gw-categories-dropdown span', value));
        helper.waitAndClick(categorySelect);

        helper.waitUntilElementIsNotPresent(dropDown);
    };

    this.selectNewSearch = function () {
        this.lnkNewSearch.click()
    };

	// ---------------------------------------------
	// World fundraiser info
	// ---------------------------------------------

    this.getIsYourCountryText = function () {
        return element(by.cssContainingText('div.text-center','not your country?')).getText();
	};
    
    this.selectGoBack = function () {
        this.btnBack.click();
	};

    this.selectBackToSearch = function () {
        helper.waitAndClick(this.lnkBackToSearch);
	};

	this.selectInfoIcon = function () {
		$('.fa-info-circle').click();
	};

};


module.exports = new searchPage();
