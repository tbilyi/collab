"use strict";

module.exports = class AuthSQL {
    constructor(){
    }
    login(data){
        let query = {
            body: `
                SELECT id,email,login,avatar,reg_date,last_name 
                FROM user 
                WHERE (login=? OR email=?) 
                AND password=?
            `,
            values: [  data[0], data[0], data[1] ]
        };
        return query;
    }
    regLogin(email){
        let query = {
            body: `
                SELECT id,email,login,avatar,reg_date,last_name 
                FROM user 
                WHERE email=?
            `,
            values: [ email ]
        };
        return query;
    }
    addUser(data){
        let query = {
            body: `INSERT INTO user SET ?`,
            values: [{
                email : data.emailSignUp,
                login : data.userLogin, 
                password: data.passwordSignUp, 
                active: 1
            }]
        };
        return query;
    }
    checkUser(data){
        let query = {
            body: `SELECT id FROM user WHERE login=? OR email=?`,
            values: [  data.userLogin, data.emailSignUp ]
        };
        return query;
    }

}




