
const { addUser, getAllUsers, getUserById, updateUser } = require('../controller/user.controller');

module.exports = server => {
    server.route([
        {
            method: 'post',
            path: '/api/users',
            handler: addUser
        },
        {
            method: 'GET',
            path: '/api/users',
            handler: getAllUsers
        },
        {
            method: 'GET',
            path: '/api/users/{id}',
            handler: getUserById
        },
        {
            method: 'PUT',
            path: '/api/users/{id}',
            handler: updateUser
        }
        
    ]);
}
