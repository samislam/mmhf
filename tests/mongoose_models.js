/*=============================================
=            importing dependencies            =
=============================================*/
const mongoose = require('mongoose')

/*=====  End of importing dependencies  ======*/

const loginAttempt = new mongoose.Schema({
  ip: {
    type: String,
    required: [true, 'a login attempt must have an IP address'],
  },
})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a user must have a name'],
  },
  loginAttempts: [loginAttempt],
  permissions: {
    nestedName: String,
    loginAttempts: Array,
  },
  subscribers: [{ email: String, name: String }],
})

const UserModel = mongoose.model('User', userSchema, 'users')

/*----------  end of code, exporting  ----------*/
module.exports = {
  userSchema,
  UserModel,
}
