const searchPage            = require('./../../po/search.po.js')
const usersData             = require('./../../data/users/data');
const helper                = require('./../../helpers/helper.js');

describe('Suite: Search', function () {

    const widgetUrl = usersData.widgetUrl;
    const nonprofitName = usersData.nonprofitName;
    const nonprofitEmail = usersData.emails.nonprofitEmail;
    const nonprofitStrapline = "automation test charity overview";
    const nonprofitPhoneNo = "0851111111";
    const fundraiserName = usersData.fundraiserName;
    const fundraiserTargetName = usersData.fundraiserTargetName;
    const fundraiserWorldName = usersData.fundraiserWorldName;
    const nonprofit501c3Name = usersData.nonprofits501c3.nonprofit501c3Name;
    const nonprofit501c3EIN = usersData.nonprofits501c3.nonprofit501c3EIN;
    const nonprofit501c3State = usersData.nonprofits501c3.nonprofit501c3State;


    describe('Sub suite: Add max.20', function () {

        let item = 0;
        const error = 'You can only donate to a maximum of 20 nonprofits or fundraisers.'

        beforeAll(function () {
            browser.get(widgetUrl);
            helper.waitUntilElementPresent(helper.widgetPanel);
        });

	    afterAll(function () {
		    helper.clearAllData();
	    });

        it('should search acharity',function () {
            helper.waitUntilElementPresent(searchPage.inSearch);
            searchPage.enterNameToSearch('acharity');
            searchPage.selectSearchBtn();
        });

	    it('should select 20 beneficiaries', function () {
            for (let y=0; y<4; y++){
              for (let x=0; x<5; x++){
                  item += 1;
                  searchPage.selectNthResultBeneficiaryAvatar(item);
              }
              helper.moveMouseOver(helper.pageNext)
              helper.clickNext()
            }
	    });

	    it('should select 21st beneficiary and verify error',function () {
		    searchPage.selectNthResultBeneficiaryAvatar(21);
		    helper.waitUntilElementPresent(helper.elErrorContainer);
		    expect(helper.getErrorTxt()).toBe(error);
	    });

	    it('should click on error, error should clear', function () {
		    helper.clickOkOnErr();
		    helper.waitUntilElementIsNotPresent(helper.elErrorContainer);
	    });

	    it('should continue', function () {
            helper.selectContinueBtn();
	    });

    });

    describe('Sub suite: advanced search nonprofit & fundraiser', function () {

        beforeAll(function () {
            browser.get(widgetUrl);
            helper.waitUntilElementPresent(helper.widgetPanel);
        });

        afterAll(function () {
            helper.clearAllData();
        });

        it('should enter and search fundraiser: [automation.fundraiser.test]',function () {
            helper.waitUntilElementPresent(searchPage.inSearch);
            searchPage.enterNameToSearch(fundraiserName);
            searchPage.selectSearchBtn();
            expect(searchPage.getSearchResulBeneficiaryName()).toBe(fundraiserName);
            expect(searchPage.getAllBenefPassports()).toBe(1);
        });

        it('should click on advanced search',function () {
            searchPage.selectAdvancedSearchLnk();
            expect(searchPage.getSearchResulBeneficiaryName()).toBe(fundraiserName);
        });

        it('should select fundraisers only', function () {
            searchPage.selectSearchFundraisersOnly()
            searchPage.selectSearchAdvancedBtn();
            expect(searchPage.getAllBenefPassports()).toBe(1);
        });

        it('should select nonprofits only', function () {
            searchPage.selectSearchNonprofitsOnly()
            searchPage.selectSearchAdvancedBtn();
            expect(searchPage.getAllBenefPassports()).toBe(0);
        });

        it('should select all', function () {
            searchPage.selectSelectAll()
            searchPage.selectSearchAdvancedBtn();
            expect(searchPage.getAllBenefPassports()).toBe(1);
        });

        it('should click on new search', function () {
            searchPage.selectNewSearch()
        });

        it('should enter and search nonprofit: [automation.nonprofit.test]',function () {
            helper.waitUntilElementPresent(searchPage.inSearch);
            searchPage.enterNameToSearch(nonprofitName);
            searchPage.selectSearchBtn();
            expect(searchPage.getSearchResulBeneficiaryName()).toBe(nonprofitName);
            expect(searchPage.getAllBenefPassports()).toBe(1);
        });

        it('should click on advanced search',function () {
            searchPage.selectAdvancedSearchLnk();
            expect(searchPage.getSearchResulBeneficiaryName()).toBe(nonprofitName);
        });

        it('should select nonprofits only', function () {
            searchPage.selectSearchNonprofitsOnly()
            searchPage.selectSearchAdvancedBtn();
            expect(searchPage.getAllBenefPassports()).toBe(1);
        });

        it('should select fundraisers only', function () {
            searchPage.selectSearchFundraisersOnly()
            searchPage.selectSearchAdvancedBtn();
            expect(searchPage.getAllBenefPassports()).toBe(0);
        });

        it('should select all', function () {
            searchPage.selectSelectAll()
            searchPage.selectSearchAdvancedBtn();
            expect(searchPage.getAllBenefPassports()).toBe(1);
        });

        it('should search by category - Animals', function () {
            searchPage.selectCategory('Animals')
            searchPage.selectSearchAdvancedBtn();
            expect(searchPage.getAllBenefPassports()).toBe(0);
        });

        it('should search by category - Education', function () {
            searchPage.selectCategory('Education')
            searchPage.selectSearchAdvancedBtn();
            expect(searchPage.getAllBenefPassports()).toBe(1);
        });

        it('should search by Country: Macao', function () {
            helper.selectCountry('Macao');
            searchPage.selectSearchAdvancedBtn();
            expect(searchPage.getAllBenefPassports()).toBe(0);
	    });

        it('should search by Country: Ireland', function () {
            helper.selectCountry('Ireland');
            searchPage.selectSearchAdvancedBtn();
            expect(searchPage.getAllBenefPassports()).toBe(1);

            expect(helper.dropState.isPresent()).toBe(false);
        });

        it('should nonprofits only', function () {
            searchPage.selectSearchNonprofitsOnly()
            searchPage.selectSearchAdvancedBtn();
            expect(searchPage.getAllBenefPassports()).toBe(1);
            expect(helper.getSelectedCountry()).toBe('Ireland');
        });

        it('should select all', function () {
            searchPage.selectSelectAll()
            searchPage.selectSearchAdvancedBtn();
            expect(searchPage.getAllBenefPassports()).toBe(1);
            expect(helper.getSelectedCountry()).toBe('Ireland');
        });

        it('should click o info icon - verify overlay', function () {
            helper.selectInfoOnPassport(nonprofitName);
            helper.waitUntilElementPresent(helper.overlayContent);
            expect(helper.getOverlayBeneficiaryName()).toBe(nonprofitName);
            expect(helper.getStrapline()).toBe(nonprofitStrapline);
            expect(helper.getEmailHref()).toBe("mailto:" + nonprofitEmail);
            expect(helper.getPhoneNo()).toContain(nonprofitPhoneNo);
        });

        it('should close overlay', function () {
            helper.closeOverlay()
            helper.waitUntilElementIsNotPresent(helper.overlayContent)
        });

        it('should click on new search', function () {
            searchPage.selectNewSearch()
            expect(searchPage.selBenefType.isPresent()).toBeFalsy()
        });

        it('should click on search nonprofit', function () {
            searchPage.selectSearchBtn();
            expect(searchPage.getAllBenefPassports()).not.toBe(0);
        });

	    it('should click next page', function () {
            helper.moveMouseOver(helper.pageNext)
            expect(helper.pagePrevious.getAttribute('class')).toContain('disabled');
            expect(helper.pageNext.getAttribute('class')).not.toContain('disabled');
            helper.clickNext()
            expect(helper.pagePrevious.getAttribute('class')).not.toContain('disabled');
            expect(helper.pageNext.getAttribute('class')).not.toContain('disabled');
	    });

        it('should click on advanced search',function () {
            searchPage.selectAdvancedSearchLnk();
        });

        it('should enter: nonprofit501c3EIN',function () {
            helper.waitUntilElementPresent(searchPage.inSearch);
            searchPage.enterNameToSearch(nonprofit501c3EIN);
            searchPage.selectSearchAdvancedBtn();
        });

        it('should search by country: United States', function () {
            helper.selectCountry('United States');
        });

        it('should search by state: nonprofit501c3State', function () {
            helper.waitUntilElementClickable(helper.dropState)
            helper.selectState(nonprofit501c3State);
            searchPage.selectSearchAdvancedBtn();
	    });

        it('should click o info icon - verify overlay', function () {
            helper.selectInfoOnPassport(nonprofit501c3Name);
            helper.waitUntilElementPresent(helper.overlayContent);
            expect(helper.getOverlayBeneficiaryName()).toBe(nonprofit501c3Name)
        });

        it('should close overlay', function () {
          helper.closeOverlay()
          helper.waitUntilElementIsNotPresent(helper.overlayContent)
        });
    });

    describe('Sub suite: World & with target fundraiser', function () {

        beforeAll(function () {
            browser.get(widgetUrl);
            helper.waitUntilElementPresent(helper.widgetPanel);
        });

        afterAll(function () {
            helper.clearAllData();
        });

        it('should enter and search fundraiser: [automation.worldfundraiser.test]', function () {
            helper.waitUntilElementPresent(searchPage.inSearch);
            searchPage.enterNameToSearch(fundraiserWorldName);
            searchPage.selectSearchBtn();
            expect(searchPage.getSearchResulBeneficiaryName()).toBe(fundraiserWorldName);
        });

        it('should click o info icon - world fundraiser panel', function () {
            helper.selectInfoOnPassport(fundraiserWorldName);
            helper.waitUntilElementPresent(helper.worldFundraiserPanel);
        });

        it('should change country: Algeria', function () {
            helper.selectCountry('Algeria');
            expect(searchPage.getIsYourCountryText()).toMatch('.+ Algeria .+')
        });

        // visible to moderators: login-and-connects.spec.js
        it('should not see raised amount=0, only visible to moderators', function () {
            expect(helper.txtRaisedAmount.isPresent()).toBeFalsy();
        });

        it('should go back', function () {
            searchPage.selectGoBack();
        });

        it('should enter and search fundraiser: [automation.targetfundraiser.test]', function () {
            helper.waitUntilElementPresent(searchPage.inSearch);
            searchPage.enterNameToSearch(fundraiserTargetName);
            searchPage.selectSearchBtn();
            expect(searchPage.getSearchResulBeneficiaryName()).toBe(fundraiserTargetName);
        });

        it('should click o info icon - world fundraiser panel', function () {
            helper.selectInfoOnPassport(fundraiserTargetName);
            helper.waitUntilElementPresent(helper.worldFundraiserPanel);
        });

        it('should change country: Ireland', function () {
            helper.selectCountry('Ireland');
            expect(searchPage.getIsYourCountryText()).toMatch('.+ Ireland .+');
        });

        it('should verify target amount', function () {
            expect(helper.getTargetAmount()).toEqual('¥ 10000000');
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
            helper.waitUntilElementPresent(searchPage.inSearch);
	    });
    });
});
