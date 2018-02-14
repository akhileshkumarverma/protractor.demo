var helper = require('./../../helpers/helper.js');

var loginMainPage = function () {

    //--------------------------------------------------------------------------
    // Elements
    //--------------------------------------------------------------------------

    this.inEmail = $('#Email');

    //--------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------

    this.logInMainSite = function (user, password) {
        this.inEmail.sendKeys(user);
        $('#Password').sendKeys(password);
        $('.fullButton button').click();

        helper.waitUntilElementPresent($('#aS_LoginStatus'));
    };


};

module.exports = new loginMainPage();
