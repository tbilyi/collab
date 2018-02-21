"use strict";
let config = require(DIR_ROOT + '/config/config_min.json'),
    logger = require('tracer').dailyfile({
        root:DIR_ROOT + '/log/request', maxLogFiles: 10
    }),
    console = require('tracer').console();

let modelProject = require(DIR_ROOT + '/model/project'),
    modelAuth = require(DIR_ROOT + '/model/auth');

module.exports = class ControllerProject {

    constructor(req, res, func){
        this.req = req;
        this.res = res;
        if( this.isRegistred() ){
            this.model = new modelProject();
            this[func]();
        };
    }

    add(){
        this.model.add(
            this.req.body, this.req.session.userInfo.id,
            (resData) =>{
                this.res.send(resData);
            }
        );
        return true;
    }
    edit(){
        this.model.edit(
            this.req.body, this.req.session.userInfo.id,
            (resData) =>{
                this.res.send(resData);
            }
        );
        return true;
    }
    delete(){
        let data = {
            id: this.req.body.id
        };
        this.model.delete(data, (resData) =>{
            this.res.send(resData);
        });
        return true;
    }
    listAll(){
        let userId = this.req.session.userInfo.id;
        this.model.listAll(userId, (resData) =>{
            this.res.send(resData);
        });
        return true;
    }

    list(){
        let data = {
            userId: this.req.session.userInfo.id,
            projectId: this.req.query.id
        };
        this.model.list(data, (resData) =>{
            this.res.send(resData);
        });
        return true;
    }
    searchUser(){
        let data = {
            email: this.req.query.email
        };

        this.model.searchUser(data, (resData) =>{
            this.res.send(resData);
        });
        return true;
    }
/*    addPM(){
        let data = {
            email: this.req.body.email,
            projectId: this.req.body.projectId,
            roleId: config.ROLE_PM
        };
        this.model.addPM(data, (resData) =>{
            this.res.send(resData);
        });
        return true;
    } */
    getPM(){
        let data = {
            projectId: this.req.query.projectId,
            roleId: config.ROLE_PM
        };
        this.model.getUserProject(data, (resData) =>{
            this.res.send(resData);
        });
        return true;
    }
    getSuperv(){
        let data = {
            projectId: this.req.query.projectId,
            roleId: config.ROLE_SUPERV
        };
        this.model.getUserProject(data, (resData) =>{
            this.res.send(resData);
        });
        return true;
    }
    getDev(){
        let data = {
            projectId: this.req.query.projectId,
            roleId: config.ROLE_DEV
        };
        this.model.getUserProject(data, (resData) =>{
            this.res.send(resData);
        });
        return true;
    }
    assignPM(){
        let data = {
            email: this.req.body.email,
            projectId: this.req.body.projectId,
            roleId: config.ROLE_PM
        };
        this.model.checkUserProject(data, (resData) =>{
            this.res.send(resData);
        });
        return true;
    }
    assignSuperv(){
        let data = {
            email: this.req.body.email,
            projectId: this.req.body.projectId,
            roleId: config.ROLE_SUPERV
        };
        this.model.checkUserProject(data, (resData) =>{
            this.res.send(resData);
        });
        return true;
    }
    assignDev(){
        let data = {
            email: this.req.body.email,
            projectId: this.req.body.projectId,
            roleId: config.ROLE_DEV
        };
        this.model.checkUserProject(data, (resData) =>{
            this.res.send(resData);
        });
        return true;
    }

    isRegistred(){
        logger.trace();
        let model = new modelAuth();
        model.isRegistred(this.req, (authStatus) => {
            if( 0 === authStatus.success ){
                this.res.send( authStatus );
                return false;
            }
        });
        return true;
    }

}
