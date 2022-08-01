/*=============================================
=            importing dependencies            =
=============================================*/
const log = require('@samislam/log')
const mongoose = require('mongoose')

/*=====  End of importing dependencies  ======*/

function frameworkStuff(app) {
  console.clear()
  log.info(log.label, 'connecting to DB...')
  mongoose.connect('mongodb://localhost:27017/tests', () => log.success(log.label, 'successfully connected to the database'))
  log.info(log.label, 'starting the http service...')
  app.listen(9627, () => log.success(log.label, 'mmhf http service listening on port 9627...'))
}
/*----------  end of code, exporting  ----------*/

module.exports = frameworkStuff
