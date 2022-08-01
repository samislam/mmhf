/*=============================================
=            importing dependencies            =
=============================================*/
const express = require('express')
const mmhf = require('../src/index')
const UserModel = require('./utils/UserModel')

/*=====  End of importing dependencies  ======*/

const readRouter = express.Router()

readRouter.route('/getMany').get(
  () => console.log('uncomment to test and remove this middleware')
  // mmhf.getMany(UserModel, null, { chain: (query) => query.sort('name') })
  // mmhf.getMany(() => UserModel, { name: 'someone' }, {})
)

readRouter.route('/getOne').get(
  () => console.log('uncomment to test and remove this middleware')
  // mmhf.getOne(UserModel, { name: 'someone' }, { projection: 'name' }),
  // mmhf.getOne(() => UserModel, { name: 'someone' }, { chain: (query) => query.select('name') })
)

readRouter.route('/getOneById/:id').get(
  // () => console.log('uncomment to test and remove this middleware')
  // mmhf.getOneById(UserModel, (req) => req.params.id, { projection: 'name' })
  // mmhf.getOneById(() => UserModel, (req) => req.params.id, { chain: (query) => query.select('name') })
  mmhf.getOneById(
    () => UserModel,
    (req) => req.params.id
  )
)

module.exports = readRouter
