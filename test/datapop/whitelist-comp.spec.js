var searchPage            = require('./../../po/search.po')
var detailsPage           = require('./../../po/details.po')
var slidersPage           = require('./../../po/sliders.po')
var loginPage             = require('./../../po/login.po')
var usersData             = require('../../data/users/data');
var incompletePage        = require('./../../po/incomplete.po')
var previewPage           = require('./../../po/preview.po');
var paymentPage           = require('../../po/payment.po');
var helper                = require('../../helpers/helper.js');

describe('Suite: Company whitelists', function () {

  var widgetUrlAutoTest = usersData.widgetUrlAutoTest;
  var widgetUrlSingleWhitelist = usersData.widgetUrlSingleWhitelist;
  var widgetUrlAutoMultiWhitelist = usersData.widgetUrlAutoMultiWhitelist;
  var nonprofitName = usersData.nonprofitName;
  var fundraiserName = usersData.fundraiserName;
  var fundraiserTargetName = usersData.fundraiserTargetName;
  var fundraiserWorldName = usersData.fundraiserWorldName;
  var charity15Alias = usersData.dataPop.acharity15Alias;
  var acharity1Alias = usersData.dataPop.acharity1Alias;
  var memberGBEmail = usersData.emails.memberGBEmail;
  var password = usersData.emails.password;

  describe('Sub suite: Whitelist of 5', function () {

	  // https://www.testnightly4.com/company/autotest/givingwidget

	  beforeAll(function () {
		  helper.logUrl(widgetUrlAutoTest);
		  browser.get(widgetUrlAutoTest);
		  helper.waitUntilElementPresent(helper.widgetPanel);
	  });

	  afterAll(function () {
		  helper.clearAllData();
	  });

	  it('should see whitelist of 5', function () {
		  helper.waitUntilElementVisible(searchPage.elAllBenefPassports.get(0));
		  expect(searchPage.getAllBenefPassports()).toBe(5);
		  expect(searchPage.inSearch.isPresent()).toBeFalsy();
	  });

	  it('should click on info icon - verify overlay', function () {
		  helper.selectInfoOnPassport(nonprofitName);
		  helper.waitUntilElementPresent(helper.overlayContent);
		  expect(helper.getOverlayBeneficiaryName()).toBe(nonprofitName)
	  });

	  it('should close overlay', function () {
		  helper.closeOverlay()
		  helper.waitUntilElementIsNotPresent(helper.overlayContent)
	  });

	  it('should click o info icon - world fundraiser panel', function () {
		  helper.selectInfoOnPassport(fundraiserWorldName);
		  helper.waitUntilElementPresent(helper.worldFundraiserPanel);
	  });

	  it('should change country', function () {
		  helper.selectCountry('Algeria');
		  expect(searchPage.getIsYourCountryText()).toMatch('.+ Algeria .+')
	  });

	  it('should not see raised amount=0, only visible to moderators', function () {
		  expect(helper.txtRaisedAmount.isPresent()).toBeFalsy();
	  });

	  it('should go back', function () {
		  searchPage.selectGoBack();
	  });

	  it('should click o info icon - world fundraiser panel', function () {
		  helper.selectInfoOnPassport(fundraiserTargetName);
		  helper.waitUntilElementPresent(helper.worldFundraiserPanel);
	  });

	  it('should verify target amount', function () {
		  expect(helper.getTargetAmount()).toMatch('.+10,000,000');
	  });

	  it('should click on beneficiary info - verify overlay', function () {
		  searchPage.selectInfoIcon();
		  helper.waitUntilElementPresent(helper.overlayContent);
		  expect(helper.getOverlayBeneficiaryName()).toBe(nonprofitName);
	  });

	  it('should close overlay', function () {
		  helper.closeOverlay();
		  helper.waitUntilElementIsNotPresent(helper.overlayContent);
	  });

	  it('should go back', function () {
		  searchPage.selectGoBack();
		  helper.waitUntilElementVisible(searchPage.elAllBenefPassports.get(0));
	  });

      it('should click sign in', function () {
          helper.clickLnkTopBarSignIn();
          helper.waitUntilElementPresent(helper.loginPanel);
      });

      it('should log in as a member with connections', function () {
          loginPage.enterEmail(memberGBEmail);
          loginPage.enterPassword(password);
          loginPage.clickBtnLogIn();
          helper.waitUntilElementIsNotPresent(helper.spinner);
          helper.waitUntilElementPresent(helper.searchResultsPanel);
      });

      it('should my connection be not displayed', function () {
          expect(searchPage.lnkMyConnections.isPresent()).toBeFalsy()
      });

	  it('should select 2 beneficiaries and continue', function () {
		  searchPage.selectNthResultBeneficiaryAvatar(3);
		  searchPage.selectNthResultBeneficiaryAvatar(4);
		  helper.selectContinueBtn();
	  });

	  it('should select sliders', function () {
          helper.waitUntilElementPresent(helper.donationDetailsPanel);
		  detailsPage.clickSliders();
	  });

	  it('should click add and see 5 whitelisted beneficiaries', function () {
          helper.waitUntilElementPresent(helper.slidersPanel);
		  slidersPage.clickAdd();
		  helper.waitUntilElementVisible(searchPage.elAllBenefPassports.get(0));
		  expect(searchPage.getAllBenefPassports()).toBe(5);
	  });
  });

  describe('Sub suite: Whitelist of 1', function () {

	//https://www.testnightly4.com/company/autotestwhitelistsingle/givingwidget
	//locked admin whitelist
	//not allowed to add more beneficiaries
	//donation not completed, cancelled and whitelist must be preserved

	var companyEmailWhitelist = usersData.emails.companyEmailWhitelist;
	var password = usersData.emails.password;

	beforeAll(function () {
        helper.logUrl(widgetUrlSingleWhitelist);
		browser.get(widgetUrlSingleWhitelist);
		helper.waitUntilElementPresent(helper.widgetPanel);
	});

	afterAll(function () {
		helper.clearAllData();
	});

	it('should skip search panel - enter amount: 1000', function () {
		helper.waitUntilElementVisible(detailsPage.inAmount);
		detailsPage.enterAmount('1000');
		expect(searchPage.inSearch.isPresent()).toBeFalsy();
	});

	it('should not see add beneficiaries', function () {
		expect(detailsPage.lnkAddBenef.isPresent()).toBeFalsy();
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
	});
	
	it('should log out', function () {
		helper.clickTopBarAvatar();
		helper.waitUntilElementPresent(helper.overlayContent);

		helper.clickLogout();
	});

	it('should whitelist be displaying', function () {
		helper.waitUntilElementPresent(helper.donationDetailsPanel);
		expect(helper.searchResultsPanel.isPresent()).toBeFalsy();
	});

	it('should enter donation details', function () {
	  	detailsPage.enterAmount('1000');
	  	detailsPage.enterEmail('test@protractor.com');
	});

	it('should click donate now button', function () {
	  	detailsPage.clickDonateNow();
	});

	it('should click payment method and continue', function () {
		helper.waitUntilElementPresent(helper.paymentMethodsPanel);
		paymentPage.clickPaymentMethod();
		paymentPage.clickContinue();
	});

	it('should continue to world pay', function () {
		helper.waitUntilElementPresent(helper.donationPreviewPanel);
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

	it('should see incomplete panel', function () {
		helper.waitUntilElementPresent(helper.incompletePanel);
	});

	it('should cancel', function () {
	  	incompletePage.clickLnkCancel();
	});

	it('should whitelist be preserved', function () {
		helper.waitUntilElementPresent(helper.donationDetailsPanel);
		expect(helper.searchResultsPanel.isPresent()).toBeFalsy();
	});

  });

  describe('Sub suite: Whitelist of 32', function () {

	//https://www.testnightly4.com/company/autotestwhitelistmulti/givingwidget

	beforeAll(function () {
        helper.logUrl(widgetUrlAutoMultiWhitelist);
		browser.get(widgetUrlAutoMultiWhitelist);
		helper.waitUntilElementPresent(helper.widgetPanel);
	});

	afterAll(function () {
		helper.clearAllData();
	});

	it('should see whitelist of: 32 --> 5 displaying', function () {
		helper.waitUntilElementPresent(searchPage.inSearch);
	  	expect(searchPage.getAllBenefPassports()).toBe(5);
	});

	it('should click next page', function () {
	 	helper.moveMouseOver(helper.pageNext)
		expect(helper.pagePrevious.getAttribute('class')).toContain('disabled');
		expect(helper.pageNext.getAttribute('class')).not.toContain('disabled');
	 	helper.clickNext()
		expect(helper.pagePrevious.getAttribute('class')).not.toContain('disabled');
		expect(helper.pageNext.getAttribute('class')).not.toContain('disabled');
	});
	  
	it('should click next x 7', function () {
		for (var x=0; x < 7; x++){
			helper.clickNext();
		};
		expect(searchPage.getAllBenefPassports()).toBe(2);
	});

	it('should enter and search fundraiser: [automation.fundraiser.test]',function () {
	  	helper.waitUntilElementPresent(searchPage.inSearch);
	  	searchPage.enterNameToSearch(fundraiserName);
	  	searchPage.selectSearchBtn();
	  	expect(searchPage.getAllBenefPassports()).toBe(0);
	});

	it('should enter and search fundraiser: charity15Alias',function () {
	  	searchPage.enterNameToSearch(charity15Alias);
	  	searchPage.selectSearchBtn();
		expect(searchPage.getAllBenefPassports()).toBe(1);
	});

	it('should click on advanced search',function () {
		searchPage.selectAdvancedSearchLnk();
	});

	it('should search by category - Animals', function () {
        searchPage.enterNameToSearch(charity15Alias);
	  	searchPage.selectCategory('Animals')
	  	searchPage.selectSearchAdvancedBtn();
	  	expect(searchPage.getAllBenefPassports()).toBe(0);
	});

	it('should enter and search fundraiser: charity1Alias',function () {
	  	searchPage.enterNameToSearch(acharity1Alias);
	  	searchPage.selectSearchAdvancedBtn();
        helper.waitUntilElementPresent(searchPage.elBenefName);
	  	expect(searchPage.getAllBenefPassports()).toBe(1);
	});

    it('should click sign in', function () {
        helper.clickLnkTopBarSignIn();
        helper.waitUntilElementPresent(helper.loginPanel);
    });

    it('should log in as a member with connections', function () {
        loginPage.enterEmail(memberGBEmail);
        loginPage.enterPassword(password);
        loginPage.clickBtnLogIn();
        helper.waitUntilElementIsNotPresent(helper.spinner);
        helper.waitUntilElementPresent(helper.searchResultsPanel);
    });

    it('should my connection be not displayed', function () {
        expect(searchPage.lnkMyConnections.isPresent()).toBeFalsy()
    });

    it('should click on new search', function () {
        searchPage.selectNewSearch();
    });

    it('should my connection be not displayed', function () {
        expect(searchPage.lnkMyConnections.isPresent()).toBeFalsy()
    });

  });
});
