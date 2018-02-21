"use strict";

module.exports = class ProjectSQL {
    constructor(){
    }

    add(data, userId){
        let query = {
            body: `INSERT INTO project SET ?`,
            values: [{
                name : data.name,
                description: data.desc,
                status: data.status,
//                sprint: data.sprint,
                point_length: data.point,
                developer_points_capacity: data.devPoint,
                start_sprint: data.startSprint,
                color : data.colorProject,               
                sprint_length: data.sprint,
                user_id: userId
            }]
        };
        return query;
    }
    edit(data, userId){
        let query = {
            body: `UPDATE project SET ? WHERE id = ?`,
            values: [{
                name : data.name,
                description: data.desc,
                status: data.status,
//                sprint: data.sprint,
                point_length: data.point,
                developer_points_capacity: data.devPoint,
                start_sprint: data.startSprint,
                color : data.colorProject,               
                sprint_length: data.sprint,
                user_id: userId
            }, data.id]
        };
        return query;
    }
    delete(userId){
        let query = {
            body: `DELETE FROM project WHERE id = ?`,
            values: [userId]
        };
        return query;
    }
    searchUser(email){
        let query = {
             body: `
                SELECT id, email
                FROM user 
                WHERE email Like ?
                `,
            values: [  email+"%" ]
        };
        return query;
    }
    getUserProject(data){
        let query = {
             body: `
                SELECT a.id, a.email, a.login
                FROM user a, user_project_role b
                WHERE role_id = ?
                AND project_id = ?
                AND a.id = b.user_id
                `,
            values: [  data.roleId, data.projectId ]
        };      
        return query;
    }
    check(name, userId){
        let query = {
            body: `
                SELECT id
                FROM project 
                WHERE user_id=?
                AND name=?
                `,
            values: [ userId, name ]
        };
        return query;
    }
    listAll(userId){
        let query = {
            body: `
                SELECT id,name,color,sprint_length,sprint,description,
                status,start_sprint,developer_points_capacity,point_length
                FROM project 
                WHERE user_id=? 
                `,
            values: [  userId ]
        };
        return query;
    }
    list(userId, projectId){
        let query = {
            body: `
                SELECT id,name,color,sprint_length,sprint,description,
                status,start_sprint,developer_points_capacity,point_length
                FROM project 
                WHERE user_id=?
                AND id=?
                `,
            values: [ userId, projectId ]
        };
        return query;
    }
    checkUser(data){
        let query = {
            body: `SELECT id FROM user WHERE login=? OR email=?`,
            values: [  data.userLogin, data.email ]
        };
        return query;
    }
    
    checkUserProject(data){
        let query = {
            body: `SELECT id FROM user_project_role WHERE user_id=? AND
                     role_id=? AND project_id=?`,
            values: [  data.userId, data.roleId, data.projectId ]
        };
        return query;
    }
    
    assignUser(data){
        let query = {
            body: `INSERT INTO user_project_role SET ?`,
            values: [{
                user_id : data.userId,
                role_id : data.roleId,
                project_id : data.projectId
            }]
        };
        return query;
    }

     addUser(data){
        let query = {
            body: `INSERT INTO user SET ?`,
            values: [{
                email : data.email,
                login : data.userLogin,
                password: "dGVzdA==", 
                active: 1
            }]
        };
        return query;
    }

}





