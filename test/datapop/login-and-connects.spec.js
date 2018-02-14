const searchPage            = require('./../../po/search.po');
const detailsPage           = require('./../../po/details.po');
const paymentPage           = require('./../../po/payment.po');
const loginPage             = require('./../../po/login.po');
const previewPage           = require('./../../po/preview.po');
const loginMainPage         = require('./../../po/site/login_main.po');
const usersData             = require("./../../data/users/data");
const helper                = require("./../../helpers/helper.js");


describe("Suite: Login all entities & My Connections", function () {

    const baseUrl = usersData.baseUrl
    const widgetUrl = usersData.widgetUrl
    const fundraiserWorldGBName = usersData.fundraiserWorldGBName;
    const nonprofitName = usersData.nonprofitName;
    const memberName55 = usersData.memberName55;

	describe('Sub suite: As company', function () {

		const companyEmailWhitelist = usersData.emails.companyEmailWhitelist;
		const companyNameWhitelist = usersData.companyNameWhitelist;
		const password = usersData.emails.password;

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

			expect(helper.lnkTopBarSignIn.isPresent()).toBeTruthy();
			expect(helper.lnkTopBarAvatar.isPresent()).toBeFalsy();
			expect(searchPage.lnkMyConnections.isPresent()).toBeFalsy();
		});

		it('should continue', function () {
			helper.selectContinueBtn();
		});

		it('should click sign in', function () {
			helper.clickLnkTopBarSignIn();
			helper.waitUntilElementPresent(helper.loginPanel);
		});

		it('should log in as a company', function () {
			loginPage.enterEmail(companyEmailWhitelist);
			loginPage.enterPassword(password);
			loginPage.clickBtnLogIn();
			helper.waitUntilElementIsNotPresent(helper.spinner);

			helper.waitUntilElementPresent(helper.donationDetailsPanel);
		})

		it('verify company details', function () {
			expect(detailsPage.getLoggedInText()).toContain(companyEmailWhitelist);
			expect(detailsPage.getLoggedInText()).toContain(companyNameWhitelist);
			expect(helper.getSelectedCountry()).toBe('Bahrain');
		});

		it('should go to search', function () {
			helper.clickSearchBullet();
		});

		it('should click my connections', function () {
			searchPage.selectMyConnectionsLnk();
		});

		it('should select nonprofit from connections', function () {
			helper.selectBenefPassport(nonprofitName);

		helper.selectContinueBtn('search');
			expect(searchPage.lnkMyConnections.isPresent()).toBeTruthy();
		});

		it('should continue', function () {
			helper.selectContinueBtn();
		});

		it('should enter amount: 99.99', function () {
			detailsPage.enterAmount('99.99');
		});

		it('should click donate now button', function () {
			detailsPage.clickDonateNow();
		});

		it('should click payment method and continue', function () {
			helper.waitUntilElementPresent(helper.paymentMethodsPanel);
			paymentPage.clickPaymentMethod();
			paymentPage.clickContinue();
		});

		it('should see preview', function () {
			helper.waitUntilElementPresent(helper.donationPreviewPanel);
			expect(previewPage.getDonorDetails(companyEmailWhitelist).isPresent()).toBeTruthy();
			expect(previewPage.getDonorDetails(companyNameWhitelist).isPresent()).toBeTruthy();
			expect(previewPage.getDonorDetails('Bahrain').isPresent()).toBeTruthy();
			expect(previewPage.getDonationAmount()).toMatch('.+99.99');
		});

		it('should go to details panel', function () {
			helper.clickDetailsBullet();
			helper.waitUntilElementPresent(helper.donationDetailsPanel);
		});

		it('should log out', function () {
		  helper.clickTopBarAvatar();
		  helper.waitUntilElementPresent(helper.overlayContent);

		  helper.clickLogout();
		});

		it('should be logged out: search panel', function () {
		  helper.waitUntilElementPresent(helper.searchResultsPanel);
		  helper.waitUntilElementPresent(searchPage.inSearch);

		  expect(helper.lnkTopBarAvatar.isPresent()).toBeFalsy();
		});
  	});

	describe('Sub suite: As member', function () {

		const memberGBEmail = usersData.emails.memberGBEmail;
		const password = usersData.emails.password;
		const firstName = memberName55.split(' ')[0]
		const lastName = memberName55.split(' ')[1]

		beforeAll(function () {
			browser.get(widgetUrl);
			helper.waitUntilElementPresent(helper.widgetPanel);
		});

		afterAll(function () {
			helper.clearAllData();
		});

		it('should click sign in',function () {
			helper.waitUntilElementPresent(searchPage.inSearch);
			expect(searchPage.lnkMyConnections.isPresent()).toBeFalsy();

			helper.clickLnkTopBarSignIn();
			helper.waitUntilElementPresent(helper.loginPanel);

			expect(helper.lnkTopBarAvatar.isPresent()).toBeFalsy();
		});

		it('should log in as a member', function () {
			loginPage.enterEmail(memberGBEmail);
			loginPage.enterPassword(password);
			loginPage.clickBtnLogIn();
			helper.waitUntilElementIsNotPresent(helper.spinner);

			helper.waitUntilElementPresent(helper.searchResultsPanel);
			expect(helper.lnkTopBarAvatar.isPresent()).toBeTruthy();
		});

		it('should click my connections', function () {
			searchPage.selectMyConnectionsLnk();
		});

		it('should click o info icon - verify overlay', function () {
			helper.selectInfoOnPassport(nonprofitName);
			helper.waitUntilElementPresent(helper.overlayContent);
			expect(helper.getOverlayBeneficiaryName()).toBe(nonprofitName)
		});

		it('should close overlay', function () {
			helper.closeOverlay()
			helper.waitUntilElementIsNotPresent(helper.overlayContent)
		});

		it('should click next page', function () {
			helper.moveMouseOver(helper.pageNext)
			expect(helper.pagePrevious.getAttribute('class')).toContain('disabled');
			expect(helper.pageNext.getAttribute('class')).not.toContain('disabled');
			helper.clickNext();
			expect(helper.pagePrevious.getAttribute('class')).not.toContain('disabled');
			expect(helper.pageNext.getAttribute('class')).not.toContain('disabled');
		});

		it('should click 2 x next', function () {
			for (let x=0; x < 2; x++){
				helper.clickNext();
			};
		});

		it('should click 3 x previous', function () {
			for (let x=0; x < 3; x++){
				helper.clickPrevious();
			};
		});
		
		it('should click back to search', function () {
			searchPage.selectBackToSearch();
			helper.waitUntilElementIsNotPresent(helper.spinner);
        });

        it('should enter and search fundraiser: fundraiserWorldGBName', function () {
            helper.waitUntilElementPresent(searchPage.inSearch);
            searchPage.enterNameToSearch(fundraiserWorldGBName);
            searchPage.selectSearchBtn();
            expect(searchPage.getSearchResulBeneficiaryName()).toBe(fundraiserWorldGBName);
        });

		it('should go back to my connections', function () {
			searchPage.selectMyConnectionsLnk();
        })

		it('should select nonprofit from connections', function () {
			helper.selectBenefPassport(nonprofitName);
		});

		it('should continue: land on search panel', function () {
			helper.selectContinueBtn('search');
			expect(searchPage.lnkMyConnections.isPresent()).toBeTruthy();
		});

		it('should continue: land on details panel', function () {
			helper.selectContinueBtn();
		});

		it('verify member details', function () {
			expect(detailsPage.getLoggedInText()).toContain(memberGBEmail);
			expect(helper.getSelectedCountry()).toBe('United Kingdom');
		});

		it('should enter amount: 100.01', function () {
			detailsPage.enterAmount('100.01');
		});

		it('should click donate now button', function () {
			detailsPage.clickDonateNow();
		});

		it('should click payment method and continue', function () {
			helper.waitUntilElementPresent(helper.paymentMethodsPanel);
			paymentPage.clickPaymentMethod();
			paymentPage.clickContinue();
		});

		it('should see preview', function () {
			helper.waitUntilElementPresent(helper.donationPreviewPanel);
			expect(previewPage.getDonorDetails(memberGBEmail).isPresent()).toBeTruthy();
			expect(previewPage.getDonorDetails(firstName).isPresent()).toBeTruthy();
			expect(previewPage.getDonorDetails(lastName).isPresent()).toBeTruthy();
			expect(previewPage.getDonorDetails('United Kingdom').isPresent()).toBeTruthy();
			expect(previewPage.getDonationAmount()).toMatch('.+100.01');
		});

		it('should click log out but close overlay', function () {
			helper.clickTopBarAvatar();
			helper.waitUntilElementPresent(helper.overlayContent);

			helper.clickCloseOverlay();
			helper.waitUntilElementIsNotPresent(helper.overlayContent);
		});

		it('should see preview', function () {
			helper.waitUntilElementPresent(helper.donationPreviewPanel);
			expect(previewPage.getDonorDetails(memberGBEmail).isPresent()).toBeTruthy();
		});
		
		it('should log out', function () {
			helper.clickTopBarAvatar();
			helper.waitUntilElementPresent(helper.overlayContent);

			helper.clickLogout();
		});

		it('should be logged out: search panel', function () {
			helper.waitUntilElementPresent(helper.searchResultsPanel);
			helper.waitUntilElementPresent(searchPage.inSearch);

			expect(helper.lnkTopBarAvatar.isPresent()).toBeFalsy();
		});

	});

    describe('Sub suite: On site logged in, member fundraisers', function () {

        //Raised and Target is displaying
		//to moderator if no donations made

        const memberGBEmail = usersData.emails.memberGBEmail;
        const password = usersData.emails.password;
        const fundraiserMemberName = usersData.fundraiserMemberName;
        const fundraiserMemberTargetName = usersData.fundraiserMemberTargetName;


        beforeAll(function () {
            browser.ignoreSynchronization = true;
            helper.getUrl(baseUrl + '/login');
        });

        afterAll(function () {
            helper.clearAllData();
        });

        it('should sign in', function () {
            helper.waitUntilElementVisible(loginMainPage.inEmail);
            loginMainPage.logInMainSite(memberGBEmail, password)
        });

        it('should recover from ignoreSynchronization', () =>{
            browser.ignoreSynchronization = false;
        })

        it('load up widget', function () {
            helper.getUrl(widgetUrl);
            helper.waitUntilElementPresent(helper.searchResultsPanel);
        });

        it('should click my connections', function () {
            searchPage.selectMyConnectionsLnk();
        });

        it('should select fundraiser from connections', function () {
            helper.selectBenefPassport(fundraiserMemberName);
        });

        it('should continue: land on search panel', function () {
            helper.selectContinueBtn('search');
            expect(searchPage.lnkMyConnections.isPresent()).toBeTruthy();
        });

        it('should continue: land on details panel', function () {
            helper.selectContinueBtn();
            helper.waitUntilElementPresent(helper.donationDetailsPanel);
        });

        it('should see raised amount=0, visible to moderators', function () {
            expect(helper.txtRaisedAmount.isPresent()).toBeTruthy();
            expect(helper.getRaisedAmount()).toMatch('€ 0')
        });
        
        it('should click on add beneficiary', function () {
			detailsPage.clickAddBenef();
            helper.waitUntilElementPresent(helper.searchResultsPanel);
        });

        it('should remove fundraiser from basket', function () {
            helper.selectBenefPassport(fundraiserMemberName);
        });

        it('should click my connections', function () {
            searchPage.selectMyConnectionsLnk();
        });

        it('should select fundraiser w/ target from connections', function () {
            helper.selectBenefPassport(fundraiserMemberTargetName);
        });

        it('should continue: land on search panel', function () {
            helper.selectContinueBtn('search');
            expect(searchPage.lnkMyConnections.isPresent()).toBeTruthy();
        });

        it('should continue: land on details panel', function () {
            helper.selectContinueBtn();
            helper.waitUntilElementPresent(helper.donationDetailsPanel);
        });

        it('should see target amount=10mln, visible to moderators', function () {
            expect(helper.getTargetAmount()).toMatch('¥ 10000000')
        });

        it('should select dont publish my name', function () {
            detailsPage.checkDontPublishName();
        });

        it('should enter amount: 1000 and email', function () {
            detailsPage.enterAmount('1000');
        });

        it('should click donate now button', function () {
            detailsPage.clickDonateNow();
        });

        it('should click payment method and continue', function () {
            helper.waitUntilElementPresent(helper.paymentMethodsPanel);
            paymentPage.clickPaymentMethod();
            paymentPage.clickContinue();
        });

        it('should click on pencil to ... visible to beneficiaries only', function () {
            helper.waitUntilElementPresent(helper.donationPreviewPanel);
            previewPage.clickEditHideDonation()
        });

        it('should log out', function () {
            helper.clickTopBarAvatar();
            helper.waitUntilElementPresent(helper.overlayContent);
            helper.clickLogout();
        });

        it('should be logged out: search panel', function () {
            helper.waitUntilElementPresent(helper.searchResultsPanel);
            helper.waitUntilElementPresent(searchPage.inSearch);
        });

    });

	describe('Sub suite: As nonprofit', function () {

        const nonprofitEmail = usersData.emails.nonprofitEmailAc1;
        const password = usersData.emails.password;
		const country = "Albania";
		const amount = '100.10'
		const replaceEmail = 'test@test.com'

		beforeAll(function () {
			browser.get(widgetUrl);
			helper.waitUntilElementPresent(helper.widgetPanel);
		});

		afterAll(function () {
			helper.clearAllData();
		});

		it('should click sign in',function () {
			helper.waitUntilElementPresent(searchPage.inSearch);
			expect(searchPage.lnkMyConnections.isPresent()).toBeFalsy();

			helper.clickLnkTopBarSignIn();
			helper.waitUntilElementPresent(helper.loginPanel);

			expect(helper.lnkTopBarAvatar.isPresent()).toBeFalsy();
		});

		it('should log in as a charity', function () {
			loginPage.enterEmail(nonprofitEmail);
			loginPage.enterPassword(password);
			loginPage.clickBtnLogIn();
			helper.waitUntilElementIsNotPresent(helper.spinner);
		});

        it('should search [automation.nonprofit.test] and click upon it', function () {
            helper.waitUntilElementPresent(searchPage.inSearch);
            searchPage.enterNameToSearch(nonprofitName);
            searchPage.selectSearchBtn();
            searchPage.selectSearchResultBeneficiaryName(nonprofitName, null);
        });

        it('should continue', function () {
            helper.selectContinueBtn();
        });

        it('should verify amount and repeat disabled', function () {
            helper.waitUntilElementPresent(helper.donationDetailsPanel);
            detailsPage.enterEmail(replaceEmail);
            detailsPage.enterAmount(amount);
        });

        it('should click donate now button', function () {
            detailsPage.clickDonateNow();
        });

        it('should click payment method and continue', function () {
            helper.waitUntilElementPresent(helper.paymentMethodsPanel);
            paymentPage.clickPaymentMethod();
            paymentPage.clickContinue();
        });

        it('should see preview', function () {
            helper.waitUntilElementPresent(helper.donationPreviewPanel);
            expect(previewPage.getDonorDetails(nonprofitEmail).isPresent()).toBeFalsy();
            expect(previewPage.getDonorDetails(replaceEmail).isDisplayed()).toBeTruthy();
            expect(previewPage.getDonorDetails(country).isDisplayed()).toBeTruthy();
            expect(previewPage.getDonationAmount()).toMatch(`.+${amount}`);
        });

        it('should click donate btn', function () {
            previewPage.clickBtnDonate('overlay');
        });

        it('should click continue on overlay', () =>{
        	previewPage.clickContinueOverlay();
		});

        it('wait for the world pay window', function () {
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

        it('should see incomplete panel', function () {
            helper.waitUntilElementPresent(helper.incompletePanel);
        });

	});

	describe('Sub suite: On site logged in as charity', function () {

		const nonprofitEmail = usersData.emails.nonprofitEmailAc1;
		const password = usersData.emails.password;

		beforeAll(function () {
			browser.ignoreSynchronization = true;
            helper.getUrl(baseUrl + '/login');
		});

		afterAll(function () {
			helper.clearAllData();
		});

		it('should sign in', function () {
			helper.waitUntilElementVisible(loginMainPage.inEmail);
			loginMainPage.logInMainSite(nonprofitEmail, password)
		});

		it('should recover from ignoreSynchronization', () =>{
            browser.ignoreSynchronization = false;
		})

		it('load up widget', function () {
			browser.get(widgetUrl);
            helper.logUrl(widgetUrl);
			expect(searchPage.inSearch.isPresent()).toBeTruthy();
		});

        it('should log out of widget', function () {
            helper.clickTopBarAvatar();
            helper.waitUntilElementPresent(helper.overlayContent);

            helper.clickLogout();
            helper.waitUntilElementPresent(helper.searchResultsPanel);
            helper.waitUntilElementPresent(searchPage.inSearch);
            expect(helper.lnkTopBarAvatar.isPresent()).toBeFalsy();
        });
	});
});
