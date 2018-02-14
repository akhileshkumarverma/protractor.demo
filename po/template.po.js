var helper = require('./../helpers/helper.js');

var templatePage = function () {

    //--------------------------------------------------------------------------
    // Elements
    //--------------------------------------------------------------------------

    this.btnSaveTemplate = $('.template');

    //--------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------

    this.clickSaveTemplate = function () {
        this.btnSaveTemplate.click();
    };


};

module.exports = new templatePage();
