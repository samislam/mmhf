/*=============================================
=            importing dependencies            =
=============================================*/
const express = require('express')
const factory = require('../src/index')
const { sendRes } = require('@samislam/sendres')
const UserModel = require('./utils/UserModel')
const frameworkStuff = require('./utils/frameworkStuff')
/*=====  End of importing dependencies  ======*/
const app = express()
const router = express.Router()
app.use(express.json())

app.use('/createTests', require('./createTests'))
app.use('/readTests', require('./readTests'))
app.use('/updateTests', require('./updateTests'))
app.use('/deleteTests', require('./deleteTests'))

// global error handling middleware ---------------:
app.use((error, req, res, next) => {
  console.log('an error was caught in the global error handling middleware')
  if (error.name === 'setDocNotFoundError') sendRes(error.statusCode, res, { ...error })
  else {
    res.end('internal server error, see the console for details')
    console.log(error)
  }
})

frameworkStuff(app)
