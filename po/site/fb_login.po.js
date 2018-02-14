var helper = require('./../../helpers/helper.js');

var fbLoginPage = function () {

    //--------------------------------------------------------------------------
    // Elements
    //--------------------------------------------------------------------------

    this.inEmail = $('#email');

    //--------------------------------------------------------------------------
    // Functions
    //--------------------------------------------------------------------------

    this.logInFb = function (user, password) {
        helper.waitUntilElementPresent(this.inEmail);
        this.inEmail.sendKeys(user);
        $('#pass').sendKeys(password);
        $('#loginbutton').click();
        helper.switchToWindow();
    };


};

module.exports = new fbLoginPage();
