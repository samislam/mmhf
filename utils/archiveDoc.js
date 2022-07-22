/*=============================================
=            importing dependencies            =
=============================================*/
const _ = require('lodash')
const uniqid = require('uniqid')

/*=====  End of importing dependencies  ======*/

function archiveDoc(Model, filterObj, options) {
  // @param Model: MongooseModel | function
  // @param filterObj: object | function
  // @param: options: object | function
  // working with options ---------------
  const chosenOptions = {} // to prevent mutating the options argument
  const defaultOptions = {
    queryOptions: {},
    uniqueId: uniqid(),
    uniqueFields: null,
  }
  _.merge(chosenOptions, defaultOptions, options)

  // working with the code ---------------
  const setObj = { _archived: Date.now() }
  if (chosenOptions.uniqueFields)
    chosenOptions.uniqueFields.map((uniqueField) => {
      setObj[uniqueField] = {
        $concat: [`$${uniqueField}`, ' #deleted(', chosenOptions.uniqueId, ')'],
      }
    })
  const updateQuery = [{ $set: setObj }]

  const query = Model.findOneAndUpdate(filterObj, updateQuery, chosenOptions.queryOptions)
  return query
}

/*----------  end of code, exporting  ----------*/
module.exports = archiveDoc

/**
 * ~ signature: archiveDoc(Model, searchFilter [, uniqueFields, uniqueId])
 * ~ sets the _archive: timestamp field on a document to mark it as deleted
 * ~ handles the unique fields issue as well.
 */

// TODO: convert this module to a soft-delete plugin for mongoose schemas
