import {browser, element, by, By, $, $$, ExpectedConditions} from 'protractor';
import detailsPage  = require('./../po/details.po');
import helper       = require('./../helpers/helper.js');

describe('Footer', function () {

    var arr;
    let langs = ['de', 'es', 'fr', 'it', 'pl', 'pt-BR', 'ko', 'ja', 'zh-TW', 'zh-CN', 'en']
    let deMakeADonation = "Spenden";
    var widgetUrl = "https://www.testnightly4.com/widget/donate"

    beforeAll(function () {
        browser.get(widgetUrl);
        helper.waitUntilElementPresent(helper.widgetPanel);
        arr = helper.getAllLangOptionsValues();
    });

    afterAll(function () {
        helper.clearAllData();
    });

    it('should see all languages', function () {
        expect(arr.sort()).toEqual(langs.sort());
    });

});


