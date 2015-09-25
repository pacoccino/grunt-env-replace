var Helper = {};

Helper.ENV = {
    DEV: 0,
    PREPROD: 1,
    PROD: 2,
    SPRINT: 11
};

Helper.REG = "####";

Helper.APIUrl = 'api'+Helper.REG+'.domain.com';
Helper.StaticUrl = '//static'+Helper.REG+'.domain.com';

Helper.getEnvUrl = function(url, env) {

    var replacer = "";
    switch(env) {
        case Helper.ENV.DEV:
            replacer = "-dev";
            break;

        case Helper.ENV.PREPROD:
            replacer = "-preprod";
            break;

        case Helper.ENV.SPRINT:
            replacer = "-sprint";
            break;

        case Helper.ENV.PROD:
            replacer = "";
            break;
    }

    return url.replace(Helper.REG, replacer);
};

Helper.getRegex = function(url) {

    var regString = url.replace(Helper.REG, ".{0,8}");
    return new RegExp(regString, 'g');
};


module.exports = Helper;