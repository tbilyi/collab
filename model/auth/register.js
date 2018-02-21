"use strict";
let SQL = require(DIR_ROOT + '/services/SQL/auth'),
    MySQL = require(DIR_ROOT + '/services/MySQL'),
    validator = require('validator'),
    logger = require('tracer').dailyfile({
        root:DIR_ROOT + '/log/request', maxLogFiles: 10
    }),
    console = require('tracer').console(),
    config = require(DIR_ROOT + '/config/config_min.json');

module.exports = class ModelAuthRegister {
    constructor(callRes){
        this.callRes = callRes;
        this.SQL = new SQL();
        this.MySQL = new MySQL();
    }
    register(data){
        logger.trace();
        let error = this.validate(data);
        
        if (error.length > 0){
            let resData = {
                success : 0,
                code : config.NOT_VALID_DATA,
                msg : error[0]
            }
            this.callRes(resData);
            return true;
        }
        
        data.userLogin = data.emailSignUp.replace(/\@.*/, '');
        let query = this.SQL.checkUser(data);

        this.MySQL.select(query, (resData) => {
            if(resData.success){
                resData.success = 0;
                resData.msg = config.ERROR_LOGIN_EXIST;
                this.callRes(resData)
            } else {
                this.addUser(data);
            }
            return true;
        });
        return true;
    }

    addUser(data){
        let query = this.SQL.addUser(data);
        this.MySQL.insert(query, (resData) => {
            if(resData.success){
                this.regLogin(data.emailSignUp);
                } else {
                    resData.success = 0;
                    this.callRes(result);
                }
                return true;
        });
        return true;
    }

    regLogin(email){
        let query = this.SQL.regLogin(email);
        this.MySQL.select(query, (resData) => {
            if(resData.success){
                resData.data = resData.data[0]
            } else {
                resData.success = 0;
            }
            this.callRes(resData);
            return true;
        });
        return true;
    }

    validate(data){

        let error = [];

        for (let val in data){
            data.val = validator.trim(data[val]);
        }

        if( !validator.isEmail(data.emailSignUp) ){
            error.push(NOT_VALID_EMAIL);
        }

        if ( data.emailSignUp != data.confirmEmailSignUp ){
            error.push(EMAIL_NOT_CONFIRMED);
        }

        let options = {
            min:6,
            max: 64
        }
        if ( !validator.isLength(data.passwordSignUp, options) ){
            error.push(PASSWORD_LENGTH_NOT_CORRECT);
        }

        if ( data.passwordSignUp != data.confirmPasswordSignUp ) {
            error.push(PASSWORD_NOT_CONFIRMED);
        }
        return error;
    }

}
