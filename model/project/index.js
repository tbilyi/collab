"use strict";

let SQL = require(DIR_ROOT + '/services/SQL/project'),
    MySQL = require(DIR_ROOT + '/services/MySQL'),
    validation = require(DIR_ROOT + '/services/validation/project.js'),
    logger = require('tracer').dailyfile({
        root:DIR_ROOT + '/log/request', maxLogFiles: 10
    }),
    console = require('tracer').console(),
    config = require(DIR_ROOT + '/config/config_min.json');

module.exports = class ModelProject {
    constructor(){
        this.SQL = new SQL();
        this.MySQL = new MySQL();
    }
    add(data ,userId, callRes){
        let validate = new validation(data);
        let resData = validate.projectAdd();
        if( 0 === (resData || {}).success ){
            callRes(resData);
            return true;
        } else {
            data = resData;
        }
        let query = this.SQL.check(data.name, userId);
        this.MySQL.select(query, (resData) => {
            if(1 === resData.success){
                resData.success = 0;
                resData.msg = ( data.name + config.PROJECT_EXIST );
                resData.code = config.INVDATA;
                callRes(resData);
            } else {
                this.save(data ,userId, callRes);
            }
            return true;
        });
      
    }
    save(data ,userId, callRes){
        let query = this.SQL.add(data, userId);
        this.MySQL.insert(query, (resData) => {
            callRes(resData);
        });
        return true;
    }
    edit(data ,userId, callRes){
        let validate = new validation(data);
        let resData = validate.projectAdd();
        if( 0 === (resData || {}).success ){
            callRes(resData);
            return true;
        } else {
            data = resData;
        }
        let query = this.SQL.edit(data, userId);
        this.MySQL.update(query, (resData) => {
            callRes(resData);
        });
        return true;
    }
    delete(data, callRes){
        let validate = new validation(data);
        let resData = validate.projectDelete();
        if( 0 === (resData || {}).success ){
            callRes(resData);
            return true;
        } else {
            data = resData;
        }
        let query = this.SQL.delete(data.id);
        this.MySQL.delete(query, (resData) => {
            callRes(resData);
        });
        return true;
    }
    listAll(userId, callRes){
        logger.trace();
        let query = this.SQL.listAll(userId);

        this.MySQL.select(query, (resData) => {
            callRes(resData);
        });
        return true;
    }

    list(data, callRes){
        logger.trace();
        let query = this.SQL.list(data.userId, data.projectId);
        this.MySQL.select(query, (resData) => {
            if(result.success){
                resData.data = result.data[0]
            } else {
                resData.code = config.EMPTY_DATA;
            }
            callRes(resData);
        });
        return true;
    }
    searchUser(data, callRes){
        let validate = new validation(data);
        let resData = validate.searchUser();
        if( 0 === (resData || {}).success ){
            callRes(resData);
            return true;
        } else {
            data = resData;
        }
        let query = this.SQL.searchUser(data.email);
        this.MySQL.select(query, (resData) => {
            callRes(resData);
        });
        return true;
    }
    getUserProject(data, callRes){
        let query = this.SQL.getUserProject(data);
        this.MySQL.select(query, (resData) => {
            callRes(resData);
        });
    }
    checkUserProject(data, callRes){
        let validate = new validation(data);
        let resData = validate.checkUserProject();
        if( 0 === (resData || {}).success ){
            callRes(resData);
            return true;
        }
        data.userLogin = data.email.replace(/\@.*/, '');
        let query = this.SQL.checkUser(data);
        this.MySQL.select(query, (resData) => {
            if(1 === resData.success){
                data.userId = resData.data[0].id;
                data.userExist = 1;
                this.checkIsAssigned(data, callRes); 
            } else {
                this.createUser(data, callRes);
            }
        });
    }
    
    createUser(data, callRes){
        let query = this.SQL.addUser(data);
        this.MySQL.insert(query, (resData) => {
            if(resData.success){
                    data.userId = resData.insertId;
                    data.userExist = 0;
                    this.assignUser(data, callRes);
                } else {
                    resData.success = 0;
                    callRes(resData);
                }
                return true;
        });
        return true;
    }
    
    checkIsAssigned(data, callRes){
        let query = this.SQL.checkUserProject(data);
        this.MySQL.select(query, (resData) => {
            if(1 === resData.success){
                resData.success = 0;
                resData.msg = config.USER_ALREADY_ASSIGNED;
                resData.code = config.INVDATA;
                callRes(resData);
            } else {
                this.assignUser(data, callRes);
            }
            return true;
        });
        return true;
    }
    assignUser(data, callRes){
        let query = this.SQL.assignUser(data);
        this.MySQL.insert(query, (resData) => {
            if(resData.success){
                if(1 === data.userExist){
                    resData.msg = config.USER_ASSIGNED;
                } else {
                    resData.msg = config.USER_CREATED_ASSIGNED;
                }
                callRes(resData);
            } else {
                resData.success = 0;
                callRes(resData);
            }
            return true;
        });
        return true;
    }

}


