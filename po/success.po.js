let helper = require('./../helpers/helper.js');

let successPage = function () {

    //--------------------------------------------------------------------------
    // Elements
    //--------------------------------------------------------------------------

    this.blockGiftCardDemo = $('.demo-gift-card');

    this.iconSuccess = $('.fa-check-circle');

    this.lnkViewDonation = element(by.cssContainingText('a', 'View donation'));

    this.lnkRequestReceipt = element(by.cssContainingText('a', 'Request receipt'));

    this.lnkRepeatDonation = element(by.cssContainingText('a', 'Repeat donation'));

    this.lnkSignUp = element(by.cssContainingText('a', 'Sign up'));

    this.lnkShareFb = $('.fa-facebook-square');

    this.lnkShareTwitter = $('.fa-twitter-square');

    this.lnkShareEmail = $('.fa-envelope-square');

    //--------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------

    this.clickSaveTemplate = function () {
        this.btnSaveTemplate.click();
    };

    this.clickBtnBuyGiftCards = () => {
        let btn = element(by.cssContainingText('a.button','Buy Gift Cards'));
        helper.waitAndClick(btn);
    };

    this.clickLnkViewDonation = () => {
        helper.waitAndClick(this.lnkViewDonation);
    };

    this.clickLnkRequestReceipt = () => {
        helper.waitAndClick(this.lnkRequestReceipt);
    };


};

module.exports = new successPage();
