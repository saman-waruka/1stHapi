
const { UsersModel } = require('../model/user');

const addUser = (request, h) => {
    const userData = request.payload;
    console.log(userData)
    const user = new UsersModel(Object.assign({}, userData));
    user.save();
    return "user added :"+ user;
}

const getAllUsers = (request, h) => {
    const query = UsersModel.findAllActual();
    const result = query.exec();
    return result;
}

const getUserById = (request, h) => {
    const { id } = request.params;
    const query = UsersModel.findByID(id);
    const result = query.exec();
    return result;
} 

const getUserByIdActual = (request, h) => {
    const { id } = request.params;
    const query = UsersModel.findByIDActual(id);
    const result = query.exec();
    return result;
} 

const updateUserById = (request, h) => {
    const { id } = request.params;
    const userData = request.payload;
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

const deleteMongooseDelete = async (request, h) => {
        const { id} = request.params;
        const query = UsersModel.findByID(id);
        const _user = await query.exec();
        if(_user[0]) {
            const user = new UsersModel(_user[0]);
            const result = user.delete();
            return result;
        }
        return [];
} 

const getAllUsersAvailable = (request, h) => {
    const query = UsersModel.findAll();
    const result = query.exec();
    return result;
}

const deleteManage = (request, h) => {
    console.log(request.query)
    const isPermanentDelete = String(request.query.permanent).toLowerCase()=== 'true';
    console.log(isPermanentDelete)
    if(isPermanentDelete) {
        return deleteUserById(request, h);
    } else {
        // return softDeleteUserById(request, h);
        return deleteMongooseDelete(request, h);
    }
}

const restoreUserById = async (request, h) => {
    const { id } = request.params;
    const query = UsersModel.findByIDActual(id);
    const _user = await query.exec();
    if(_user[0]) {
        const user = new UsersModel(_user[0]);
        const result = user.restore();
        return result;
    }
    return [];
}

module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteManage,
    restoreUserById,
    getAllUsersAvailable,
    getUserByIdActual
}