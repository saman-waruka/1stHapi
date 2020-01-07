

const AuthBearer = require('hapi-auth-bearer-token');
const { addUser, getAllUsers, getUserById, updateUserById, deleteManage, restoreUserById } = require('../controller/user.controller');
const { idValidate, permanentDeleteQuery } = require('../validators/requests.validators')


module.exports = async server => {

    await server.register(AuthBearer)
    server.auth.strategy('simple', 'bearer-access-token', {
        allowQueryToken: true,              // optional, false by default
        validate: async (request, token, h) => {
            const isValid = token === '20scoops';
            const credentials = { token };
            const artifacts = { test: 'info' };
            return { isValid, credentials, artifacts };
        }
    });
    server.route([
        {
            method: 'POST',
            path: '/api/users',
            handler: addUser,
            options: {
                auth: 'simple'
            }
        },
        {
            method: 'GET',
            path: '/api/users',
            handler: getAllUsers
        },
        {
            method: 'GET',
            path: '/api/users/{id}',
            handler: getUserById,
            options: {
                validate: {
                    params: idValidate
                }
            }
        },
        {
            method: 'PUT',
            path: '/api/users/{id}',
            handler: updateUserById,
            options: {
                validate: {
                    params: idValidate
                },
                auth: 'simple'
            }
        },
        {
            method: 'DELETE',
            path: '/api/users/{id}',
            handler: deleteManage,
            options: {
                validate: {
                    params: idValidate,
                    query: permanentDeleteQuery
                },
                auth: 'simple'
            }
        } ,
        {
            method: 'POST',
            path: '/api/users/{id}/restore',
            handler: restoreUserById,
            options: {
                validate: {
                    params: idValidate
                },
                auth: 'simple'
            }
        }      
    ]);
}
