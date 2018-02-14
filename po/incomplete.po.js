var helper = require('./../helpers/helper.js');

var incompletePage = function () {

    //--------------------------------------------------------------------------
    // Elements
    //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------

    this.clickLnkTryAgain = function () {
        helper.getElementByCssContainingText('div.fake-link', 'Try again').click();
    };

    this.clickLnkCancel = function () {
        let elFind = helper.getElementByCssContainingText('div.fake-link', 'Cancel the donation');
        helper.waitAndClick(elFind);
    };


};

module.exports = new incompletePage();
