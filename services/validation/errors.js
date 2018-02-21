"use strict";

let config = require(DIR_ROOT + '/config/config_min.json'),
    logger = require('tracer').dailyfile({
        root:DIR_ROOT + '/log/request', maxLogFiles: 10
    }),
    console = require('tracer').console(),
    validator = require('validator');

module.exports = class ServiceValidationErrors {
    constructor(){

    }

    Trim(data){
        for (let val in data){
            if( !validator.isNumeric(val) ){
                continue;
            }
            data[val] = validator.trim(data[val]);
        }
        return data;
    }
    Numeric(str){
        if(!str || !validator.isNumeric(str) ){
            this.error.push(config.NOT_VALID_NUMBER);
        }
        return true;
    }
    Number(str){
        if(!str ||  !validator.isNumeric(str) ){
            return false;
        }
        return true;
    }
    Date(str){
        if(!str ||  !validator.isDate(str) ){
            return false;
        }
        return true;
    }
    Email(str){
        if(!str || !validator.isEmail(str) ){
            return false;
        }
        return true;
    }

    ConfirmEmail(){
        if (!this.data.emailSignUp || !this.data.confirmEmailSignUp ||
                 (this.data.emailSignUp != this.data.confirmEmailSignUp) ){
            this.error.push(config.EMAIL_NOT_CONFIRMED);
        }
        return true;
    }

    Password(){
        let options = {
            min:6,
            max: 64
        }
        if (!this.data.passwordSignUp || !validator.isLength(this.data.passwordSignUp, options) ){
            this.error.push(config.PASSWORD_LENGTH_NOT_CORRECT);
        }
        return true;
    }

    Name(name){
        let options = {
            min:3,
            max: 64
        }
        if (!name || !validator.isLength(name, options) ){
            return false;
        }
        return true;
    }

    Value(str){
        let options = {
            min:1,
            max: 128
        }
        if (!this.str || !validator.isLength(str, options) ){
            return false;
        }
        return true;
    }

    Desc(desc){
        let options = {
            min:3,
            max: 128
        }
        if (!desc || !validator.isLength(desc, options) ){
            return false;
        }
        return true;
    }

    ConfirmPassword(){
        if ( this.data.passwordSignUp != this.data.confirmPasswordSignUp ) {
            this.error.push(config.PASSWORD_NOT_CONFIRMED);
        }
        return true;
    }

}