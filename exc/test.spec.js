describe('Suite: test', function () {

    describe('should select iframe', function () {

        beforeAll(function () {
            browser.ignoreSynchronization = true;
            browser.get('https://www.test.com/donate');
        });

        afterAll(function () {
            browser.ignoreSynchronization = false;
        });

        it('should wait for iframe', function () {
            waitForEl($('iframe'));
        });

        it('should switch to iframe', function () {
            browser.switchTo().frame(0);
        });

        it('should enter search text', function () {
            $('[class="q"]').sendKeys('search');
        });

        it('should wait to see it typed in', function () {
            browser.sleep(2000);
        });

        it('should switch to default content', function () {
            browser.driver.switchTo().defaultContent();
        });

    });

    function waitForEl(element) {
        var EC = protractor.ExpectedConditions;
        browser.driver.wait(EC.presenceOf(element), 30000).then(function () {
            // success
        }, function (error) {
            fail("waitForEl: " + error + " on element: " + element.locator());
        });
    };

});
