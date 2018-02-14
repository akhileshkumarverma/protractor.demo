const searchPage            = require('./../../po/search.po');
const detailsPage           = require('./../../po/details.po');
const slidersPage           = require('./../../po/sliders.po');
const paymentPage           = require('./../../po/payment.po');
const previewPage           = require('./../../po/preview.po');
const usersData             = require('./../../data/users/data');
const loginPage             = require('./../../po/login.po');
const helper                = require('./../../helpers/helper.js');

describe('Suite: Gift aid', function () {

    const widgetUrl = usersData.widgetUrl;
    const spoofUKUrl = widgetUrl + '?SpoofIPToCountry=GB';
    const widgetUrlFundraiserGB = usersData.widgetUrlFundraiserGB;
    const fundraiserWorldGBName = usersData.fundraiserWorldGBName;
    const charity15Alias = usersData.dataPop.acharity15Alias;
    const acharity15Name = usersData.dataPop.acharity15Name;
    const acharity50GBAlias = usersData.dataPop.acharity50GBAlias;
    const acharity50GBName = usersData.dataPop.acharity50GBName;


	describe('Sub suite: Spoof uk: opt out for gift aid', function () {

        const firstNameErr = "Please enter your first name.";
        const lastNameErr = "Please enter your last name.";

		beforeAll(function () {
            helper.logUrl(spoofUKUrl);
            browser.get(spoofUKUrl);
            browser.sleep(1000);
            helper.waitUntilElementPresent(helper.widgetPanel);
		});

		afterAll(function () {
			helper.clearAllData();
		});

		it('should search nonprofit: acharity50GBAlias',function () {
			helper.waitUntilElementPresent(searchPage.inSearch);
			searchPage.enterNameToSearch(acharity50GBAlias);
			searchPage.selectSearchBtn();
			helper.selectBenefPassport(acharity50GBName);
		});

		it('should continue', function () {
			helper.selectContinueBtn();
		});

		it('should enter amount: 1000 and email', function () {
			detailsPage.enterAmount('1000');
			detailsPage.enterEmail('test@protractor.com');
		});

		it('should see gift aid', function () {
			expect(detailsPage.elGiftAid.isPresent()).toBeTruthy();
			expect(detailsPage.elGiftAidSection.isPresent()).toBeFalsy(); // collapsed
		});

		it('should click on gift aid switch', function () {
			detailsPage.clickGiftAidSwitch();
			helper.waitUntilElementVisible(detailsPage.elGiftAidSection);
			expect(detailsPage.elGiftAidSection.isPresent()).toBeTruthy(); // expanded
		});

		it('should enter gift aid data - no first name', function () {
			detailsPage.enterGiftAidStreet('Street 1');
			detailsPage.enterGiftAidAddress2('Tallaght');
			detailsPage.enterGiftAidCity('Dublin');
			detailsPage.enterGiftAidZip('Dublin 24');
		});

		it('should select UK tax payer checkbox', function () {
			detailsPage.clickUkTaxPayer();
		});

        it('should click on Donate now', function () {
            detailsPage.clickDonateNow();
        });

        it('should verify validation error: first and last name', function () {
            expect(helper.getValidationFormContainingTextErr(firstNameErr)).toBe(firstNameErr);
            expect(helper.getValidationFormContainingTextErr(lastNameErr)).toBe(lastNameErr);
        });

        it('should enter first and last name', function () {
            detailsPage.enterLastName('Last Name');
            detailsPage.enterFirstName('First Name');
        });

		it('should click on gift aid switch', function () {
			detailsPage.clickGiftAidSwitch();
			helper.waitUntilElementIsNotPresent(detailsPage.elGiftAidSection);
			expect(detailsPage.elGiftAidSection.isPresent()).toBeFalsy(); // collapsed
		});

		it('should click Donate', function () {
			expect(detailsPage.btnDonateNow.isEnabled()).toBeTruthy();
			detailsPage.clickDonateNow();
		});
		
		it('should click payment method and continue', function () {
			helper.waitUntilElementPresent(helper.paymentMethodsPanel);
			paymentPage.clickPaymentMethod();
			paymentPage.clickContinue();
		});

		it('should see preview, gift aid not applied but available', function () {
			helper.waitUntilElementPresent(helper.donationPreviewPanel);
			expect(previewPage.txtGiftAid.isPresent()).toBeTruthy();
			expect(previewPage.txtGiftAidAmount.isPresent()).toBeFalsy();
		});

		it('should click on gift aid link', function () {
			previewPage.clickEditGiftAidLnk();
			helper.waitUntilElementPresent(helper.donationDetailsPanel);
		});
	});

	describe('Sub suite: Spoof uk: opts in, remove on preview, edit', function () {

		beforeAll(function () {
            helper.logUrl(spoofUKUrl);
            browser.get(spoofUKUrl);
            browser.sleep(1000);
			helper.waitUntilElementPresent(helper.widgetPanel);
		});

		afterAll(function () {
			helper.clearAllData();
		});

		it('should search nonprofit: acharity50GBAlias',function () {
			helper.waitUntilElementPresent(searchPage.inSearch);
			searchPage.enterNameToSearch(acharity50GBAlias);
			searchPage.selectSearchBtn();
			helper.selectBenefPassport(acharity50GBName);
		});

		it('should continue', function () {
			helper.selectContinueBtn();
		});

		it('should enter amount: 1000 and email', function () {
			detailsPage.enterAmount('1000');
			detailsPage.enterEmail('test@protractor.com');
		});

		it('should click on gift aid switch', function () {
			detailsPage.clickGiftAidSwitch();
			helper.waitUntilElementVisible(detailsPage.elGiftAidSection);
			expect(detailsPage.elGiftAidSection.isPresent()).toBeTruthy(); // expanded
		});

		it('should enter gift aid data', function () {
			detailsPage.enterFirstName('First Name');
			detailsPage.enterLastName('Last Name');

			detailsPage.enterGiftAidStreet('Street 1');
			detailsPage.enterGiftAidAddress2('Tallaght');
			detailsPage.enterGiftAidCity('Dublin');
			detailsPage.enterGiftAidZip('Dublin 24');
		});

		it('should select UK tax payer checkbox', function () {
			detailsPage.clickUkTaxPayer();
		});

		it('should click donate now button', function () {
			detailsPage.clickDonateNow();
		});

		it('should click payment method and continue', function () {
			helper.waitUntilElementPresent(helper.paymentMethodsPanel);
			paymentPage.clickPaymentMethod();
			paymentPage.clickContinue();
		});

		it('should see preview, gift aid applied', function () {
			helper.waitUntilElementPresent(helper.donationPreviewPanel);
			expect(previewPage.txtGiftAid.isPresent()).toBeFalsy();
			expect(previewPage.txtGiftAidAmount.isPresent()).toBeTruthy();
			expect(previewPage.getGiftAidAmount()).toBe('+ £ 250.00 Gift Aid');
		});

		it('should verify donor details', function () {
			expect(previewPage.getDonorDetails('test@protractor.com').isPresent()).toBeTruthy();
			expect(previewPage.getDonorDetails('First Name').isPresent()).toBeTruthy();
			expect(previewPage.getDonorDetails('Last Name').isPresent()).toBeTruthy();
			expect(previewPage.getDonorDetails('Street 1').isPresent()).toBeTruthy();
			expect(previewPage.getDonorDetails('Tallaght').isPresent()).toBeTruthy();
			expect(previewPage.getDonorDetails('Dublin Dublin 24').isPresent()).toBeTruthy();
			expect(previewPage.getDonorDetails('United Kingdom').isPresent()).toBeTruthy();
		});

		it('should donate without gift aid link', function () {
			previewPage.clickDonateWithoutGiftAidLnk();
		});

		it('should gift aid be not applied but available', function () {
			helper.waitUntilElementPresent(helper.donationPreviewPanel);
			expect(previewPage.txtGiftAid.isPresent()).toBeTruthy();
			expect(previewPage.txtGiftAidAmount.isPresent()).toBeFalsy();
		});

		it('should verify donor details - address gets cleared', function () {
			expect(previewPage.getDonorDetails('test@protractor.com').isPresent()).toBeTruthy();
			expect(previewPage.getDonorDetails('First Name').isPresent()).toBeTruthy();
			expect(previewPage.getDonorDetails('Last Name').isPresent()).toBeTruthy();
			expect(previewPage.getDonorDetails('United Kingdom').isPresent()).toBeTruthy();
			expect(previewPage.getDonorDetails('Street 1').isPresent()).toBeFalsy();
            expect(previewPage.getDonorDetails('Tallaght').isPresent()).toBeFalsy();
			expect(previewPage.getDonorDetails('Dublin Dublin 24').isPresent()).toBeFalsy();
		});

		it('should click on edit gift aid link', function () {
			previewPage.clickEditGiftAidLnk();
		});

		it('should click on gift aid switch', function () {
			helper.waitUntilElementPresent(helper.donationDetailsPanel);
			detailsPage.clickGiftAidSwitch();
			helper.waitUntilElementVisible(detailsPage.elGiftAidSection);
			expect(detailsPage.elGiftAidSection.isPresent()).toBeTruthy(); // expanded
		});
	});

    describe('Sub suite: Company from UK', function () {

        const companyGBEmail = usersData.emails.companyGBEmail;
        const password = usersData.emails.password;

        beforeAll(function () {
            browser.get(widgetUrlFundraiserGB);
            helper.logUrl(widgetUrlFundraiserGB);
            helper.waitUntilElementPresent(helper.widgetPanel);
        });

        afterAll(function () {
            helper.clearAllData();
        });

        it('should click sign in', function () {
            helper.clickLnkTopBarSignIn();
            helper.waitUntilElementPresent(helper.loginPanel);
        });

        it('should log in as a UK company', function () {
            loginPage.enterEmail(companyGBEmail);
            loginPage.enterPassword(password);
            loginPage.clickBtnLogIn();
            helper.waitUntilElementIsNotPresent(helper.spinner);
            helper.waitUntilElementPresent(helper.donationDetailsPanel);
        });

        it('should enter amount: 1000', function () {
            detailsPage.enterAmount('1000');
        });

        it('should click on gift aid switch - gift aid section not available', function () {
            detailsPage.clickGiftAidSwitch();
            expect(detailsPage.elGiftAidSection.isPresent()).toBeFalsy();
        });

        it('should get warning to logout and donate as guest', function () {
			helper.waitUntilElementVisible(helper.elWarning);
        });

        it('should log out from warning', function () {
            detailsPage.clickLogoutGiftAid();
        });

        it('should be logged out and panel resets', function () {
            helper.waitUntilElementPresent(helper.donationDetailsPanel);
            helper.waitUntilElementIsNotPresent(helper.elWarning);
        });

        it('should click on gift aid switch - gift aid section available', function () {
            detailsPage.clickGiftAidSwitch();
            helper.waitUntilElementVisible(detailsPage.elGiftAidSection);
        });

        it('should click sign in', function () {
            helper.clickLnkTopBarSignIn();
            helper.waitUntilElementPresent(helper.loginPanel);
        });

        it('should log in as a UK company', function () {
            loginPage.enterEmail(companyGBEmail);
            loginPage.enterPassword(password);
            loginPage.clickBtnLogIn();
            helper.waitUntilElementIsNotPresent(helper.spinner);
            helper.waitUntilElementPresent(helper.donationDetailsPanel);
        });

        it('should enter amount: 1000', function () {
            detailsPage.enterAmount('1000');
        });

        it('should click on gift aid switch - gift aid section not available', function () {
            detailsPage.clickGiftAidSwitch();
            expect(detailsPage.elGiftAidSection.isPresent()).toBeFalsy();
        });

        it('should click donate now button', function () {
            detailsPage.clickDonateNow();
        });

        it('should click payment method and continue', function () {
            helper.waitUntilElementPresent(helper.paymentMethodsPanel);
            paymentPage.clickPaymentMethod();
            paymentPage.clickContinue();
        });

        it('should not see gift aid added', function () {
            helper.waitUntilElementPresent(helper.donationPreviewPanel);
            expect(previewPage.txtGiftAid.isPresent()).toBeTruthy();
            expect(previewPage.txtGiftAidAmount.isPresent()).toBeFalsy();
        });

        it('should click edit gift aid', function () {
            previewPage.clickEditGiftAidLnk();
        });

        it('should click on gift aid switch - gift aid section not available', function () {
            detailsPage.clickGiftAidSwitch();
            expect(detailsPage.elGiftAidSection.isPresent()).toBeFalsy();
        });

        it('should get warning to logout and donate as guest', function () {
            helper.waitUntilElementVisible(helper.elWarning);
        });

        it('should log out from top bar', function () {
            helper.clickTopBarAvatar();
            helper.waitUntilElementPresent(helper.overlayContent);
            helper.clickLogout();
        });

        it('should be logged out and panel resets', function () {
            helper.waitUntilElementPresent(helper.donationDetailsPanel);
            helper.waitUntilElementIsNotPresent(helper.elWarning);
        });
    });

    describe('Sub suite: UK and non-UK nonprofit', function () {

        beforeAll(function () {
            browser.get(widgetUrl);
            helper.waitUntilElementPresent(helper.widgetPanel);
        });

        afterAll(function () {
            helper.clearAllData();
        });

        it('should search nonprofit: acharity50GBAlias',function () {
            helper.waitUntilElementPresent(searchPage.inSearch);

            searchPage.enterNameToSearch(acharity50GBAlias);
            searchPage.selectSearchBtn();
            helper.selectBenefPassport(acharity50GBName);
        });

        it('should search nonprofit: charity15Alias',function () {
            searchPage.enterNameToSearch(charity15Alias);
            searchPage.selectSearchBtn();
            helper.selectBenefPassport(acharity15Name);
        });

        it('should continue', function () {
            helper.selectContinueBtn();
        });

        it('should enter amount: 1000', function () {
            detailsPage.enterAmount('1000');
        });

        it('should not see gift aid', function () {
            expect(detailsPage.elGiftAid.isPresent()).toBeFalsy();
        });

        it('should select United Kingdom country', function () {
            helper.selectCountry('United Kingdom');
        });

        it('should see gift aid', function () {
            expect(detailsPage.elGiftAid.isPresent()).toBeTruthy();
        });

        it('should select Ireland country', function () {
            helper.selectCountry('Ireland');
        });

        it('should not see gift aid', function () {
            expect(detailsPage.elGiftAid.isPresent()).toBeFalsy();
        });

        it('should select United Kingdom country', function () {
            helper.selectCountry('United Kingdom');
            expect(detailsPage.elGiftAid.isPresent()).toBeTruthy();
        });

        it('should select sliders', function () {
            detailsPage.clickSliders();
            helper.waitUntilElementPresent(helper.slidersPanel);
        });

        it('should remove GB nonprofit', function () {
            slidersPage.selectTrashOnPassport(acharity50GBName);
        });

        it('should click btn continue', function () {
            helper.selectContinueBtn();
        });

        it('should not see gift aid', function () {
            expect(detailsPage.elGiftAid.isPresent()).toBeFalsy();
        });

    });

	describe('Sub suite: World fundraiser: uk country on fundraiser panel, repeat donation', function () {

        const message = 'message from $donor to beneficiary';

		beforeAll(function () {
			browser.get(widgetUrl);
			helper.waitUntilElementPresent(helper.widgetPanel);
		});

		afterAll(function () {
			helper.clearAllData();
		});

		it('should search: fundraiserWorldGBName',function () {
			helper.waitUntilElementPresent(searchPage.inSearch);
			searchPage.enterNameToSearch(fundraiserWorldGBName);
			searchPage.selectSearchBtn();
			helper.selectBenefPassport(fundraiserWorldGBName);
		});

		it('should continue', function () {
			helper.selectContinueBtn();
		});

		it('should select repeat donation', function () {
			helper.waitUntilElementPresent(helper.donationDetailsPanel);
			detailsPage.checkRepeatDonation();
		});

		it('should enter donation details', function () {
			detailsPage.enterAmount('1000');
			detailsPage.enterEmail('test@protractor.com');
			detailsPage.enterFirstName('First Name');
			detailsPage.enterLastName('Last Name');
			detailsPage.enterMessage(message);
		});

		it('should not see gift aid', function () {
			expect(detailsPage.elGiftAid.isPresent()).toBeFalsy();
		});

		it('should click on uk fundraiser', function () {
			detailsPage.clickBeneficaryName(fundraiserWorldGBName);
			helper.waitUntilElementPresent(helper.worldFundraiserPanel);
		});

		it('should change country to uk', function () {
			helper.selectCountry('United Kingdom');
			searchPage.selectGoBack();
		});

		it('should see gift aid', function () {
			expect(detailsPage.elGiftAid.isPresent()).toBeTruthy();
		});

		it('should click on gift aid switch', function () {
			detailsPage.clickGiftAidSwitch();
			helper.waitUntilElementVisible(detailsPage.elGiftAidSection);
			expect(detailsPage.elGiftAidSection.isPresent()).toBeTruthy(); // expanded
		});

		it('should enter gift aid data: email, names are not cleared', function () {
			detailsPage.enterGiftAidStreet('Street 1');
			detailsPage.enterGiftAidCity('Dublin');
			detailsPage.enterGiftAidZip('Dublin 3');
		});

		it('should select UK tax payer checkbox', function () {
			detailsPage.clickUkTaxPayer();
		});

		it('should click donate now button', function () {
			detailsPage.clickDonateNow();
		});

		it('should click payment method and continue', function () {
			helper.waitUntilElementPresent(helper.paymentMethodsPanel);
			paymentPage.clickPaymentMethod();
			paymentPage.clickContinue();
		});

		it('should see preview, gift aid applied', function () {
			helper.waitUntilElementPresent(helper.donationPreviewPanel);
			expect(previewPage.txtGiftAid.isPresent()).toBeFalsy();
			expect(previewPage.txtGiftAidAmount.isPresent()).toBeTruthy();
			expect(previewPage.getGiftAidAmount()).toMatch('.+250.00 Gift Aid');
		});

		it('should see repeat donation every month', function () {
			expect(previewPage.txtRepeatEvery.isPresent()).toBeTruthy();
			expect(previewPage.getRepeatEveryTxt()).toContain('month');
		});
		
		it('should see message', function () {
			expect(previewPage.getMessageTxt()).toBe(message);
		});
	});

    describe('Sub suite: Member from UK', function () {

        const memberGBEmail = usersData.emails.memberGBEmail;
        const password = usersData.emails.password;

        beforeAll(function () {
            browser.get(widgetUrl);
            helper.waitUntilElementPresent(helper.widgetPanel);
        });

        afterAll(function () {
            helper.clearAllData();
        });

        it('should search: fundraiserWorldGBName', function () {
            helper.waitUntilElementPresent(searchPage.inSearch);
            searchPage.enterNameToSearch(fundraiserWorldGBName);
            searchPage.selectSearchBtn();
            helper.selectBenefPassport(fundraiserWorldGBName);
        });

        it('should continue', function () {
            helper.selectContinueBtn();
        });

        it('should click sign in', function () {
            helper.clickLnkTopBarSignIn();
            helper.waitUntilElementPresent(helper.loginPanel);
        });

        it('should log in as a UK member', function () {
            loginPage.enterEmail(memberGBEmail);
            loginPage.enterPassword(password);
            loginPage.clickBtnLogIn();
            helper.waitUntilElementIsNotPresent(helper.spinner);
            helper.waitUntilElementPresent(helper.donationDetailsPanel);
        });

        it('should enter amount: 1000', function () {
            detailsPage.enterAmount('1000');
        });

        it('should click on gift aid switch', function () {
            detailsPage.clickGiftAidSwitch();
            helper.waitUntilElementVisible(detailsPage.elGiftAidSection);
        });

        it('should enter gift aid data - first and last name already filled', function () {
            detailsPage.enterGiftAidStreet('Street 1');
            detailsPage.enterGiftAidCity('Dublin');
            detailsPage.enterGiftAidZip('Dublin 3');
        });

        it('should select UK tax payer checkbox', function () {
            detailsPage.clickUkTaxPayer();
        });

        it('should click donate now button', function () {
            detailsPage.clickDonateNow();
        });

        it('should click payment method and continue', function () {
            helper.waitUntilElementPresent(helper.paymentMethodsPanel);
            paymentPage.clickPaymentMethod();
            paymentPage.clickContinue();
        });

    });

});
