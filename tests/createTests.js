/*=============================================
=            importing dependencies            =
=============================================*/
const express = require('express')
const mmhf = require('../src/index')
const UserModel = require('./utils/UserModel')

/*=====  End of importing dependencies  ======*/

const createRouter = express.Router()

createRouter.route('/createOne').post(
  // () => console.log('uncomment to test and remove this middleware')
  mmhf.createOne(UserModel, (req) => req.body)
  // mmhf.createOne(UserModel, (req) => req.body, {
  //   resBody: (doc) => {
  //     console.log(doc)
  //     return { name: doc[0].name }
  //   },
  // })
)

module.exports = createRouter
