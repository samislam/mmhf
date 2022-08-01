/*=============================================
=            importing dependencies            =
=============================================*/
const express = require('express')
const mmhf = require('../src/index')
const UserModel = require('./utils/UserModel')

/*=====  End of importing dependencies  ======*/

const deleteRouter = express.Router()

deleteRouter.route('/deleteOne').delete(
  () => console.log('uncomment to test and remove this middleware')
  //   mmhf.deleteOne(
  //     UserModel,
  //     { name: 'changed' },
  //     {
  //       chain: (query) => query.select('name'),
  //       sendDeletedDoc: true,
  //       statusCode: 200,
  //       resBody: (doc) => ({
  //         data2: doc,
  //       }),
  //     }
  //   )
  //   mmhf.deleteOne(async () => UserModel, { name: 'changed' })
)

deleteRouter.route('/deleteOneById/:id').delete(
  () => console.log('uncomment to test and remove this middleware')
  //   mmhf.deleteOneById(UserModel, (req) => req.params.id, {
  //     chain: (query) => query.select('name'),
  //     sendDeletedDoc: true,
  //     statusCode: 200,
  //     resBody: (doc) => ({
  //       data2: doc,
  //     }),
  //   })
  // mmhf.deleteOneById(
  //   async () => UserModel,
  //   (req) => req.params.id
  // )
)

deleteRouter
  .route('/archiveOne')
  .delete
  // () => console.log('uncomment to test and remove this middleware')
  // mmhf.archiveOne(
  //   UserModel,
  //   { name: 'someone' },
  //   {
  //     chain: (query) => query.select('name'),
  //     sendDeletedDoc: true,
  //     statusCode: 200,
  //     resBody: (doc) => ({
  //       data2: doc,
  //     }),
  //   }
  // )
  // mmhf.archiveOne(async () => UserModel, { name: 'someone' })
  ()

deleteRouter.route('/archiveOneById/:id').delete(
  // () => console.log('uncomment to test and remove this middleware')
  // mmhf.archiveOneById(UserModel, (req) => req.params.id, {
  //   chain: (query) => query.select('name'),
  //   sendDeletedDoc: true,
  //   statusCode: 200,
  //   resBody: (doc) => ({
  //     data2: doc,
  //   }),
  //   uniqueFields: ['name'],
  // })
  mmhf.archiveOne(
    async () => UserModel,
    (req) => req.params.id
  )
)

module.exports = deleteRouter
