/*=============================================
=            importing dependencies            =
=============================================*/
const traverse = require('traverse')
const _ = require('lodash')
/*=====  End of importing dependencies  ======*/

function saveUpdate(oldDoc, updateObj, saveQueryOptions) {
  // mutates the original document and returns a query which holds the update logic.

  traverse(updateObj).forEach(function (v) {
    _.set(oldDoc, this.path, v)
  })

  const query = oldDoc.save(saveQueryOptions)
  return query
}

/*----------  end of code, exporting  ----------*/
module.exports = saveUpdate

// TODO: make this a separate NPM package
