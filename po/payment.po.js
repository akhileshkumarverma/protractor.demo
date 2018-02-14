var helper = require('./../helpers/helper.js');

var paymentMethodsPage = function () {


    //--------------------------------------------------------------------------
    // Elements
    //--------------------------------------------------------------------------

    this.btnContinue = $('.button');

    this.chckShowOnlyRepeat = $('#showRepeat');

    this.elPaymentMethods = $$('.payment-methods li');

    this.inGiftCard = $('#giftCardCode');

    //--------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------

    this.clickPaymentMethod = function (value='Mastercard') {
        const giftCards = [
            'test Gift Card',
            'Gift Card',
            'test Gift Card',
            'gift card']

        if (giftCards.includes(value)){
          value = 'test Gift Card'
        };

        helper.logInfo(`method: ${value}`)
        let el = element(by.cssContainingText('li', value));
        helper.waitAndClick(el);
    };

    this.clickContinue = function () {
        helper.waitUntilElementClickable(this.btnContinue);
        this.btnContinue.click();
	};
    
    this.clickShowOnlyRepeat = function () {
		this.chckShowOnlyRepeat.click();
	};

    this.enterGiftCardCode = (value) => {
        helper.waitUntilElementPresent(this.inGiftCard);
        this.inGiftCard.clear();
        this.inGiftCard.sendKeys(value);
        helper.logInfo(`entered gift card code: ${value}`)
    };

    this.getDonationTxt = () => {
        return $('.container .text-center').getText()
    };

};

module.exports = new paymentMethodsPage();
