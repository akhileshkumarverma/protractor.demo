var helper = require('./../helpers/helper.js');

var slidersPage = function () {

    //--------------------------------------------------------------------------
    // Elements
    //--------------------------------------------------------------------------

    this.lnkSliders = $('.fa-sliders');

    this.lnkAdd = $('.fa-plus-circle');

    this.lnkReset = $('a.refresh');

    this.allSliderPassports = $$('gw-beneficiary-slider-passport');

    this.txtDonationAmount = $('.selected-beneficiaries-text');

    //--------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------

    this.clickSliders = function () {
		this.lnkSliders.click();
	};

	this.clickAdd = function () {
		this.lnkAdd.click();
	};

	this.clickReset = function () {
		this.lnkReset.click();
	};

    this.getAllSliderPassports = function () {
    	return this.allSliderPassports.count()
    };

    this.getNthTextPercentagePassport = function (nth) {
		return this.allSliderPassports.get(nth).$('.percentage').getText()
	};

    this.selectTrashOnPassport = function (value=null) {
    	if (value) {
        	helper.getBenficiaryPassport(value).first().$('.fa-trash').click();
		} else {
    		$('.fa-trash').click();
		}
    };

    this.selectBeneficiaryNameOnPassport = function (value) {
		element(by.cssContainingText('span', value)).click()
	};

	this.getBeneficiaryPassport = function (value) {
		return element.all(by.css('gw-beneficiary-slider-passport')).filter(function(_details) {
			return _details.element(by.css('.benificiary-name')).getText().then(function (name) {
				return name === value;
			});
		});
	};

	this.moveSliderByX = function (value, x) {
		let sliderBar = this.getBeneficiaryPassport(value).first().$('.mat-slider-thumb')

		browser.actions().
		dragAndDrop(sliderBar, {x: x, y: 0}).
		perform();
	};

	this.lockBeneficiarySlider = function (value) {
		this.getBeneficiaryPassport(value).first().$('.fa-unlock').click()
	};

    this.lockTopBeneficiarySlider = function () {
        $('.fa-unlock').click()
    };

	this.unlockBeneficiarySlider = function (value) {
		this.getBeneficiaryPassport(value).first().$('.fa-lock').click()
	};

	this.getBeneficiarySplitAmount = function (value) {
		return this.getBeneficiaryPassport(value).first().$('.ammount').getText()
	};

	this.getDonationAmount = function () {
		return this.txtDonationAmount.getText();
	};

    this.getAllBenefPassports = function () {
        return $$('gw-beneficiary-slider-passport').count();
    };

    this.getDisabledSlider = function () {
		return $('.mat-slider-disabled');
    };

};

module.exports = new slidersPage();
