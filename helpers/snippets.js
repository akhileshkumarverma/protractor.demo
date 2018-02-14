/**
 * Created by rafal on 2017-05-31.
 */

// change input value - jquery
browser.executeScript("$('#id input').prop(\"value\",\" " + value + "\")");
browser.executeScript("$('#id input').trigger('change')");
