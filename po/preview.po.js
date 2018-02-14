var helper = require('./../helpers/helper.js');

var previewPage = function () {

    //--------------------------------------------------------------------------
    // Locators
    //--------------------------------------------------------------------------

    this.txtGiftAid = element(by.cssContainingText('span', 'Make your donation 25% bigger for free.'));

    this.txtRepeatEvery = element(by.cssContainingText('span', 'repeat every'));

    this.txtVisibleTobeneficiaries = element(by.cssContainingText('span',
        'Your donation details will be visible to beneficiaries only.'));

    this.txtAnonymous = element(by.cssContainingText('span', 'You are making an anonymous donation.'))

    this.txtOnceOff = element(by.cssContainingText('span', 'once-off'));

    this.txtGiftAidAmount = $('.giftAid-amount');

    this.txtMessage = $('#message span');

    this.lnkEditDetails = $('#donor-details .fa-pencil');

    this.lnkEditBeneficiaries = $('#beneficiaries .fa-pencil');

    this.lnkEditGiftAid = $('#gift-aid .fa-pencil');

    this.lnkEditMessage = $('#message .fa-pencil');

    this.lnkEditAnonymous = $('#anonymous-donation .fa-pencil');

    this.lnkPaymentMethod = $('#payment-method .fa-pencil');

    this.lnkHideDonation = $('#hide-donation .fa-pencil');

    this.lnkEditAmount = $('#amount .fa-pencil');

    this.lnkFirstName = $$('.donor-details a').get(0);

    this.lnkLastName = $$('.donor-details a').get(1);

    this.paymentMethodTxt = $('#payment-method .content');

    this.btnContinueOverlay = $('.wp-confirm').element(by.cssContainingText('span', 'Continue'));

    this.giftCardIcon = $('.aPM_Voucher');

    this.giftCardProviderAvatar = $('.provider-avatar');

    this.iconAddBeneficiaries = $('.add-adjust .fa-plus-circle');

    this.iconSliders = $('.add-adjust .fa-sliders')


    //--------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------

    this.clickDonateWithoutGiftAidLnk = function () {
        element(by.cssContainingText('a', 'donate without Gift Aid')).click();
    };

    this.getGiftAidAmount = function () {
      return this.txtGiftAidAmount.getText()
    };

    this.getDonorDetails = function (value) {
        return $('.donor-details').element(by.cssContainingText('span', value));
	};

    this.getDonationAmount = function () {
    	return $('.donation-amount.total').getText();
	};

    this.getRepeatEveryTxt = function () {
		return this.txtRepeatEvery.getText();
	};

    this.getPaymentMethodTxt = function () {
		return this.paymentMethodTxt.getText();
	};

	this.getMessageTxt = function () {
		return this.txtMessage.getText();
	};

    this.clickEditDetailsLnk = function () {
		this.lnkEditDetails.click();
	};

    this.clickEditHideDonation = function () {
		this.lnkHideDonation.click();
        helper.waitUntilElementPresent(helper.donationDetailsPanel);
	};

    this.clickEditBeneficiariesLnk = function () {
        this.lnkEditBeneficiaries.click();
    };

	this.clickEditGiftAidLnk = function () {
		this.lnkEditGiftAid.click();
	};

	this.clickEditMessageLnk = function () {
		this.lnkEditMessage.click();
	};

	this.clickEditPaymentMethodLnk = function () {
		this.lnkPaymentMethod.click();
	};

	// help panels

	this.clickIconGiftAidHelp = function () {
		let el = $('#gift-aid .fa-info-circle')
        helper.waitAndClick(el);
        helper.waitUntilElementPresent(helper.overlayContent);
	};

    this.clickIconAnonHelp = function () {
        let el = $('#anonymous-donation .fa-info-circle')
        helper.waitAndClick(el);
        helper.waitUntilElementPresent(helper.overlayContent);
    };

    this.clickWindDidNotOpen = function () {
        let el = element(by.cssContainingText('.fake-link', 'The payment window did not open'));
        helper.waitAndClick(el);
        helper.waitUntilElementPresent(helper.overlayContent);
    };


    // get hrefs - edit links

    this.getEditDetailsLnkHref = function () {
        return this.lnkEditDetails.getAttribute('href')
    };

    this.getEditGiftAidLnkHref = function () {
        return this.lnkEditGiftAid.getAttribute('href')
    };

    this.getEditMessageLnkHref = function () {
        return this.lnkEditMessage.getAttribute('href')
    };

    this.getPaymentMethodLnkHref = function () {
        return this.lnkPaymentMethod.getAttribute('href')
    };

    this.getEditAnonymousLnkHref = function () {
        return this.lnkEditAnonymous.getAttribute('href')
    };

    this.getEditAmountLnkHref = function () {
        return this.lnkEditAmount.getAttribute('href')
    };

    this.getFirstNameLnkHref = function () {
        return this.lnkFirstName.getAttribute('href')
    };

    this.getLastNameLnkHref = function () {
        return this.lnkLastName.getAttribute('href')
    };

	this.clickBtnDonate = function (switchCase=null) {
	    let btn = $('gw-donation-preview button');
        helper.scrollIntoView(btn);
        browser.sleep(500);
        btn.click();
        switch (switchCase){
            case 'success':
                helper.waitUntilElementPresent(helper.successPanel);
                break
            case 'overlay':
                helper.waitUntilElementPresent(helper.gWOverlay);
                break
        }
    };

	this.clickIconAddBeneficiaries = function () {
        helper.waitAndClick(this.iconAddBeneficiaries);
    };

	this.clickIconSliders = function () {
        helper.waitAndClick(this.iconSliders);
        helper.waitUntilElementPresent(helper.slidersPanel);
    };

	this.clickLnkCompanyPM = (value) => {
	    let el = $('#payment-method').element(by.cssContainingText('span.fake-link', value));
	    helper.waitAndClick(el);
    };

    this.getAllBeneciariesCount = function () {
        return $$("[id^='beneficiaries-list']");
    };

	// world pay overlay
    this.clickContinueOverlay = function () {
        helper.waitUntilElementClickable(this.btnContinueOverlay);
        this.btnContinueOverlay.click();
    };

    this.getAllPercentageBenef = function () {
        return $$('ul .donation-percent').map(function(elm, index) {
            return {
                index: index,
                text: elm.getText(),
            };
        });
    };

    this.getAllAmountsBenef = function () {
        return $$('ul .beneficiary-amount').map(function(elm, index) {
            return {
                index: index,
                text: elm.getText(),
            };
        });
    };
};

module.exports = new previewPage();
