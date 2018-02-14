"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const helper = require("./../helpers/helper.js");
describe('Footer', function () {
    var arr;
    let langs = ['de', 'es', 'fr', 'it', 'pl', 'pt-BR', 'ko', 'ja', 'zh-TW', 'zh-CN', 'en'];
    let deMakeADonation = "Spenden";
    var widgetUrl = "https://www.testnightly4.com/widget/donate";
    beforeAll(function () {
        protractor_1.browser.get(widgetUrl);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC50Yy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudGMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBK0U7QUFFL0UsaURBQXdEO0FBRXhELFFBQVEsQ0FBQyxRQUFRLEVBQUU7SUFFZixJQUFJLEdBQUcsQ0FBQztJQUNSLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3ZGLElBQUksZUFBZSxHQUFHLFNBQVMsQ0FBQztJQUNoQyxJQUFJLFNBQVMsR0FBRyw4Q0FBOEMsQ0FBQTtJQUU5RCxTQUFTLENBQUM7UUFDTixvQkFBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QixNQUFNLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25ELEdBQUcsR0FBRyxNQUFNLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztJQUMzQyxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQztRQUNMLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywwQkFBMEIsRUFBRTtRQUMzQixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQyxDQUFDO0FBRVAsQ0FBQyxDQUFDLENBQUMifQ==