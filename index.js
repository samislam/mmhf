/*=============================================
=            importing dependencies            =
=============================================*/
const mongoose = require('mongoose')
const _ = require('lodash')
const { sendRes } = require('@samislam/sendres')
const checkTypes = require('@samislam/checktypes')
const expressAsyncHandler = require('express-async-handler')
const archiveDoc = require('./utils/archiveDoc')
const saveUpdate = require('./utils/saveUpdate')
/*=====  End of importing dependencies  ======*/

const getValue = async (parameter, ...args) => {
  if ((parameter && Object.getPrototypeOf(parameter) === mongoose.Model) || !checkTypes.isAsycOrSyncFunc(parameter)) return parameter
  else return await parameter(...args)
}

const notFoundDefaultMsg = 'No record found with that ID'

function sendErr(res, statusCode, message) {
  sendRes(statusCode, res, { message })
}

/*=============================================
=            Creating Middlewares            =
=============================================*/

const createOne = (Model, dataObj, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel | function
    // @param dataObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    const ModelValue = await getValue(Model, req)
    const dataObjValue = await getValue(dataObj, req)
    const optionsValue = await getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      sendRes: {},
      queryOptions: {},
      callNext: false,
      statusCode: 201,
    }
    _.merge(chosenOptions, defaultOptions, optionsValue)

    const doc = await ModelValue.create(dataObjValue)
    sendRes(chosenOptions.statusCode, res, { data: doc }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })

/*=============================================
=            Reading Middlewares            =
=============================================*/

const getMany = (Model, filterObj = {}, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel | function
    // @param filterObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    const ModelValue = await getValue(Model, req)
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

    const docs = await ModelValue.find(filterObjValue, chosenOptions.projection, chosenOptions.queryOptions)
    sendRes(chosenOptions.statusCode, res, { $$data: docs }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })

const getOne = (Model, filterObj, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel | function
    // @param filterObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    const ModelValue = await getValue(Model, req)
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

    const doc = await ModelValue.findOne(filterObjValue, chosenOptions.projection, chosenOptions.queryOptions)
    if (chosenOptions.notFoundErr && !doc) return sendErr(res, 404, chosenOptions.notFoundMsg)
    sendRes(chosenOptions.statusCode, res, { data: doc }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })
const getOneById = (Model, id, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel | function
    // @param id: ObjectId | string | function
    // @param options: object | function
    // getting the parameters values ---------------
    const ModelValue = await getValue(Model, req)
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

    const doc = await ModelValue.findById(idValue, chosenOptions.projection, chosenOptions.queryOptions)
    if (chosenOptions.notFoundErr && !doc) return sendErr(res, 404, chosenOptions.notFoundMsg)
    sendRes(chosenOptions.statusCode, res, { data: doc }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })

/*=============================================
=            Updating Middlewares            =
=============================================*/

const updateOne = (Model, filterObj, updateObj, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel | function
    // @param filterObj: object | function
    // @param updateObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    const ModelValue = await getValue(Model, req)
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

    const doc = await ModelValue.findOneAndUpdate(filterObjValue, updateObjValue, chosenOptions.queryOptions)
    if (chosenOptions.notFoundErr && !doc) return sendErr(res, 404, chosenOptions.notFoundMsg)
    sendRes(chosenOptions.statusCode, res, { data: doc }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })

const updateOneById = (Model, id, updateObj, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel | function
    // @param id: ObjectId | string | function
    // @param updateObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    const ModelValue = await getValue(Model, req)
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

    const doc = await ModelValue.findByIdAndUpdate(idValue, updateObjValue, chosenOptions.queryOptions)
    if (chosenOptions.notFoundErr && !doc) return sendErr(res, 404, chosenOptions.notFoundMsg)
    sendRes(chosenOptions.statusCode, res, { data: doc }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })

const updateOneWithSave = (Model, filterObj, updateObj, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel | function
    // @param filterObj: object | function
    // @param updateObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    const ModelValue = await getValue(Model, req)
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

    const doc = await ModelValue.findOne(filterObjValue, chosenOptions.projection, chosenOptions.queryOptions)
    if (chosenOptions.notFoundErr && !doc) return sendErr(res, 404, chosenOptions.notFoundMsg)
    const newDoc = await saveUpdate(doc, updateObjValue, chosenOptions.saveQueryOptions)
    sendRes(chosenOptions.statusCode, res, { data: newDoc }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })

const updateOneByIdWithSave = (Model, id, updateObj, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel | function
    // @param id: object | function
    // @param updateObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    const ModelValue = await getValue(Model, req)
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

    const doc = await ModelValue.findById(idValue, chosenOptions.projection, chosenOptions.queryOptions)
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
    // @param Model: MongooseModel | function
    // @param filterObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    const ModelValue = await getValue(Model, req)
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

    const doc = await ModelValue.findOneAndDelete(filterObjValue, chosenOptions.queryOptions)
    if (chosenOptions.notFoundErr && !doc) return sendErr(res, 404, chosenOptions.notFoundMsg)
    sendRes(chosenOptions.statusCode, res, { data: chosenOptions.sendDeletedDoc ? doc : null }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })
const deleteOneById = (Model, id, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel | function
    // @param id: ObjectId | string | function
    // @param options: object | function
    // getting the parameters values ---------------
    const ModelValue = await getValue(Model, req)
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

    const doc = await ModelValue.findByIdAndDelete(idValue, chosenOptions.queryOptions)
    if (chosenOptions.notFoundErr && !doc) return sendErr(res, 404, chosenOptions.notFoundMsg)
    sendRes(chosenOptions.statusCode, res, { data: chosenOptions.sendDeletedDoc ? doc : null }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })
const archiveOne = (Model, filterObj, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel | function
    // @param filterObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    const ModelValue = await getValue(Model, req)
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

    const doc = await archiveDoc(ModelValue, filterObjValue, {
      ...chosenOptions.queryOptions,
      notFoundErr: false,
    })
    if (chosenOptions.notFoundErr && !doc) return sendErr(res, 404, chosenOptions.notFoundMsg)

    sendRes(chosenOptions.statusCode, res, { data: chosenOptions.sendArchivedDoc ? doc : null }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })
const archiveOneById = (Model, id, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel | function
    // @param id: ObjectId | string | function
    // @param options: object | function
    // getting the parameters values ---------------
    const ModelValue = await getValue(Model, req)
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
      ModelValue,
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
