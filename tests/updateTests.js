/*=============================================
=            importing dependencies            =
=============================================*/
const express = require('express')
const mmhf = require('../src/index')
const UserModel = require('./utils/UserModel')

/*=====  End of importing dependencies  ======*/

const updateRouter = express.Router()

updateRouter.route('/updateOne').patch(
  () => console.log('uncomment to test and remove this middleware')
  // mmhf.updateOne(UserModel, { name: 'someone' }, (req) => req.body)
  // mmhf.updateOne(UserModel, { name: 'someone' }, (req) => req.body, {
  //   resBody: (doc) => ({ name: doc.name }),
  //   chain: (query) => {
  //     query.post(function () {
  //       console.log('post hook of the update method was invoked!')
  //     })
  //     return query
  //   },
  // })
)

updateRouter.route('/updateOneById/:id').patch(
  () => console.log('uncomment to test and remove this middleware')
  // mmhf.updateOneById(
  //   UserModel,
  //   (req) => req.params.id,
  //   (req) => req.body
  // )
  // mmhf.updateOne(
  //   UserModel,
  //   (req) => req.params.id,
  //   (req) => req.body,
  //   {
  //     resBody: (doc) => ({ name: doc.name }),
  //     chain: (query) => {
  //       query.post(function () {
  //         console.log('post hook of the update method was invoked!')
  //       })
  //       return query
  //     },
  //   }
  // )
)

updateRouter.route('/updateOneWithSave').patch(
  () => console.log('uncomment to test and remove this middleware')
  // mmhf.updateOneWithSave(UserModel, { name: 'someone' }, (req) => req.body)
  // mmhf.updateOneWithSave(UserModel, { name: 'someone' }, (req) => req.body, {
  //   resBody: (doc) => ({ name: doc.name }),
  //   chain: (query) => {
  //     query.post(function () {
  //       console.log('post hook of the update method was invoked!')
  //     })
  //     return query
  //   },
  // })
)

updateRouter.route('/updateOneByIdWithSave/:id').patch(
  () => console.log('uncomment to test and remove this middleware')
  // mmhf.updateOneByIdWithSave(
  //   UserModel,
  //   (req) => req.params.id,
  //   (req) => req.body
  // )
  // mmhf.updateOneByIdWithSave(
  //   async () => UserModel,
  //   (req) => req.params.id,
  //   (req) => req.body,
  //   {
  //     resBody: (doc) => ({ name: doc.name }),
  //     chain: (query) => {
  //       query.post(function () {
  //         console.log('post hook of the update method was invoked!')
  //       })
  //       return query
  //     },
  //   }
  // )
)

module.exports = updateRouter
