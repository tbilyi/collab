"use strict";
let config = require(DIR_ROOT + '/config/config_min.json'),
    logger = require('tracer').dailyfile({
        root:DIR_ROOT + '/log/request', maxLogFiles: 10
    }),
    console = require('tracer').console(),
    validator = require(DIR_ROOT + '/services/validation/errors.js');


module.exports = class ServiceValidationProject {
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
    projectDelete(){
        if( !this.data ){
            this.error.push(config.EMPTY_DATA);
            return( this.returnErrors() );
        }
        this.data = this.validator.Trim(this.data);
        if( !this.validator.Number(this.data.id) ){
            this.error.push(config.NOT_VALID_DATA);
        }
        return( this.returnErrors() );
    }
    searchUser(){
        if( !this.data ){
            this.error.push(config.EMPTY_DATA);
            return( this.returnErrors() );
        }
        this.data = this.validator.Trim(this.data);
        return( this.returnErrors() );
    }
    projectAdd(){
        if( !this.data ){
            this.error.push(config.EMPTY_DATA);
            return( this.returnErrors() );
        }
        this.data = this.validator.Trim(this.data);
        if( !this.validator.Name(this.data.name) ){
            this.error.push(config.NAME_LENGTH_NOT_CORRECT);
        };
        ;
        if( !this.validator.Desc(this.data.desc) ){
            this.error.push(config.DESC_LENGTH_NOT_CORRECT);
        };
        if( !this.validator.Number(this.data.status) ){
            this.error.push(config.NOT_VALID_STATUS);
            this.error.push(config.STATUS_NOT_NUMBER);
        }
        if( !this.validator.Number(this.data.point) ){
            this.error.push(config.NOT_VALID_POINTS_LENGTH);
            this.error.push(config.POINTS_LENGTH_NOT_NUMBER);
        }
        if( !this.validator.Number(this.data.devPoint) ){
            this.error.push(config.NOT_VALID_DEV_POINTS_CAPACITY);
            this.error.push(config.DEV_POINTS_CAPACITY_NOT_NUMBER);
        }
        if( !this.validator.Date(this.data.startSprint) ){
            this.error.push(config.NOT_VALID_DATE);
        };
 /*       if( !this.validValue(this.data.colorProject) ){
            this.error.push(config.NOT_VALID_COLOR);
        }*/
        if( !this.validator.Number(this.data.sprint) ){
            this.error.push(config.NOT_VALID_SPRINT_LENGTH);
            this.error.push(config.SPRINT_LENGTH_NOT_NUMBER);
        }
        return( this.returnErrors() );
    }
    
    
    addPM(){
        if( !this.data ){
            this.error.push(config.EMPTY_DATA);
            return( this.returnErrors() );
        }
        console.log(this.data);
        this.data = this.validator.Trim(this.data);
        if( !this.validator.Email(this.data.email) ){
            this.error.push(config.NOT_VALID_EMAIL);
        }
        if( !this.validator.Number(this.data.projectId) ){
            this.error.push(config.NOT_VALID_PROJECT);
            this.error.push(config.PROJECT_ID_NOT_NUMBER);
        }
        return( this.returnErrors() );
    }
    
    checkUserProject(){
        if( !this.data ){
            this.error.push(config.EMPTY_DATA);
            return( this.returnErrors() );
        }
        this.data = this.validator.Trim(this.data);
        if( !this.validator.Email(this.data.email) ){
            this.error.push(config.NOT_VALID_EMAIL);
        }
        if( !this.validator.Number(this.data.projectId) ){
            this.error.push(config.NOT_VALID_PROJECT);
            this.error.push(config.PROJECT_ID_NOT_NUMBER);
        }
        return( this.returnErrors() );
    }

}