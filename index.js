/*=============================================
=            importing dependencies            =
=============================================*/
const { sendRes } = require('@samislam/sendres')
const expressAsyncHandler = require('express-async-handler')
const checkTypes = require('@samislam/checktypes')
const _ = require('lodash')
// -----
const archiveDoc = require('./utils/archiveDoc')

/*=====  End of importing dependencies  ======*/
const saveUpdate = require('./utils/saveUpdate')

const getValue = (parameter, ...args) => (checkTypes.isAsycOrSyncFunc(parameter) ? parameter(...args) : parameter)

const notFoundDefaultMsg = 'No record found with that ID'

function sendErr(res, statusCode, message) {
  sendRes(statusCode, res, { message })
}

/*=============================================
=            Creating Middlewares            =
=============================================*/

const createOne = (Model, dataObj, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel
    // @param dataObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    const dataObjValue = getValue(dataObj, req)
    const optionsValue = getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      sendRes: {},
      queryOptions: {},
      callNext: false,
      statusCode: 201,
    }
    _.merge(chosenOptions, defaultOptions, optionsValue)

    const doc = await Model.create(dataObjValue)
    sendRes(chosenOptions.statusCode, res, { data: doc }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })

/*=============================================
=            Reading Middlewares            =
=============================================*/

const getMany = (Model, filterObj = {}, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel
    // @param filterObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    const filterObjValue = await getValue(filterObj, req)
    const optionsValue = await getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      sendRes: {},
      queryOptions: {},
      callNext: false,
      projection: null,
      statusCode: 200,
    }
    _.merge(chosenOptions, defaultOptions, optionsValue)

    const docs = await Model.find(filterObjValue, chosenOptions.projection, chosenOptions.queryOptions)
    sendRes(chosenOptions.statusCode, res, { $$data: docs }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })

const getOne = (Model, filterObj, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel
    // @param filterObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    const filterObjValue = await getValue(filterObj, req)
    const optionsValue = await getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      sendRes: {},
      queryOptions: {},
      callNext: false,
      projection: null,
      statusCode: 200,
      notFoundMsg: notFoundDefaultMsg,
      notFoundErr: true,
    }
    _.merge(chosenOptions, defaultOptions, optionsValue)

    const doc = await Model.findOne(filterObjValue, chosenOptions.projection, chosenOptions.queryOptions)
    if (chosenOptions.notFoundErr && !doc) return sendErr(res, 404, chosenOptions.notFoundMsg)
    sendRes(chosenOptions.statusCode, res, { data: doc }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })
const getOneById = (Model, id, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel
    // @param id: ObjectId | string | function
    // @param options: object | function
    // getting the parameters values ---------------
    const idValue = await getValue(id, req)
    const optionsValue = await getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      sendRes: {},
      queryOptions: {},
      callNext: false,
      projection: null,
      statusCode: 200,
      notFoundMsg: notFoundDefaultMsg,
      notFoundErr: true,
    }
    _.merge(chosenOptions, defaultOptions, optionsValue)

    const doc = await Model.findById(idValue, chosenOptions.projection, chosenOptions.queryOptions)
    if (chosenOptions.notFoundErr && !doc) return sendErr(res, 404, chosenOptions.notFoundMsg)
    sendRes(chosenOptions.statusCode, res, { data: doc }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })

/*=============================================
=            Updating Middlewares            =
=============================================*/

const updateOne = (Model, filterObj, updateObj, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel
    // @param filterObj: object | function
    // @param updateObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    const filterObjValue = await getValue(filterObj, req)
    const updateObjValue = await getValue(updateObj, req)
    const optionsValue = await getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      sendRes: {},
      queryOptions: { new: true, runValidators: true },
      callNext: false,
      statusCode: 200,
      notFoundMsg: notFoundDefaultMsg,
      notFoundErr: true,
    }
    _.merge(chosenOptions, defaultOptions, optionsValue)

    const doc = await Model.findOneAndUpdate(filterObjValue, updateObjValue, chosenOptions.queryOptions)
    if (chosenOptions.notFoundErr && !doc) return sendErr(res, 404, chosenOptions.notFoundMsg)
    sendRes(chosenOptions.statusCode, res, { data: doc }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })

const updateOneById = (Model, id, updateObj, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel
    // @param id: ObjectId | string | function
    // @param updateObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    const idValue = await getValue(id, req)
    const updateObjValue = await getValue(updateObj, req)
    const optionsValue = await getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      sendRes: {},
      queryOptions: { new: true, runValidators: true },
      callNext: false,
      statusCode: 200,
      notFoundMsg: notFoundDefaultMsg,
      notFoundErr: true,
    }
    _.merge(chosenOptions, defaultOptions, optionsValue)

    const doc = await Model.findByIdAndUpdate(idValue, updateObjValue, chosenOptions.queryOptions)
    if (chosenOptions.notFoundErr && !doc) return sendErr(res, 404, chosenOptions.notFoundMsg)
    sendRes(chosenOptions.statusCode, res, { data: doc }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })

