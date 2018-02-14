# Installation

## npm global installation
1. Protractor: ```npm install -g protractor```
2. Updated webdriver manager: ```webdriver-manager update```

## npm local installation
1. [Protractor jasmine html reporter](https://www.npmjs.com/package/protractor-jasmine2-html-reporter)
```$ npm install protractor-jasmine2-html-reporter --save-dev```
2. [Jasmine spec reporter](https://www.npmjs.com/package/jasmine-spec-reporter)
```npm install jasmine-spec-reporter --save-dev```
3. ~~[Bottle js](https://github.com/young-steveo/bottlejs)~~
~~npm install bottlejs~~
4. [Faker](https://www.npmjs.com/package/faker)
```npm install faker```
5. [Protractor console](https://www.npmjs.com/package/protractor-console)
```npm install --save-dev protractor-console```
```npm install -g protractor-console```
6. [Protractor console plugin](https://www.npmjs.com/package/protractor-console-plugin)
```npm i -g protractor-console-plugin```
7. [Random string](https://www.npmjs.com/package/randomstring)
```npm install randomstring --save-dev```
8. [mssql](https://www.npmjs.com/package/mssql)
```npm install mssql --save```
9. For Typescript only: [github Typescript prottactor](https://github.com/angular/protractor/tree/master/exampleTypescript)
```npm install --save-dev @types/jasmine @types/jasminewd2```

**Note:** If you encounter package.json error, you'll need to create a package.json in the confs dir ```npm init -Y```
Type in description and other required entries. an example of json file - package.json.example

## Run from command line:
1. specific test: _--suite=dev_  
```protractor test.conf.js  --suite=dev --app=angulartest --disableChecks```
2. a banch of tests: e.g. --suite=smoke  
```protractor test.conf.js  --suite=smoke --app=angulartest --disableChecks```
_Note: we use directConnect set to true, hence there's no need to start a server. we call chromedriver directly_  
_See: test.conf.js_
3. headless mode: _--headless_

## Webstorm debug:
1. JavaScrript File: ```~\AppData\Roaming\npm\node_modules\protractor\built\cli.js```
2. Application parameters: ```test.conf.js  --suite=dev --app=angulartest --disableChecks```

3. Recognize jasmine methods:
[stackoverflow.com](https://stackoverflow.com/questions/8108461/how-can-i-get-webstorm-to-recognize-jasmine-methods)

4. Recognize protractor:  
a. File -> Settings --> Libraries --> Add --> Attach Directory
b. Go to your prot node module: e.g. C:\Users\rafal\AppData\Roaming\npm\node_modules\protractor\built
c. Select built
