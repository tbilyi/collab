"use strict";

let SQL = require(DIR_ROOT + '/services/SQL/auth'),
    MySQL = require(DIR_ROOT + '/services/MySQL'),
    validator = require('validator'),
    logger = require('tracer').dailyfile({
        root:DIR_ROOT + '/log/request', maxLogFiles: 10
    }),
    console = require('tracer').console(),
    config = require(DIR_ROOT + '/config/config_min.json');

module.exports = class ModelAuthLogin {
    constructor(callRes){
        this.callRes = callRes;
        this.SQL = new SQL();
        this.MySQL = new MySQL();
    }
    login(dataBase64){
        logger.trace();
        let error = this.validate(dataBase64);
        let data = []
        if (error.length > 0){
            let resData = {
                success: 0,
                code: INVALID_DATA,
                msg : error[0]
            }
            this.callRes(resData)
            return true;
        } else {
            let encodedData = ( 
                new Buffer(dataBase64, 'base64').toString('ascii') 
            );
            data = encodedData.split(':');
        }

        let query = this.SQL.login(data);

            this.MySQL.select(query, ( resData ) =>{
                if(resData.success){
                    resData.data = resData.data[0];
                } else {
                    resData.msg = config.USER_NOT_EXIST,
                    resData.code = config.EMPTY_DATA;
                }
                this.callRes(resData);
                return true;
            });
        return true;
    }
    
    validate(data){

        let error = [];
        if ( !validator.isBase64(data)){
            error.push(NOT_VALID_DATA);
        }

        return error;
    }
}