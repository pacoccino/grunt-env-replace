var Helper = require('../tasks/lib/helper');
var expect = require("chai").expect;

describe("Helpers", function() {

    it("getEnvUrl dev", function() {

        var url = Helper.getEnvUrl('a'+Helper.REG+'-b', Helper.ENV.DEV);

        expect(url).to.equal('a-dev-b');
    });

    it("getEnvUrl prod", function() {

        var url = Helper.getEnvUrl('a'+Helper.REG+'-b', Helper.ENV.PROD);

        expect(url).to.equal('a-b');
    });

    it("getEnvUrl preprod", function() {

        var url = Helper.getEnvUrl('a'+Helper.REG+'-b', Helper.ENV.PROD);

        expect(url).to.equal('a-b');
    });


    it("getRegex prod", function() {
        var reg = Helper.getRegex('a'+Helper.REG+'-b');
        expect(reg.toString()).to.equal("/a.{0,8}-b/g");
    });

});