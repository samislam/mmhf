/*=============================================
=            importing dependencies            =
=============================================*/
const mongoose = require('mongoose')

/*=====  End of importing dependencies  ======*/

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a user must have a name'],
  },
  password: String,
})

const UserModel = mongoose.model('User', userSchema, 'users')

/*----------  end of code, exporting  ----------*/
module.exports = {
  userSchema,
  UserModel,
}
