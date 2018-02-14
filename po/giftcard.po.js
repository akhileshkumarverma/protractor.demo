var helper = require('./../helpers/helper.js');

var giftCardPage = function () {

    //--------------------------------------------------------------------------
    // Elements
    //--------------------------------------------------------------------------

    this.inGiftCard = $('#giftCardCode');

    //--------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------

    this.enterGiftCardCode = (value) => {
        this.inGiftCard.clear();
        this.inGiftCard.sendKeys(value);
        helper.logInfo(`entered gift card code: ${value}`)
    };


};

module.exports = new giftCardPage();
