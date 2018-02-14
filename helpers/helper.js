const randomstring          = require("randomstring");
const faker                 = require('faker');
const usersData             = require('./../data/users/data');

/**
 * helper object.
 * @constructor
 */

var helper = function() {

	const jsDocumentReady = (index, callback) => { $('document').ready(function (){callback(index)})};
	const jsClickLogout = () => $('.fake-link.log-out').trigger('click');

	const self = this;
    /**
     *  Common locators
     */

    // panels
    this.widgetPanel = $('.widget-panel');

    this.searchResultsPanel = $('gw-search-result');

    this.worldFundraiserPanel = $('gw-world-fundraiser');

    this.paymentMethodsPanel = $('gw-payment-methods');

    this.donationPreviewPanel = $('gw-donation-preview');

	this.donationDetailsPanel = $('gw-donation-details');

	this.donationGiftCardsPanel = $('gw-donation-gift-cards');

	this.gWOverlay = $('gw-overlay');

	this.redeemPanel = $('gw-redeem');

	this.loginPanel = $('gw-login');

	this.matchPanel = $('gw-matching');

	this.signupMemberPanel = $('gw-member-signup');

	this.incompletePanel = $('gw-incomplete');

	this.successPanel = $('gw-success');

	this.demoGiftCardPanel = $('gw-demo-gift-card');

    this.slidersPanel = $('gw-selected-beneficiaries');

    this.advSearchSubPanel = $('[data-advance-search="true"]');

    this.beneficiariesHeader = $('gw-beneficiaries-header');


    this.overlayContent = $('.overlay-content');

    this.pageNext = $('.next-page');

    this.pagePrevious = $('.previous-page');

    this.lnkTopBarSignIn = $('#widget-top-bar .fa-sign-in');

    this.lnkTopBarAvatar = $('#widget-top-bar .avatar');

	this.lnkLogout = $('.fake-link.log-out');

    this.lnkCloseOverlay = $('.close-container>span')

	this.lnkCloseHelpLnk = element(by.cssContainingText('.fake-link', 'Close'))

	this.elOverlayBenefName = $('.overlay-content .beneficiary-name h3')

	this.txtRaisedAmount = $('.target-amount');

	this.btnContinue = element(by.cssContainingText('button', 'Continue'));

	this.dropState = $("[dropdowntype=\"state\"]");

	this.spinner = $('.spinner-container');

	// warning

	this.elWarning = $('.aS_infoCaution');

	this.btnYesWarning = this.elWarning.element(by.cssContainingText('button', 'Yes'));

	this.lnkNoThanksWarning = this.elWarning.element(by.cssContainingText('span', 'No thanks'));

	// errors

	this.elErrorContainer = $('.aS_infoError');

	this.elErrorTxt = $('.aS_infoError p');

	this.btnErrorOk = $('.aS_infoButtons').element(by.cssContainingText('button', 'OK'));

	this.elFormValidErr = $('.validation-error');

	// embedded

	this.widgetEmbedFrame = $('#testGivingWidget iframe');

	/**
	 *  Common functions
	 */

	this.getElementByCssContainingText = (el, text) => element(by.cssContainingText(el, text));

	this.getSpanByContainingText = (text) => element(by.cssContainingText('span', text));

    this.clickNext = function () {
		this.pageNext.click();
		this.waitUntilElementIsNotPresent(this.spinner);
	};

	this.clickPrevious = function () {
		this.pagePrevious.click();
		this.waitUntilElementIsNotPresent(this.spinner);
	};

	this.selectContinueBtn = function (switchCase='donationDetails') {
		this.waitUntilElementClickable(this.btnContinue);
		this.moveMouseOver(this.btnContinue);
		this.btnContinue.click();
		switch (switchCase){
			case 'donationDetails':
                this.waitUntilElementPresent(this.donationDetailsPanel);
                this.waitUntilElementPresent(this.beneficiariesHeader);
                break
			case 'search':
                this.waitUntilElementPresent(this.searchResultsPanel);
                break
			case 'giftcard':
				this.waitUntilElementPresent(this.donationGiftCardsPanel);
				break
			case 'error':
				this.waitUntilElementPresent(this.elFormValidErr);
				break
			case 'redeem':
				this.waitUntilElementPresent(this.redeemPanel);
				break
			case 'preview':
                this.waitUntilElementPresent(this.donationPreviewPanel);
                break
		};
	};

	this.getBenficiaryPassport = function (value) {
		return element.all(by.css('.beneficiary-details')).filter(function(details) {
			return details.element(by.css('.benificiary-name')).getText().then(function (name) {
				return name === value;
			});
		});
	};
	
	this.selectCountry = function (value) {
		let elFinder = $("[dropdowntype=\"country\"]")
        this.scrollIntoView(elFinder);
		this.waitAndClick(elFinder);

		let dropDown = $('gw-country-dropdown');
		this.waitUntilElementPresent(dropDown);

		let countrySelect = element(by.cssContainingText('gw-country-dropdown span', value));
        this.waitAndClick(countrySelect);

        this.waitUntilElementIsNotPresent(dropDown);
	};

	this.getSelectedCountry = function () {
		return $('[dropdowntype="country"] .inner-label').getText();
	};

	this.selectState = function (value) {
		this.waitAndClick(this.dropState);

        let dropDown = $('gw-states-dropdown');
        this.waitUntilElementPresent(dropDown);

        let stateSelect = element(by.cssContainingText('gw-states-dropdown span', value));
        this.waitAndClick(stateSelect);

        this.waitUntilElementIsNotPresent(dropDown);
	};

	// match

	this.matchPerc = $('.match-perc');
	this.getMatchText = ()=> {
		return this.matchPerc.getText();
	};

    this.matchMax = $('.match-max');
    this.getMatchMaxText = ()=> {
        return this.matchMax.getText();
    };

    this.getMatchUpToText = ()=> {
        return this.getSpanByContainingText('up to a maximum').getText();
    };

	this.clickLnkMatchCompany = (company) => {
		let elemFinder = $('gw-matching').element(by.cssContainingText('span.fake-link', company))
		this.waitUntilElementClickable(elemFinder);
		elemFinder.click();
	};

	// footer

	this.selectLanguage = function(value) {
		this.waitAndClick($('.lang-select'))
        let langElFin = $('[value="' + value + '"]')
        this.waitAndClick(langElFin)
		// self.logInfo('Selected language: ' + value)
	}

	this.getLanguage = () => {
        return $('.lang-select').getText()
	}

	this.getAllLangOptionsValues = function() {
		let arr = [];
		$$('.lang-select option').then(function(opts) {
			for (let o of opts) {
				o.getAttribute('value').then(function(attr) {
                    arr.push(attr);
                    // self.logInfo('attr: ' + attr)
				});
			};
		});
		return arr
	}

	this.selectLnkFooterOwner = () => {
        this.waitAndClick($('#owner-footer'))
    };

	// third party

    this.selectThirdPartyProvider = (value) => {
        let elFin = $('[title="' + value + '"]');
        this.waitAndClick(elFin)
    };

	// ---------------------------------------------
	// Overlay
	// ---------------------------------------------

	this.selectInfoOnPassport = function (value) {
		this.getBenficiaryPassport(value).first().$('.fa-info-circle').click();
	};

	this.selectBenefPassport = function (value) {
		let el = this.getBenficiaryPassport(value).first();
		this.waitUntilElementClickable(el);
		el.click()
	};

	this.getOverlayBeneficiaryName = function () {
		return this.elOverlayBenefName.getText();
	};

    this.getStrapline = function () {
    	let elFinder = $('.overlay .strapline');
    	this.waitUntilElementPresent(elFinder);
        return elFinder.getText();
    };

    this.getEmailHref = function () {
        let elFinder = $('[data-qa="email"] a');
        this.waitUntilElementPresent(elFinder);
        return elFinder.getAttribute('href');
    };

    this.getPhoneNo = function () {
        let elFinder = $('[data-qa="telephone"] span');
        this.waitUntilElementPresent(elFinder);
        return elFinder.getText();
    };

	this.closeOverlay = function () {
		this.waitUntilElementIsNotPresent(this.spinner);
		this.waitAndClick(this.lnkCloseOverlay);
	};

    this.closeHelpPanel = function () {
        this.waitAndClick(this.lnkCloseHelpLnk);
    };

	this.getHeadingOverlay = function () {
		return $('.details-box h2').getText()
    };

    this.getParagraphOverlay = function () {
        return $('.details-box p').getText()
    };

	this.getRaisedAmount = function () {
		return this.txtRaisedAmount.getText();
	};

	this.getTargetAmount = function () {
		return this.txtRaisedAmount.getText();
	};

	this.clickLogout = function () {
		this.waitUntilElementClickable(this.lnkLogout);
		browser.executeScript(jsClickLogout);
        this.waitUntilElementIsNotPresent(this.overlayContent);
	};

	this.clickCloseOverlay = function () {
		this.waitUntilElementClickable(this.lnkCloseOverlay);
		this.lnkCloseOverlay.click();
	};

	// warning

	this.clickYesWarning = function () {
		this.waitUntilElementClickable(this.btnYesWarning);
		this.btnYesWarning.click();
	};

	this.clickNoThanksWarning = function () {
		this.waitUntilElementClickable(this.lnkNoThanksWarning);
		this.lnkNoThanksWarning.click();
	};

	// errors

	this.getErrorTxt = function () {
		return this.elErrorTxt.getText();
	};

	this.clickOnErr = function () {
		this.elErrorContainer.click();
	};

	this.clickOkOnErr = function () {
		this.btnErrorOk.click();
	};

	this.getValidationFormErrText = function () {
		this.waitUntilElementPresent(this.elFormValidErr);
		return this.elFormValidErr.getText();
	};

    this.getValidationFormContainingTextErr = function (err) {
    	this.waitUntilElementVisible(element(by.cssContainingText('span', err)));
        return element(by.cssContainingText('span', err)).getText();
    };
	
	// bullets and top bar
	
	this.clickSearchBullet = function () {
		$('[href*="/search"].step').click();
	};

	this.clickDetailsBullet = function () {
		$('[href*="/details"].step').click();
		this.waitUntilElementPresent(this.donationDetailsPanel);
	};

	this.clickPaymentBullet = function () {
		$('[href*="/payment"].step').click();
		this.waitUntilElementPresent(this.paymentMethodsPanel);
	};

	this.clickPreviewBullet = function () {
		$('[href*="/preview"].step').click();
        this.waitUntilElementPresent(this.donationPreviewPanel);
	};

	this.clickLnkTopBarSignIn = function () {
		this.waitUntilElementClickable(this.lnkTopBarSignIn);
		this.lnkTopBarSignIn.click();
	};

	this.clickTopBarAvatar = function () {
		this.lnkTopBarAvatar.click();
	};

	this.getBulletCount = () => {
		return $$('li .fa-circle').count()
	};
	
	// test logo
	this.clicktestLogo = function () {
		let el = $('[title="About test and the Giving Widget"]');
		this.waitAndClick(el);
    };

    /**
     * Clear browser session storage
     *
     */
    this.clearSessionStorage = function () {
        browser.executeScript('window.sessionStorage.clear();');
    };

    /**
     * Clear browser local storage
     *
     */
    this.clearLocalStorage = function () {
        browser.executeScript('window.localStorage.clear();');
    };

    /**
     * Clear cookies
     *
     */
    this.clearCookies = function () {
        browser.manage().deleteAllCookies();
    };

    /**
     * Clear all browser data
     * inc. basket
     */
    this.clearAllData = function () {
        browser.executeScript("document.querySelector('.return').click()");
        this.clearSessionStorage();
        this.clearLocalStorage();
        this.clearCookies();
    };

    /**
    * Wait until selected element will be present in DOM
    *
    * @param element
    */
    this.waitUntilElementPresent = function (element) {
        var EC = protractor.ExpectedConditions;
        browser.driver.wait(EC.presenceOf(element), 25000).then(function () {
			// success
		}, function (error) {
            fail("waitUntilElementPresent: " + error + " on element: " + element.locator());
		});
    };

    /**
    * Wait until selected element will be absent in DOM
    *
    * @param element
    */
    this.waitUntilElementIsNotPresent = function (element) {
        var EC = protractor.ExpectedConditions;
        browser.driver.wait(EC.stalenessOf(element), 25000).then(function () {
			// success
		}, function (error) {
            fail("waitUntilElementIsNotPresent: " + error + " on element: " + element.locator());
		});
    };

    /**
    * Wait until selected element will be visible
    *
    * @param element
    */
    this.waitUntilElementVisible = function (element) {
        var EC = protractor.ExpectedConditions;
        browser.driver.wait(EC.visibilityOf(element), 25000).then(function () {
			// success
		}, function (error) {
            fail("waitUntilElementVisible: " + error + " on element: " + element.locator());
		});
    };

    /**
    * Wait until selected element will be invisible
    *
    * @param element
    */
    this.waitUntilElementInvisible = function (element) {
        var EC = protractor.ExpectedConditions;
        browser.driver.wait(EC.invisibilityOf(element), 25000).then(function () {
			// success
		}, function (error) {
            fail("waitUntilElementInvisible: " + error + " on element: " + element.locator());
		});
    };

    /**
	 *
     * @param _element - css selector ( NOT element finder )
	 * waitUntilAllElementsInvisible('.class')
     */
    this.waitUntilAllElementsInvisible = function (_element) {

        element.all(by.css(_element)).count().then(function (_counter) {
            self.logInfo('Found: ' + counter + " " + element);
            for (let x=0; x < _counter; x++){
                self.logInfo('checking index: ' + x + ' out of ' + _counter.toString());
                var EC = protractor.ExpectedConditions;
                browser.driver.wait(EC.invisibilityOf(element.all(by.css(_element)).get(x)), 25000).then(function () {
                    // success
                }, function (error) {
                    fail("waitUntilAllElementsInvisible: " + error + " on element: " + _element);
                });
            };
        });
    };

    /**
    * Wait until selected element will be clickable
    *
    * @param element
    */
    this.waitUntilElementClickable = function (element) {
        var EC = protractor.ExpectedConditions;
        browser.driver.wait(EC.elementToBeClickable(element), 25000).then(function () {
			// success
		}, function (error) {
            fail("waitUntilElementClickable: " + error + " on element: " + element.locator());
		});
    };

    this.waitAndClick = function (element) {
        this.waitUntilElementIsNotPresent(this.spinner);
        this.waitUntilElementClickable(element);
		element.click();
    };


    /**
     * Wait until element settles position
     *
     * @param element
     */
	
	this.waitUntilSettlesPosition = function (initX = 0, initY = 0, selector) {

		// aint working

        let positionX;
        let positionY;

		element(by.css(selector)).getLocation().then(function (location) {
			positionX = location.x;
			positionY = location.y;
			self.logInfo(`element location: x: ${positionX} & y: ${positionY}`);
			self.logInfo(`init element location: x: ${initX} & y: ${initY}`);

			if (positionX === initX) {
				self.logInfo(`location settled at: ${initX} & ${initY}`);
			} else {
				browser.sleep(500);
                self.logInfo(`location not settled, sleep 500 ms`);
			};
		});

		return positionX, positionY
    };
	
    /**
	 *     waitUntilWindowCount
	 *     @param count - window count to wait for
     */
    
    this.waitUntilWindowCount = function (count) {
		browser.wait(windowCount(count), 25000).then(function () {
        }, function (error) {
			expect('waitUntilWindowCount').toBe(count);
            fail("waitUntilWindowCount: " + error + ". Count failed: " + count);
		});
    };

    var windowCount = function (count) {
    	return function () {
			return browser.getAllWindowHandles().then(function (handles) {
				return handles.length === count;
			});
        };
    };

    this.getWindowTitle = () => {
        return browser.getTitle()
	};

    this.getCurrentUrl = () => {
        return browser.getCurrentUrl()
	};

    /**
    * Mouse over element
    *
    * @param element
    */
    this.moveMouseOver = function (element) {
        browser.actions().mouseMove(element).perform();
    };

    this.scrollIntoView = function (element) {
        browser.executeScript('arguments[0].scrollIntoView()', element.getWebElement());
    };

    this.scrollTopUp = function () {
        browser.executeScript('window.scrollTo(0, 0);');
    };

    this.scrollByOffset = function (x=0, y=0) {
    	let script = 'window.scrollTo(' + x + ', ' + y + ');'
		this.logInfo("scroll by: " + script);
        browser.executeScript(script);
    };

    /**
    * Unique value
    *
    */
    this.uniqueValue = function () {
        return faker.random.uuid();
    };

    /**
    * Unique alpha numeric value
    *
    */
    this.randomAlphaNumeric = function () {
      return faker.random.alphaNumeric();
    };

	/**
	 * Unique lowercase string
	 * https://www.npmjs.com/package/randomstring
	 */
	this.randomAlphabeticLow = function (value) {
		return randomstring.generate({
			charset: 'alphabetic',
			capitalization: 'lowercase',
			length: value
		});
	};

	/**
    * Select option in dropdown
    *
    * @param element, option
    */
    this.selectFromDropdown = function (element, option) {
        element.element(by.cssContainingText('option', option)).click();
    };

    /**
    * Switch to next browser tab
    *
    */
    this.switchToNextWindow = function () {
        browser.getAllWindowHandles().then(function (handles) {
          if (handles.length > 1) {
            browser.switchTo().window(handles[handles.length - 1]);
            browser.getTitle().then(function (title) {
				self.logInfo(`switched to window: ${title}`)
            })
          }
        });
    };

    /**
     * Switch to window
     *
     */
    this.switchToWindow = function () {
        browser.getAllWindowHandles().then(function (handles) {
			browser.switchTo().window(handles[0]);
			browser.getTitle().then(function (title) {
                self.logInfo(`switched to window: ${title}`)
            });
        });
    };

    /**
    * Switch to previous browser tab
    */
    
    this.closeAndSwitchToPreviousWindow = function (close=true) {
        browser.getAllWindowHandles().then(function (handles) {
          if (handles.length > 1) {
          	if (close) {
                browser.close();
            }
            browser.switchTo().window(handles[handles.length - 2]);
          }
        });
    };

    /**
     * Switch to iframe
     */

    this.switchToIFrame = function (close = true) {
    	this.waitUntilElementPresent($('iframe'));
        browser.switchTo().frame(0);
	}

    this.switchToWidgetIframeById = function (frameId="widgetIframe") {
        this.logInfo("iframe: " + "[id^='" + frameId + "']")
        this.waitUntilElementPresent($("[id^='" + frameId + "']"));
        browser.switchTo().frame(0);
    }

    /**
    * Accept browser alert if present
    */
    
    this.acceptAlert = function() {
        browser.switchTo().alert().then(function(alert) {
          alert.accept();
        }, function (err) {
        	 fail('Could not accept alert')
		});
    };

    this.getPageTitle = function() {
        browser.getTitle().then(function (title) {
            self.logInfo(`page title: ${title}`)
        });
        return browser.getTitle();
	};

    /**
	 * Common logger
     */

    this.getUrl = (url) => {
    	browser.get(url);
    	this.logUrl(url, "getUrl:");
	};

	let indent = "      "
	this.logUrl = (message, prefix="url:") => {
		this.logInfo(`${prefix} ${message}`);
    }


    this.logInfo = function (message) {
		return new Promise(function (resolve) {
            console.log(`${indent}\u2139 ${message}`);
            resolve(true);
        });
    };

    this.logWarning = function (message) {
        return new Promise(function (resolve) {
            console.log(`${indent}\u26A0 ${message}`);
            resolve(true);
        });
    };

    this.logError = function (message) {
        return new Promise(function (resolve) {
            console.log(`${indent}\u2715 ${message}`);
            resolve(true);
        });
    };

    
};

module.exports = new helper();
