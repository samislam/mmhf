/*=============================================
=            importing dependencies            =
=============================================*/
const traverse = require('traverse')
const checkTypes = require('@samislam/checktypes')
const log = require('@samislam/log')
/*=====  End of importing dependencies  ======*/
const _ = require('lodash')

async function saveUpdate(oldDoc, updateObj, saveQueryOptions) {
  // mutates the original document and returns the updated document response from the DB.

  traverse(updateObj).forEach(function (v) {
    _.set(oldDoc, this.path, v)
  })

  const newDoc = await oldDoc.save(saveQueryOptions)
  return newDoc
}

/*----------  end of code, exporting  ----------*/
module.exports = saveUpdate
