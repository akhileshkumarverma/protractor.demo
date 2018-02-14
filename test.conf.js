const Config = require('./config.data.json');
let App = Config.apps[Object.keys(Config.apps)[0]];
let chromOpt = {'args': ['disable-infobars=true'], 'prefs': {'credentials_enable_service': false} };
let colours = true;


var init = function() {
  for (var i = 0; i < process.argv.length; i++) {
    var obj = process.argv[i];

    var appMatch = obj.match(/^--app=(.*)$/);
    if (appMatch && appMatch.length > 0) {
        App = Config.apps[appMatch[1]];
    };

    var headLessMatch = obj.match(/^--headless(.*)$/);
    if (headLessMatch && headLessMatch.length > 0) {
        console.log('Browser Mode: headless')
        chromOpt = {'args': ['disable-infobars=true', '--headless'], 'prefs': {'credentials_enable_service': false} };
    };

    var coloursMatch = obj.match(/^--no-colours(.*)$/);
    if (coloursMatch && coloursMatch.length > 0) {
        console.log('Colour Mode: --no-colours');
        colours = false;
    };
  }
}();

exports.config = {

    directConnect: true,

    baseUrl: App.baseUrl,
    params: App.params,

    capabilities: {
        browserName: 'chrome',
		chromeOptions: chromOpt,
		loggingPrefs: {
			browser: 'ALL' // "OFF", "SEVERE", "WARNING", "INFO", "CONFIG", "FINE", "FINER", "FINEST", "ALL".
		},
        // allows different specs to run in parallel.
        // shardTestFiles: 'true',
        // maxInstances: 1
    },

    framework: 'jasmine',

    suites: {
        dev: ['./test/datapop/giftcard-default.spec.js'],
        smoke_dp: ['./test/datapop/warmup-datapop.spec.js',
                   './test/datapop/giftaid.spec.js',
                   './test/datapop/giftcard-company.spec.js',
                   './test/datapop/giftcard-members.spec.js',
                   './test/datapop/giftcard-guest.spec.js',
                   './test/datapop/giftcard-match.spec.js',
                   './test/datapop/giftcard-default.spec.js',
                   './test/datapop/fb-app.spec.js',
                   './test/datapop/search.spec.js',
                   './test/datapop/login-and-connects.spec.js',
                   './test/datapop/whitelist-comp.spec.js',
                   './test/datapop/match.spec.js',
                   './test/datapop/footer.spec.js',
			       './test/common/sliders.spec.js',
			       './test/common/repeat.spec.js',
			       './test/common/incomplete.spec.js',
				   './test/common/signup.spec.js',
				   './test/common/thirdparty.spec.js',
                   './test/common/help-panels.spec.js',
        ],
        smoke_sdb:['./test/common/warmup.spec.js',
                   './test/common/help-panels.spec.js',
                   './test/common/sliders.spec.js',
                   './test/common/repeat.spec.js',
                   './test/common/incomplete.spec.js',
                   './test/common/signup.spec.js',
                   './test/common/thirdparty.spec.js',
                   './test/common/giftcard-trya.spec.js',
      ],
        regression: [
          './test/common/',
        ],
		eval: ['./helpers/log.spec.js']
    },

    allScriptsTimeout: 30000,

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true,
        print: function() {} // remove dots in reporter
    },

    onPrepare: function() {
        var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
        const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

        // Configuration:
        // https://github.com/bcaudan/jasmine-spec-reporter/blob/master/src/configuration.ts
        jasmine.getEnv().addReporter(new SpecReporter({
            colors: {
                enabled: colours
            },
            prefixes: {
                failed: "\u2715"
            },

        }));
        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
            savePath: './reports/',
            screenshotsFolder: 'images',
            takeScreenshotsOnlyOnFailures: true
        }));

        browser.driver.manage().window().setSize(1440, 900);
        //browser.driver.manage().window().maximize();
    },

	plugins: [

	// https://www.npmjs.com/package/protractor-console
    //{
    //    package: 'protractor-console',
    //    logLevels: ['severe']
    //},

        // https://www.npmjs.com/package/protractor-console-plugin
       // https://github.com/angular/protractor-console-plugin/blob/master/spec/consoleFailFilterConfig.js

    {   package: 'protractor-console-plugin',
        failOnError: false,
        logWarnings: false,
        exclude: ['Failed to load resource: the server responded with a status of 404 (Not Found)',
                  /^.+Found 2 elements with non-unique id.+$/
        ]
	}]
};
