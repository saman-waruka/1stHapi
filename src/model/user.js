const mongoose = require('mongoose') ;
var mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  profile: {type: Object}
},{
  timestamps: true
});

UserSchema.plugin(mongoose_delete);
// Do not use arrow syntax here - Prevents binding of this, so this would not refer to 
UserSchema.methods.adduser = function (user) {
  return this.save();
};

UserSchema.statics.findAll = function () {
    return this.find({ deleted: false});
  };

UserSchema.statics.findAllActual = function () {
  return this.find({});
};

UserSchema.statics.findByID = function(id) {
  return this.find({ _id: id, deleted: false});
};
UserSchema.statics.findByIDActual = function(id) {
  return this.find({ _id: id});
};

UserSchema.query.byName = function(name) {
  return this.find({ name: name });
}

UserSchema.query.update = function(id,newData) {
    const query = { _id : id};
    return this.updateOne(query, newData);
}

UserSchema.statics.deleteById = function(id) {
  const query = { _id : id};
  return this.findOneAndDelete(query);
}

const UsersModel = mongoose.model('UsersModel', UserSchema);

module.exports = {
    UsersModel: UsersModel
}