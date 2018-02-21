"use strict";
let config = require(DIR_ROOT + '/config/config_min.json')

module.exports = class ModelAuth {
    constructor(){
    }

    isRegistred(req, callRes){
        let authStatus = {
            success : 0
        }
        if( req.session.auth && req.cookies.auth && 
          (req.cookies.auth === req.session.auth) ){
            authStatus.success = 1;
        } else {
            authStatus.msg = config.USER_NOT_AUTHORIZED;
            authStatus.code = config.INVALID_AUTH;
        }
        callRes(authStatus);
        return true;
    }

}