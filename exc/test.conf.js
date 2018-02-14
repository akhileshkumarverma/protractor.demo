exports.config = {
    directConnect: true,

    capabilities: {
        browserName: 'chrome',
		chromeOptions: {
			'args': ['disable-infobars=true'],
			'prefs': {
				'credentials_enable_service': false
			}
		},
    },

    framework: 'jasmine',

    suites: {
		eval: ['./test.tc.js']
    },

    allScriptsTimeout: 30000,

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true
    },

    onPrepare: function() {
        const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
        jasmine.getEnv().addReporter(new SpecReporter());
        browser.driver.manage().window().setSize(1440, 900);
    },

};
