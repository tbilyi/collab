"use strict";
let SQL = require(DIR_ROOT + '/model/base/SQL/auth'),
    MySQL = require(DIR_ROOT + '/model/base/MySQL'),
    validator = require('validator'),
    logger = require('tracer').dailyfile({
        root:DIR_ROOT + '/log/request', maxLogFiles: 10
    }),
    console = require('tracer').console(),
    config = require(DIR_ROOT + '/config/config_min.json');

module.exports = class ModelUser {
    constructor(callRes){
        this.callRes = callRes;
        this.SQL = new SQL();
        this.MySQL = new MySQL();
    }
    register(email){
        logger.trace();
        let error = this.validate(email);
        
        if (error.length > 0){
            let resData = {
                success : 0,
                code : config.NOT_VALID_DATA,
                msg : error[0]
            }
            this.callRes(resData);
            return true;
        }
        let data = {
            
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

        email = validator.trim(email);

        if( !validator.isEmail(email) ){
            error.push(NOT_VALID_EMAIL);
        }

        return error;
    }

}
