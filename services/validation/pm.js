"use strict";
let config = require(DIR_ROOT + '/config/config_min.json'),
    logger = require('tracer').dailyfile({
        root:DIR_ROOT + '/log/request', maxLogFiles: 10
    }),
    console = require('tracer').console(),
    validator = require(DIR_ROOT + '/services/validation/errors.js');


module.exports = class ServiceValidationPM {
    constructor(data){
        this.data = data;
        this.validator = new validator();
        this.error = [];
    }

    returnErrors(){
        if(this.error.length > 0){
            let resData = {
                success : 0,
                code : config.INVALID_DATA,
                msg : this.error[0],
                data : this.error
            }
            return resData;
        }
        return this.data;
    }


}