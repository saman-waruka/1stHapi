
const { UsersModel } = require('../model/user');

const addUser = (request, h) => {
    const _user = request.payload;
    const user = new UsersModel(Object.assign({}, _user));
    user.save();
    return "added";
}

const getAllUsers = (request, h) => {
    const query = UsersModel.find();
    const result = query.exec();
    return result;
}

const getUserById = (request, h) => {
    const { id } = request.params;
    const query = UsersModel.findByID(id);
    const result = query.exec();
    return result;
} 
const updateUser = (request, h) => {
    const { id, newData } = request.params;
    const query = UsersModel.update(id,newData);
    const result = query.exec();
    return result;
}
module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    updateUser
}