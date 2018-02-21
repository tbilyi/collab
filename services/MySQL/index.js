"use strict";

let mysql = require('mysql'),
    settings = require(DIR_ROOT + '/config/settings.json'),
    config = require(DIR_ROOT + '/config/config_min.json'),
    logger = require('tracer').dailyfile({
        root:DIR_ROOT + '/log/query', maxLogFiles: 10
    }),
    console = require('tracer').console();

module.exports = class MySQL {

    constructor(){
    }

    connection(){
        let baseConnection;
        if('local' == ENV){
            baseConnection = mysql.createConnection(settings.bd_localhost);
        } else {
            baseConnection = mysql.createConnection(settings.bd);
        }
        baseConnection.connect(function(err) {
            if(err){
                console.log('get connection err: ' + err);
            }
        });
        baseConnection.on('error', function(err) {
            console.log(err.code); // 'ER_BAD_DB_ERROR'
        });
        return baseConnection;
    }

    select(query, callRes){
        logger.log( query );

        let connection = this.connection(),
            resData = {};
        connection.query( query.body, query.values, ( err, rows ) => {
            
            if( err ){
                console.log( err );
                resData = {
                    success : 0,
                    code : err.code
                }
                connection.end();
                callRes(resData);
                return true;
            }

            if ( rows.length > 0 ){
                resData = {
                    success : 1,
                    data : rows
                }
            } else {
                resData = {
                    success : 0,
                    code : config.EMPTY_DATA
                }
            }

            callRes( resData );
            connection.end();
            return true;
        });
    }

    insert(query, callRes){
        logger.log(query);
        let connection = this.connection(),
            result = {};
        connection.query( query.body, query.values, (err, rows) => {
            if ( !err ){
                result = {
                    success: 1,
                    insertId: rows.insertId,
                    msg: config.DATA_INSERT_SUCCESS
                };
            } else {
                result = {
                    success: 0,
                    code: err
                };
            }
            connection.end();
            callRes(result);
        });
    }

    update(query, callRes){
        logger.log(query);
        let connection = this.connection(),
            result = {};
        connection.query( query.body, query.values, (err, rows) => {
            if ( !err ){
                result = {
                    success: 1,
                    msg: config.DATA_INSERT_SUCCESS
                };
            } else {
                result = {
                    success: 0,
                    error: err
                };
            }
            connection.end();
            callRes(result);
        });
    }
    delete(query, callRes){
        logger.log(query);
        let connection = this.connection(),
            result = {};
        connection.query( query.body, query.values, (err, rows) => {
            if ( !err ){
                result = {
                    success: 1,
                    msg: config.DATA_DELETE_SUCCESS
                };
            } else {
                result = {
                    success: 0,
                    error: err
                };
            }
            connection.end();
            callRes(result);
        });
    }

}