const updateOneWithSave = (Model, filterObj, updateObj, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel
    // @param filterObj: object | function
    // @param updateObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    const filterObjValue = await getValue(filterObj, req)
    const updateObjValue = await getValue(updateObj, req)
    const optionsValue = await getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      sendRes: {},
      queryOptions: {},
      saveQueryOptions: {},
      callNext: false,
      statusCode: 200,
      notFoundMsg: notFoundDefaultMsg,
      notFoundErr: true,
    }
    _.merge(chosenOptions, defaultOptions, optionsValue)

    const doc = await Model.findOne(filterObjValue, chosenOptions.projection, chosenOptions.queryOptions)
    if (chosenOptions.notFoundErr && !doc) return sendErr(res, 404, chosenOptions.notFoundMsg)
    const newDoc = await saveUpdate(doc, updateObjValue, chosenOptions.saveQueryOptions)
    sendRes(chosenOptions.statusCode, res, { data: newDoc }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })

const updateOneByIdWithSave = (Model, id, updateObj, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel
    // @param id: object | function
    // @param updateObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    const idValue = await getValue(id, req)
    const updateObjValue = await getValue(updateObj, req)
    const optionsValue = await getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      sendRes: {},
      queryOptions: {},
      saveQueryOptions: {},
      callNext: false,
      statusCode: 200,
      notFoundMsg: notFoundDefaultMsg,
      notFoundErr: true,
    }
    _.merge(chosenOptions, defaultOptions, optionsValue)

    const doc = await Model.findById(idValue, chosenOptions.projection, chosenOptions.queryOptions)
    if (chosenOptions.notFoundErr && !doc) return sendErr(res, 404, chosenOptions.notFoundMsg)
    const newDoc = await saveUpdate(doc, updateObjValue, chosenOptions.saveQueryOptions)
    sendRes(chosenOptions.statusCode, res, { data: newDoc }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })

/*=============================================
=            Deleting Middlewares            =
=============================================*/

const deleteOne = (Model, filterObj, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel
    // @param filterObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    const filterObjValue = await getValue(filterObj, req)
    const optionsValue = await getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      sendRes: {},
      queryOptions: {},
      callNext: false,
      statusCode: 204,
      notFoundMsg: notFoundDefaultMsg,
      notFoundErr: true,
      sendDeletedDoc: false,
    }
    _.merge(chosenOptions, defaultOptions, optionsValue)

    const doc = await Model.findOneAndDelete(filterObjValue, chosenOptions.queryOptions)
    if (chosenOptions.notFoundErr && !doc) return sendErr(res, 404, chosenOptions.notFoundMsg)
    sendRes(chosenOptions.statusCode, res, { data: chosenOptions.sendDeletedDoc ? doc : null }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })
const deleteOneById = (Model, id, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel
    // @param id: ObjectId | string | function
    // @param options: object | function
    // getting the parameters values ---------------
    const idValue = await getValue(id, req)
    const optionsValue = await getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      sendRes: {},
      queryOptions: {},
      callNext: false,
      statusCode: 204,
      notFoundMsg: notFoundDefaultMsg,
      notFoundErr: true,
      sendDeletedDoc: false,
    }
    _.merge(chosenOptions, defaultOptions, optionsValue)

    const doc = await Model.findByIdAndDelete(idValue, chosenOptions.queryOptions)
    if (chosenOptions.notFoundErr && !doc) return sendErr(res, 404, chosenOptions.notFoundMsg)
    sendRes(chosenOptions.statusCode, res, { data: chosenOptions.sendDeletedDoc ? doc : null }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })
const archiveOne = (Model, filterObj, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel
    // @param filterObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    const filterObjValue = await getValue(filterObj, req)
    const optionsValue = await getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      sendRes: {},
      queryOptions: {},
      callNext: false,
      statusCode: 204,
      notFoundMsg: notFoundDefaultMsg,
      notFoundErr: true,
      sendArchivedDoc: false,
    }
    _.merge(chosenOptions, defaultOptions, optionsValue)

    const doc = await archiveDoc(Model, filterObjValue, {
      ...chosenOptions.queryOptions,
      notFoundErr: false,
    })
    if (chosenOptions.notFoundErr && !doc) return sendErr(res, 404, chosenOptions.notFoundMsg)

    sendRes(chosenOptions.statusCode, res, { data: chosenOptions.sendArchivedDoc ? doc : null }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })
const archiveOneById = (Model, id, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel
    // @param id: ObjectId | string | function
    // @param options: object | function
    // getting the parameters values ---------------
    const idValue = await getValue(id, req)
    const optionsValue = await getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      sendRes: {},
      queryOptions: {},
      callNext: false,
      statusCode: 204,
      notFoundMsg: notFoundDefaultMsg,
      notFoundErr: true,
      sendArchivedDoc: false,
    }
    _.merge(chosenOptions, defaultOptions, optionsValue)

    const doc = await archiveDoc(
      Model,
      { _id: idValue },
      {
        queryOptions: chosenOptions.queryOptions,
        uniqueId: chosenOptions.uniqueId,
        uniqueFields: chosenOptions.uniqueFields,
        notFoundErr: false,
      }
    )
    if (chosenOptions.notFoundErr && !doc) return sendErr(res, 404, chosenOptions.notFoundMsg)

    sendRes(chosenOptions.statusCode, res, { data: chosenOptions.sendArchivedDoc ? doc : null }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })

/*----------  end of code, exporting  ----------*/

module.exports = {
  getMany,
  getOne,
  getOneById,
  updateOne,
  updateOneById,
  updateOneWithSave,
  updateOneByIdWithSave,
  deleteOne,
  deleteOneById,
  archiveOne,
  archiveOneById,
  createOne,
}
