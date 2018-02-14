// not used at present
// https://youtrack.jetbrains.com/issue/WEB-27685

var bottlejs  = require('bottlejs').pop('test');

bottlejs.factory('PageObject', function () {
  return {
    getTemplatePage: function () {
      var templatePage = require('./template.po.js');
      return new templatePage();
    },
    getSearchPage: function () {
    var searchPage = require('./search.po.js');
    return new searchPage();
    },
    getDetailsPage: function () {
      var detailsPage = require('./details.po.js');
      return new detailsPage();
    },
    getSlidersPage: function () {
        var slidersPage = require('./sliders.po.js');
        return new slidersPage();
    },
    getPaymentPage: function () {
        var payPage = require('./payment.po.js');
        return new payPage();
    },
    getPreviewPage: function () {
        var prevPage = require('./preview.po.js');
        return new prevPage();
    },
    getLoginPage: function () {
      var loginPage = require('./login.po.js');
      return new loginPage();
    },
    getLoginMainPage: function () {
      var loginMainPage = require('./site/login_main.po.js');
      return new loginMainPage();
    }
    }
});

module.exports = bottlejs;
