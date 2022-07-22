/*=============================================
=            importing dependencies            =
=============================================*/
const mongoose = require('mongoose')
const express = require('express')
const log = require('@samislam/log')
const { sendRes } = require('@samislam/sendres')
const factory = require('../src/index')
// Models -----
const { UserModel } = require('./mongoose_models')
/*=====  End of importing dependencies  ======*/

const app = express()
const router = express.Router()

app.use(express.json())
app.use('/api', router)

router
  .route('/users')
  .get(factory.getMany(UserModel))
  .post(factory.createOne(UserModel, (req) => req.body))

router
  .route('/users/:id')
  .get(
    factory.getOne(UserModel, (req) => ({ _id: req.params.id }), {
      notFoundMsg: 'Boys',
      notFoundStatusCode: 404,
      handleNotFoundErr: false,
    })
  )
  .patch(
    factory.updateOneByIdWithSave(
      UserModel,
      (req) => req.params.id,
      (req) => req.body
    )
  )
  .delete(factory.deleteOneById(UserModel, (req) => req.params.id))

// global error handling middleware ---------------:
app.use((error, req, res, next) => {
  console.log('an error was caught in the global error handling middleware')
  if (error.isOperational) {
    console.log('operational error!')
    sendRes(error.statusCode, res, { ...error })
  } else {
    console.log(error)
    sendRes(error.statusCode || 400, res, error)
  }
})

/*=============================================
=            connecting to db and http service starting            =
=============================================*/
console.clear()
log.info(log.label, 'connecting to DB...')
mongoose.connect('mongodb://localhost:27017/tests', () => log.success(log.label, 'successfully connected to the database'))
log.info(log.label, 'starting the http service...')
app.listen(9627, () => log.success(log.label, 'mmhf http service listening on port 9627...'))

/*=====  End of connecting to db and http service starting  ======*/
