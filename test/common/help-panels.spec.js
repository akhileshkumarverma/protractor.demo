const searchPage            = require('./../../po/search.po');
const detailsPage           = require('./../../po/details.po');
const slidersPage           = require('./../../po/sliders.po');
const paymentPage           = require('./../../po/payment.po');
const previewPage           = require('./../../po/preview.po');
const usersData             = require('./../../data/users/data');
const loginPage             = require('./../../po/login.po');
const helper                = require('./../../helpers/helper.js');

describe('Suite: Help panels', function () {

    const widgetUrl = usersData.widgetUrl;
    const spoofUKUrl = widgetUrl + '?SpoofIPToCountry=GB';
    const fundraiserWorldGBName = usersData.fundraiserWorldGBName;


	describe('Sub suite: Help panels', function () {

        const anonText = "Do not share my personal information with the beneficiaries.";
        const dontPublishText = "Your donation details will be visible to beneficiaries only.";
        const msgText = "Include a message or dedication for others to see (or send it privately by clicking below)." +
			" Please note that beneficiaries are not obliged to act on messages.";
        const repeatText = "Repeat donations are made automatically and you will receive an email each time it" +
			" takes place. You can stop a repeat donation whenever you wish.";
		const giftAidHeading = "About Gift Aid";
		const didNotOpenHeading = "Window did not open";

		beforeAll(function () {
            helper.logUrl(spoofUKUrl);
            browser.get(spoofUKUrl);
            browser.sleep(1000);
            helper.waitUntilElementPresent(helper.widgetPanel);
		});

		afterAll(function () {
			helper.clearAllData();
		});

		it('should select nonprofit: fundraiserWorldGBName',function () {
			helper.waitUntilElementPresent(searchPage.inSearch);
			searchPage.enterNameToSearch(fundraiserWorldGBName);
			searchPage.selectSearchBtn();
			helper.selectBenefPassport(fundraiserWorldGBName);
		});

		it('should continue', function () {
			helper.selectContinueBtn();
		});

        it('should check repeat help panel', function () {
            detailsPage.clickIconRepeatHelp();
            expect(helper.getParagraphOverlay()).toEqual(repeatText);
            helper.closeHelpPanel();
            helper.waitUntilElementIsNotPresent(helper.overlayContent);
        });

        it('should check message help panel', function () {
            detailsPage.clickIconMsgHelp();
            expect(helper.getParagraphOverlay()).toEqual(msgText);
            helper.closeHelpPanel();
            helper.waitUntilElementIsNotPresent(helper.overlayContent);
        });

		it('should enter amount: 1000 and email', function () {
			detailsPage.enterAmount('1000');
			detailsPage.enterEmail('test@protractor.com');
			detailsPage.clickChckAnonymous();
		});

        it('should check anonymous help panel', function () {
            detailsPage.clickIconAnonHelp();
            expect(helper.getParagraphOverlay()).toEqual(anonText);
            helper.closeHelpPanel();
            helper.waitUntilElementIsNotPresent(helper.overlayContent);
        });

        it('should check dont publish help panel', function () {
            detailsPage.clickIconPublishHelp();
            expect(helper.getParagraphOverlay()).toEqual(dontPublishText);
            helper.closeHelpPanel();
            helper.waitUntilElementIsNotPresent(helper.overlayContent);
        });

        it('should check gift aid - find out help panel', function () {
            detailsPage.clickGiftAidFindOutLnk();
            expect(helper.getHeadingOverlay()).toEqual(giftAidHeading);
            helper.closeHelpPanel();
            helper.waitUntilElementIsNotPresent(helper.overlayContent);
        });

		it('should see gift aid', function () {
			expect(detailsPage.elGiftAid.isPresent()).toBeTruthy();
			expect(detailsPage.elGiftAidSection.isPresent()).toBeFalsy(); // collapsed
		});

        it('should click test logo', function () {
            helper.clicktestLogo();
        })

        it('wait for a new window', function () {
            helper.waitUntilWindowCount(2);
        });

        it('should close world pay window', function () {
            browser.ignoreSynchronization = true;
            helper.switchToNextWindow();
            helper.closeAndSwitchToPreviousWindow();
        });

        it('should recover from ignoreSynchronization', function () {
            helper.waitUntilWindowCount(1);
            browser.ignoreSynchronization = false;
        })

        it('should click on Donate now', function () {
            detailsPage.clickDonateNow();
        });

		it('should click payment method and continue', function () {
			helper.waitUntilElementPresent(helper.paymentMethodsPanel);
			paymentPage.clickPaymentMethod();
			paymentPage.clickContinue();
		});

		it('should see preview, gift aid not applied and available', function () {
			helper.waitUntilElementPresent(helper.donationPreviewPanel);
			expect(previewPage.txtGiftAid.isPresent()).toBeTruthy();
			expect(previewPage.txtGiftAidAmount.isPresent()).toBeFalsy();
		});

        it('should check anonymous help panel', function () {
            previewPage.clickIconAnonHelp();
            expect(helper.getParagraphOverlay()).toEqual(anonText);
            helper.closeHelpPanel();
            helper.waitUntilElementIsNotPresent(helper.overlayContent);
        });

		it('should check gift aid help panel', function () {
			previewPage.clickIconGiftAidHelp();
            expect(helper.getHeadingOverlay()).toEqual(giftAidHeading);
			helper.closeHelpPanel();
            helper.waitUntilElementIsNotPresent(helper.overlayContent);
		});

        it('should continue to world pay', function () {
            previewPage.clickBtnDonate();
            previewPage.clickContinueOverlay();
        });

        it('wait for a new window', function () {
            helper.waitUntilWindowCount(2);
        });

        it('should close world pay window', function () {
            browser.ignoreSynchronization = true;
            helper.switchToNextWindow();
            helper.closeAndSwitchToPreviousWindow();
        });

        it('wait for window closed', function () {
            helper.waitUntilWindowCount(1);
            browser.ignoreSynchronization = false;
        });

        it('should check payment window did not open panel', function () {
            previewPage.clickWindDidNotOpen();
            expect(helper.getHeadingOverlay()).toEqual(didNotOpenHeading);
            helper.closeHelpPanel();
            helper.waitUntilElementIsNotPresent(helper.overlayContent);
        });
	});

});
