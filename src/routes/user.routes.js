

const AuthBearer = require('hapi-auth-bearer-token');
const { 
    addUser, getAllUsers, getUserById, 
    updateUserById, deleteManage, restoreUserById , 
    getAllUsersAvailable, getUserByIdActual 
} = require('../controller/user.controller');
const { idValidate, permanentDeleteQuery, nameLastnameVaidate } = require('../validators/requests.validators')


module.exports = async server => {

    await server.register(AuthBearer)
    server.auth.strategy('simple', 'bearer-access-token', {
        allowQueryToken: true,              // optional, false by default
        validate: async (request, token, h) => {
            const isValid = token === process.env.TOKEN;
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
                auth: 'simple',
                validate: {
                    payload: nameLastnameVaidate
                }
            }
        },
        {
            method: 'POST',
            path: '/api/users/restore/{id}',
            handler: restoreUserById,
            options: {
                auth: 'simple',
                validate: {
                    params: idValidate
                }
            }
        },
        {
            method: 'GET',
            path: '/api/users',
            handler: getAllUsersAvailable
        },
        {
            method: 'GET',
            path: '/api/users/actual',
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
            method: 'GET',
            path: '/api/users/actual/{id}',
            handler: getUserByIdActual,
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
        },
        {
            method: 'DELETE',
            path: '/api/users/{id}/soft',
            handler: deleteManage,
            options: {
                validate: {
                    params: idValidate,
                    query: permanentDeleteQuery
                },
                auth: 'simple'
            }
        }      
    ]);
}
