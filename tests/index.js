/*=============================================
=            importing dependencies            =
=============================================*/
const mongoose = require('mongoose')
const express = require('express')
const log = require('@samislam/log')
const { sendRes } = require('@samislam/sendres')

const factory = require('../index')
// Models -----
const { UserModel } = require('./mongoose_models')
/*=====  End of importing dependencies  ======*/

const app = express()

app.use(express.json())

app
  .route('/api/users')
  .get(factory.getMany(UserModel))
  .post(factory.createOne(UserModel, (req) => req.body))

app
  .route('/api/users/:id')
  .get(factory.getOneById(UserModel, (req) => req.params.id))
  .patch(
    factory.updateOneById(
      UserModel,
      (req) => req.params.id,
      (req) => req.body
    )
  )
  .delete(factory.deleteOneById(UserModel, (req) => req.params.id))

// global error handling middleware ---------------:
app.use((error, req, res, next) => {
  if (error.isOperational) {
    sendRes(error.statusCode, res, { ...error })
  } else sendRes(400, res, error)
})

console.clear()
log.info(log.label, 'connecting to DB...')
mongoose.connect('mongodb://localhost:27017/tests', () => log.success(log.label, 'successfully connected to the database'))
log.info(log.label, 'starting the http service...')
app.listen(9627, () => log.success(log.label, 'mmhf http service listening on port 9627...'))
