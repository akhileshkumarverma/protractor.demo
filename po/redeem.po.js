const helper = require('./../helpers/helper.js');

let redeemPage = function () {

    //--------------------------------------------------------------------------
    // Elements
    //--------------------------------------------------------------------------

    this.lnkMakeWtGiftCard = element(by.cssContainingText("a", "Make a donation without gift card"));

    this.btnUseGiftCard = element(by.cssContainingText("a", "Use gift card"));

    //--------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------

    this.clickBtnUseGiftCard = () => {
        helper.waitAndClick(this.btnUseGiftCard);
        helper.waitUntilElementIsNotPresent(helper.spinner);
    };

    this.clickLnkMakeWtGiftCard = () => {
        helper.waitAndClick(this.lnkMakeWtGiftCard);
    };

    this.getGiftCardAmountText = () =>{
        return $('.details.container strong').getText()
    };



};

module.exports = new redeemPage();
