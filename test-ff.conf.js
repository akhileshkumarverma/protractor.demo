var Config = require('./config.data.json');
var App = Config.apps[Object.keys(Config.apps)[0]];
var colours = true;


var init = function() {
  for (var i = 0; i < process.argv.length; i++) {
    var obj = process.argv[i];

    var appMatch = obj.match(/^--app=(.*)$/);
    if (appMatch && appMatch.length > 0) {
        App = Config.apps[appMatch[1]];
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

    // https://github.com/SeleniumHQ/selenium/issues/3693
    // https://github.com/SeleniumHQ/selenium/issues/4564
    capabilities: {
        browserName: 'firefox',
    },

    framework: 'jasmine',

    suites: {
        dev: ['./test/common/help-panels.spec.js'],
        smoke_dp: ['./test/datapop/warmup-datapop.spec.js',
                   './test/datapop/giftaid.spec.js',
                   './test/datapop/giftcard-company.spec.js',
                   './test/datapop/giftcard-members.spec.js',
                   './test/datapop/giftcard-guest.spec.js',
                   './test/datapop/giftcard-match.spec.js',
                   './test/datapop/giftcard-default.spec.js',
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
};
