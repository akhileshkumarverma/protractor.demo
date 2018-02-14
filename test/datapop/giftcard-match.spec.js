const searchPage            = require('./../../po/search.po');
const helper                = require('./../../helpers/helper.js');
const usersData             = require('./../../data/users/data');
const detailsPage           = require('./../../po/details.po');
const paymentPage           = require('./../../po/payment.po');
const redeemPage            = require('./../../po/redeem.po');
const previewPage           = require('./../../po/preview.po');
const manager               = require('./../../db/manager');

describe('Suite: Company matching - payment method gift card', function () {

      const widgetUrlMatch = usersData.widgetUrlMatch
      const nonprofitName = usersData.nonprofitName;
      const bookCode = "T1US";
      const position = 4;
      let giftCardCode;
      let giftCardCodeSliced;
      let panels = [helper.searchResultsPanel, helper.matchPanel];

      describe('Sub suite: Match is rubbed out', function () {

          beforeAll(function (done) {
              browser.get(widgetUrlMatch);
              helper.logUrl(widgetUrlMatch);

              panels.forEach(helper.waitUntilElementPresent);

              manager.db.selectQuery('selectGcCode', {'{bookCode}': bookCode}).then(function _onSuccess(result){
                  giftCardCode = bookCode + result.recordset[0][''].toString();
                  helper.logInfo(`gift card code: ${giftCardCode}`)
                  done();
              }).catch(function _onFailure(err){
                  done.fail(err);
              });
          });

          afterAll(function () {
              helper.clearAllData();
          });

          it('should enter and search nonprofit',function () {
              searchPage.enterNameToSearch(nonprofitName);
              searchPage.selectSearchBtn();
          });

          it('should print out codes', () => {
              giftCardCodeSliced = [giftCardCode.slice(0, position), "-", giftCardCode.slice(position, position *2),
                  "-", giftCardCode.slice(position *2)].join('');

              helper.logInfo(`bookCode: ${bookCode}`)
              helper.logInfo(`giftCardCode: ${giftCardCode}`)
              helper.logInfo(`giftCardCodeSliced: ${giftCardCodeSliced}`)
          });

          it('should see matching 80% up to 10', () => {
              expect(helper.getMatchText()).toContain('80%');
              expect(helper.getMatchUpToText()).toMatch('up to a maximum of');
              expect(helper.getMatchMaxText()).toContain('10');
          });

          it('should select beneficary and continue', function () {
              searchPage.selectSearchResultBeneficiaryName(nonprofitName, null);
              helper.selectContinueBtn();
          });

          it('should see matching 80% up to 10', () => {
              expect(helper.getMatchText()).toContain('80%');
              expect(helper.getMatchMaxText()).toContain('10');
          });

          it('should enter amount: 1000 and email', function () {
              detailsPage.enterAmount('1000');
              detailsPage.enterEmail('test@protractor.com');
          });

          it('should click Donate', function () {
              detailsPage.clickDonateNow();
          });

          it('should enter valid gift card code', () => {
              helper.waitUntilElementPresent(helper.paymentMethodsPanel);
              paymentPage.clickPaymentMethod('test Gift Card');
              paymentPage.enterGiftCardCode(giftCardCode);
              paymentPage.clickContinue();
              helper.waitUntilElementPresent(helper.redeemPanel)
          });

          it('should click lnk donate w/t gift card', () => {
              redeemPage.clickLnkMakeWtGiftCard();
              helper.waitUntilElementPresent(helper.donationDetailsPanel);
          });

          it('should see matching 80% up to 10', () => {
              expect(helper.getMatchText()).toContain('80%');
              expect(helper.getMatchMaxText()).toContain('10');
          });

          it('should click Donate', function () {
              detailsPage.clickDonateNow();
          });

          it('should enter valid gift card code', () => {
              helper.waitUntilElementPresent(helper.paymentMethodsPanel);
              paymentPage.clickPaymentMethod('test Gift Card');
              paymentPage.enterGiftCardCode(giftCardCode);
              paymentPage.clickContinue();
              helper.waitUntilElementPresent(helper.redeemPanel)
          });

          it('should click use gift card', () => {
              redeemPage.clickBtnUseGiftCard();
              helper.waitUntilElementPresent(helper.donationPreviewPanel);
          })

          it('should not see match', () => {
              expect(helper.matchPerc.isPresent()).toBeFalsy();
              expect(helper.matchMax.isPresent()).toBeFalsy();
              expect(previewPage.getPaymentMethodTxt()).toContain(giftCardCodeSliced);
          });

          it('should click on details bullet', function () {
              helper.clickDetailsBullet();
          });

          it('repeat donation displaying and disabled ', function () {
              expect(detailsPage.chkRepeat.isPresent()).toBeTruthy();
              expect(detailsPage.chkRepeat.isEnabled()).toBeFalsy();
          });

          it('should not see match', () => {
              expect(helper.matchPerc.isPresent()).toBeFalsy();
              expect(helper.matchMax.isPresent()).toBeFalsy();
          });

          it('should click on payment bullet', function () {
              helper.clickPaymentBullet();
          });

          it('should change payment method to master card', function () {
              helper.waitUntilElementPresent(helper.paymentMethodsPanel);
              paymentPage.clickPaymentMethod();
              paymentPage.clickContinue();
          });

          it('should see match and master card', () => {
              helper.waitUntilElementPresent(helper.donationPreviewPanel);
              expect(helper.matchPerc.isPresent()).toBeTruthy();
              expect(helper.matchMax.isPresent()).toBeTruthy();
              expect(previewPage.getPaymentMethodTxt()).toContain("Mastercard");
              expect(previewPage.getPaymentMethodTxt()).not.toContain(giftCardCodeSliced);
          });
      });
});
