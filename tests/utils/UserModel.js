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
  age: Number,
  loginAttempts: [loginAttempt],
  permissions: {
    nestedName: String,
    loginAttempts: Array,
  },
  subscribers: [{ email: String, name: String }],
})

userSchema.pre(/^find/, function (next) {
  console.log('pre find hook of schema ran!')
  const query = this
  query.findOne({ _archived: { $exists: false } }, null, { strictQuery: false })
  next()
})

userSchema.post(/^find/, function () {
  console.log('post find hook of schema ran!')
  const doc = this
})

userSchema.pre('save', function (next) {
  console.log('pre save hook was ran in the schema')
  next()
})

const UserModel = mongoose.model('User', userSchema, 'users')

/*----------  end of code, exporting  ----------*/
module.exports = UserModel
