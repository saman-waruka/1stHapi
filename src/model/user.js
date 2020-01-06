const mongoose = require('mongoose') ;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: { type: Number, required: true},
  name: { type: String, required: true },
  last_name: { type: String, required: true }

});

// Do not use arrow syntax here - Prevents binding of this, so this would not refer to 
UserSchema.methods.adduser = function (user) {
  
  return this.save();
};

UserSchema.methods.findAll = function (user) {
  
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
    return this.findOneAndUpdate(query, newData);
  }

const UsersModel = mongoose.model('UsersModel', UserSchema);

module.exports = {
    UsersModel: UsersModel
}