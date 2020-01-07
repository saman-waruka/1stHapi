
const { UsersModel } = require('../model/user');

const addUser = (request, h) => {
    const _user = request.payload;
    console.log(_user)
    const user = new UsersModel(Object.assign({}, _user));
    user.save();
    return "user added :"+ user;
}

const getAllUsers = (request, h) => {
    const query = UsersModel.findAll();
    const result = query.exec();
    return result;
}

const getUserById = (request, h) => {
    const { id } = request.params;
    const query = UsersModel.findByID(id);
    const result = query.exec();
    return result;
} 
const updateUserById = (request, h) => {
    const { id } = request.params;
    const userData = {
        name: request.payload.name,
        last_name: request.payload.last_name,
      };
    const query = UsersModel.update(id,userData);
    const result = query.exec();
    return result;
}

const deleteUserById = (request, h) => {
    const { id} = request.params;
    const query = UsersModel.deleteById(id);
    const result = query.exec();
    return result;
}

const softDeleteUserById = (request, h) => {
    const { id} = request.params;
    const query = UsersModel.softDeleteById(id);
    const result = query.exec();
    return result;
}

const deleteManage = (request, h) => {
    console.log(request.query)
    const isPermanentDelete = String(request.query.permanent).toLowerCase()=== 'true' ;
    console.log(isPermanentDelete)
    if(isPermanentDelete) {
        return deleteUserById(request, h);
    } else {
        return softDeleteUserById(request, h);
    }

}

const restoreUserById = (request, h) => {
    const { id} = request.params;
    const query = UsersModel.restoreById(id);
    const result = query.exec();
    return result;
}

module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteManage,
    restoreUserById
}