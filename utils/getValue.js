/*=============================================
=            importing dependencies            =
=============================================*/
const mongoose = require('mongoose')
const checkTypes = require('@samislam/checktypes')

/*=====  End of importing dependencies  ======*/

const getValue = async (parameter, ...args) => {
  if ((parameter && Object.getPrototypeOf(parameter) === mongoose.Model) || !checkTypes.isAsycOrSyncFunc(parameter)) return parameter
  else return await parameter(...args)
}

/*----------  end of code, exporting  ----------*/

module.exports = getValue
