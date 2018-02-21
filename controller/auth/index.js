"use strict";
let modelAuthLogin = require(DIR_ROOT + '/model/auth/login'),
    modelAuthRegister = require(DIR_ROOT + '/model/auth/register'),
    logger = require('tracer').dailyfile({
        root:DIR_ROOT + '/log/request', maxLogFiles: 10
    }),
    console = require('tracer').console(),
    config = require(DIR_ROOT + '/config/config_min.json');

module.exports = class ControllerAuth {

    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    checkUser(){
        logger.trace();
        let resData = {};
        if( this.req.session.auth && this.req.cookies.auth && 
          (this.req.cookies.auth === this.req.session.auth) ){
            resData.success = 1;
        } else {
            resData.success = 0;
        }
        this.res.send(resData);
        return true;
    }

    login(){
        logger.trace();

        let model = new modelAuthLogin(( resData ) => {
            if(resData.success){
                let crypto = require('crypto');
                let base64url = require('base64-url');
                let hash = base64url.encode(crypto.randomBytes(64));

                this.req.session.auth = hash;
                this.req.session.userInfo = resData.data;
                this.res.cookie('userInfo', JSON.stringify(resData.data), { 
                    maxAge: 86400000 
                });
                this.res.cookie('auth', hash, {
                    maxAge: 86400000, httpOnly: true 
                });
            }
            this.res.send( resData );
            return true;
        });
        model.login(this.req.headers.auth);
        return true;
    }

    logout(){
        this.req.session.destroy();
        this.res.cookie('userInfo', '', { maxAge: 0});
        this.res.cookie('auth', '', { maxAge: 0});
        this.res.cookie('sid', '', { maxAge: 0});
        this.res.clearCookie('userInfo');
        this.res.clearCookie('auth');
        this.res.clearCookie('sid');
        let resData = {
            success : 1,
            msg : config.LOGOUT_SUCCESS
        }
        this.res.send( resData );
        return true;
    }

    register(){
        logger.trace();
        let data = {
            'emailSignUp' : this.req.body.emailSignUp,
            'confirmEmailSignUp' : this.req.body.confirmEmailSignUp,
            'passwordSignUp' : this.req.body.passwordSignUp,
            'confirmPasswordSignUp' : this.req.body.confirmPasswordSignUp
        };

        let model = new modelAuthRegister(( resData ) => {
            if(resData.success){
                let crypto = require('crypto');
                let base64url = require('base64-url');
                let hash = base64url.encode(crypto.randomBytes(64));

                this.req.session.auth = hash;
                this.req.session.userInfo = resData.data;

                this.res.cookie('userInfo', resData.data, { 
                    maxAge: 86400000, httpOnly: true 
                });
                this.res.cookie('auth', hash, { 
                    maxAge: 86400000, httpOnly: true 
                });
            }
            this.res.send( resData );
            return true;
        });
        model.register(data);
        return true;
    }

}


