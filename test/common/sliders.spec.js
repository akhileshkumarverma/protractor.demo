const searchPage            = require('./../../po/search.po')
const detailsPage           = require('./../../po/details.po')
const slidersPage           = require('./../../po/sliders.po')
const usersData             = require('./../../data/users/data');
const helper                = require('./../../helpers/helper.js');
const paymentPage           = require('./../../po/payment.po');
const previewPage           = require('./../../po/preview.po');

describe('Suite: Sliders', function () {

    const baseUrl = usersData.baseUrl;
    const widgetUrl = usersData.widgetUrl;
    const nonprofitName = usersData.nonprofitName;
    const fundraiserWorldName = usersData.fundraiserWorldName;
    const fundraiserWorldGBName = usersData.fundraiserWorldGBName;
    const fundraiserName = usersData.fundraiserName;

	describe('Sub suite: Drag and drop, percentage', function () {

		beforeAll(function () {
			browser.get(widgetUrl);
			helper.waitUntilElementPresent(helper.widgetPanel);
		});

		afterAll(function () {
			helper.clearAllData();
		});

		it('should search [automation.nonprofit.test] and click upon it',function () {
			helper.waitUntilElementPresent(searchPage.inSearch);
			searchPage.enterNameToSearch(nonprofitName);
			searchPage.selectSearchBtn();
			searchPage.selectSearchResultBeneficiaryName(nonprofitName, null);
		});

		it('should search fundraiserWorldName and click upon it',function () {
		  searchPage.enterNameToSearch(fundraiserWorldName);
		  searchPage.selectSearchBtn();
		  searchPage.selectSearchResultBeneficiaryName(fundraiserWorldName, 1);
		  helper.selectContinueBtn();
		});

        it('should select sliders', function () {
            detailsPage.clickSliders();
            helper.waitUntilElementPresent(helper.slidersPanel);
        });

        it('should click on world fundraiser', function () {
            slidersPage.selectBeneficiaryNameOnPassport(fundraiserWorldName);
            helper.waitUntilElementPresent(helper.worldFundraiserPanel);
        });

        it('should change country to uk', function () {
            helper.selectCountry('United Kingdom');
            searchPage.selectGoBack();
        });
        
        it('should click on add more', function () {
            slidersPage.clickAdd();
            helper.waitUntilElementPresent(searchPage.inSearch);
        });
        
		it('should search united and click search',function () {
			searchPage.enterNameToSearch('united');
			searchPage.selectSearchBtn();
		});

		it('should select 1 benef and continue', function () {
			searchPage.selectNthResultBeneficiaryAvatar(3);
		});

        it('should search fundraiserWorldName and click upon it',function () {
            searchPage.enterNameToSearch(fundraiserWorldGBName);
            searchPage.selectSearchBtn();
            searchPage.selectSearchResultBeneficiaryName(fundraiserWorldGBName, 3);
            helper.selectContinueBtn();
        });

		it('should select sliders', function () {
			detailsPage.clickSliders();
			helper.waitUntilElementPresent(helper.slidersPanel);
		});

		it('should verify passports % and delete one beneficiary', function () {
			expect(slidersPage.getAllSliderPassports()).toBe(4);
			expect(slidersPage.getNthTextPercentagePassport(0)).toBe('25%');
			expect(slidersPage.getNthTextPercentagePassport(1)).toBe('25%');
			expect(slidersPage.getNthTextPercentagePassport(2)).toBe('25%');
			expect(slidersPage.getNthTextPercentagePassport(3)).toBe('25%');

			slidersPage.selectTrashOnPassport(nonprofitName)
			expect(slidersPage.getAllSliderPassports()).toBe(3);
			expect(slidersPage.getNthTextPercentagePassport(0)).toMatch('3.%');
			expect(slidersPage.getNthTextPercentagePassport(1)).toMatch('3.%');
			expect(slidersPage.getNthTextPercentagePassport(2)).toMatch('3.%');
		});

		it('should add back in again: [automation.nonprofit.test]', function () {
			slidersPage.clickAdd();
			helper.waitUntilElementPresent(searchPage.inSearch);
			searchPage.enterNameToSearch(nonprofitName);
			searchPage.selectSearchBtn();
			searchPage.selectSearchResultBeneficiaryName(nonprofitName, 3);
			helper.selectContinueBtn();
		});

		it('should select sliders', function () {
		  detailsPage.clickSliders();
		  helper.waitUntilElementPresent(helper.slidersPanel);
		});

		it('should verify sliders and percentage', function () {
			expect(slidersPage.getNthTextPercentagePassport(0)).toBe('25%');
			expect(slidersPage.getAllSliderPassports()).toBe(4);
		});

		it('should click on [automation.nonprofit.test] & verify overlay', function () {
			slidersPage.selectBeneficiaryNameOnPassport(nonprofitName);
			helper.waitUntilElementPresent(helper.overlayContent);
			expect(helper.getOverlayBeneficiaryName()).toBe(nonprofitName);
		});

		it('should close overlay', function () {
			helper.closeOverlay();
			helper.waitUntilElementIsNotPresent(helper.overlayContent);
		});

		it('should drag nonprofit slider by x=150 & verify %', function () {
			slidersPage.moveSliderByX(nonprofitName, 150);
			expect(slidersPage.getNthTextPercentagePassport(0)).toMatch('1.%');
			expect(slidersPage.getNthTextPercentagePassport(1)).toMatch('1.%');
			expect(slidersPage.getNthTextPercentagePassport(2)).toMatch('1.%');
			expect(slidersPage.getNthTextPercentagePassport(3)).toMatch('5.%');
			expect(slidersPage.getNthTextPercentagePassport(3)).not.toContain('25');
		});

		it('should reset & verify %', function () {
			slidersPage.clickReset();
			expect(slidersPage.getNthTextPercentagePassport(0)).toBe('25%');
			expect(slidersPage.getNthTextPercentagePassport(1)).toBe('25%');
			expect(slidersPage.getNthTextPercentagePassport(2)).toBe('25%');
			expect(slidersPage.getNthTextPercentagePassport(3)).toBe('25%');
		});

		it('should lock fundraiser %', function () {
			slidersPage.lockBeneficiarySlider(fundraiserWorldName);
		});

		it('should drag nonprofit slider by x=-70 & verify %', function () {
			slidersPage.moveSliderByX(nonprofitName, -70);
			expect(slidersPage.getNthTextPercentagePassport(0)).toBe('25%');
			expect(slidersPage.getNthTextPercentagePassport(1)).toMatch('3.%');
			expect(slidersPage.getNthTextPercentagePassport(2)).toMatch('3.%');
			expect(slidersPage.getNthTextPercentagePassport(3)).toMatch('1.%');
		});

		it('should unlock fundraiser %', function () {
			slidersPage.unlockBeneficiarySlider(fundraiserWorldName);
		});

		it('should drag nonprofit slider by x=500 & verify %', function () {
			slidersPage.moveSliderByX(nonprofitName, 500);
			expect(slidersPage.getNthTextPercentagePassport(0)).toBe('1%');
			expect(slidersPage.getNthTextPercentagePassport(1)).toMatch('1%');
			expect(slidersPage.getNthTextPercentagePassport(2)).toMatch('1%');
			expect(slidersPage.getNthTextPercentagePassport(3)).toMatch('97%');

			expect(slidersPage.getBeneficiarySplitAmount(fundraiserWorldName)).toMatch('.+ 0.00');
			expect(slidersPage.getBeneficiarySplitAmount(nonprofitName)).toMatch('.+ 0.00');
		});

		it('should click btn continue on sliders', function () {
			helper.selectContinueBtn();
			helper.waitUntilElementPresent(helper.donationDetailsPanel);
		});

        it('should enter amount: 1000 and email', function () {
            detailsPage.enterAmount('1000');
            detailsPage.enterEmail('test@protractor.com');
            detailsPage.selectCurrency();
        });

        it('should click Donate', function () {
            detailsPage.clickDonateNow();
        });

        it('should select payment method master card', function () {
            helper.waitUntilElementPresent(helper.paymentMethodsPanel);
            paymentPage.clickPaymentMethod();
            paymentPage.clickContinue();
        });

        it('should see 4 beneficiaries and master card', () => {
            helper.waitUntilElementPresent(helper.donationPreviewPanel);
            expect(previewPage.getPaymentMethodTxt()).toContain("Mastercard");
            expect(previewPage.getAllBeneciariesCount().count()).toBe(4);
        });
        
        it('should verify beneficiaries percentage', function () {
        	let items = previewPage.getAllPercentageBenef();
			expect(items).toEqual([
                {index: 0, text: '1%'},
                {index: 1, text: '1%'},
                {index: 2, text: '1%'},
                {index: 3, text: '97%'}
            ]);
        });

        it('should verify beneficiaries amounts', function () {
        	let items = previewPage.getAllAmountsBenef();
			expect(items).toEqual([
                {index: 0, text: '€ 10.00'},
                {index: 1, text: '€ 10.00'},
                {index: 2, text: '€ 10.00'},
                {index: 3, text: '€ 970.00'}
            ]);
        });

        it('should verify anchored edit links', function () {
            expect(previewPage.getEditDetailsLnkHref()).toContain('#emailTag');
            expect(previewPage.getEditAmountLnkHref()).toContain('#amountTag');
            expect(previewPage.getEditMessageLnkHref()).toContain('#messageTag');
            expect(previewPage.getFirstNameLnkHref()).toContain('details#emailTag');
            expect(previewPage.getLastNameLnkHref()).toContain('details#emailTag');
            expect(previewPage.getPaymentMethodLnkHref()).toContain('/widget/donate/payment');
            expect(previewPage.getEditGiftAidLnkHref()).toContain('details#giftaid');
        });

        it('should click lnk edit beneficiaries', function () {
			previewPage.clickEditBeneficiariesLnk();
			helper.waitUntilElementPresent(helper.slidersPanel);
        });

        it('should delete 2 x beneficiaries, sliders not disabled', function () {
            slidersPage.selectTrashOnPassport(fundraiserWorldName);
            slidersPage.selectTrashOnPassport(nonprofitName);
            expect(slidersPage.getDisabledSlider().isPresent()).toBeFalsy()
        });

        it('should lock fundraiser %', function () {
            slidersPage.lockBeneficiarySlider(fundraiserWorldGBName);
            expect(slidersPage.getDisabledSlider().isPresent()).toBeTruthy()
        });

        it('should reset', function () {
            slidersPage.clickReset();
            expect(slidersPage.getDisabledSlider().isPresent()).toBeFalsy()
        });

        it('should trash one beneficiary, one left has slider disabled', function () {
			slidersPage.selectTrashOnPassport(fundraiserWorldGBName);
			expect(slidersPage.getAllBenefPassports()).toBe(1)
            expect(slidersPage.getDisabledSlider().isPresent()).toBeTruthy()
        })

        it('should trash last beneficiary', function () {
            slidersPage.selectTrashOnPassport();
            helper.waitUntilElementPresent(helper.searchResultsPanel);
        });

	});

	describe('Sub suite: Amounts', function () {

		beforeAll(function () {
			browser.get(widgetUrl);
			helper.waitUntilElementPresent(helper.widgetPanel);
		});

		afterAll(function () {
			helper.clearAllData();
		});

		it('should search [automation.nonprofit.test] and click upon it',function () {
			helper.waitUntilElementPresent(searchPage.inSearch);
			searchPage.enterNameToSearch(nonprofitName);
			searchPage.selectSearchBtn();
			searchPage.selectSearchResultBeneficiaryName(nonprofitName, null);
		});

		it('should search [automation.fundraiser.test] and click upon it',function () {
			searchPage.enterNameToSearch(fundraiserName);
			searchPage.selectSearchBtn();
			searchPage.selectSearchResultBeneficiaryName(fundraiserName, 1);
			helper.selectContinueBtn();
		});

		it('should enter amount: 1000', function () {
			detailsPage.enterAmount('1000');
		});

		it('should select sliders', function () {
			detailsPage.clickSliders();
			helper.waitUntilElementPresent(helper.slidersPanel);
		});

		it('should verify amounts and remove nonprofit', function () {
			expect(slidersPage.getDonationAmount()).toMatch('You are donating.+1,000\.00.+');
			expect(slidersPage.getBeneficiarySplitAmount(nonprofitName)).toMatch('.+500.00');
			expect(slidersPage.getBeneficiarySplitAmount(fundraiserName)).toMatch('.+500.00');

			slidersPage.selectTrashOnPassport(nonprofitName);
			expect(slidersPage.getDonationAmount()).toMatch('You are donating.+1,000\.00.+');
			expect(slidersPage.getBeneficiarySplitAmount(fundraiserName)).toMatch('.+1,000.00');
		});

		it('should remove fundraiser - all removed', function () {
			slidersPage.selectTrashOnPassport(fundraiserName);
		});

		it('should redirect to search panel', function () {
			helper.waitUntilElementPresent(searchPage.inSearch);
		});

	});
});
