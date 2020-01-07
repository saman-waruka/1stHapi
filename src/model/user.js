const mongoose = require('mongoose') ;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: { type: Number, required: true},
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  soft_delete: { type: Boolean,default: false  }
});

// Do not use arrow syntax here - Prevents binding of this, so this would not refer to 
UserSchema.methods.adduser = function (user) {
  return this.save();
};

UserSchema.statics.findAll = function () {
    return this.find({});
  };

UserSchema.statics.findByID = function(id) {
  return this.find({ id: id});
};

UserSchema.query.byName = function(name) {
  return this.find({ name: name });
}

UserSchema.query.update = function(id,newData) {
    const query = { id : id};
    return this.updateOne(query, newData);
}

UserSchema.statics.deleteById = function(id) {
  const query = { id : id};
  return this.findOneAndDelete(query);
}

UserSchema.statics.softDeleteById = function(id) {
  const query = { id : id};
  const softD = {soft_delete: true}
  return this.findOneAndUpdate(query, softD);
}

UserSchema.query.restoreById = function(id) {
  const query = { id : id};
  const softD = {soft_delete: false}
  return this.findOneAndUpdate(query, softD);
}

const UsersModel = mongoose.model('UsersModel', UserSchema);

module.exports = {
    UsersModel: UsersModel
}