/**
 * Common helper object.
 * @constructor
 */
var helper = function() {

    /**
    * Wait until selected element will be present in DOM
    *
    * @param element
    */
    this.waitUntilElementPresent = function (element) {
        var EC = protractor.ExpectedConditions;
        browser.driver.wait(EC.presenceOf(element), 30000).then(function () {
			// success
		}, function (error) {
			expect('waitUntilElementPresent').toBe(element.locator());
		});
    };

    this.elUpwork = $('[alt="Upwork"]');
};

module.exports = new helper();
