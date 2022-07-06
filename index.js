/*=============================================
=            importing dependencies            =
=============================================*/
const { sendRes } = require('@samislam/sendres')
const expressAsyncHandler = require('express-async-handler')
const checkTypes = require('@samislam/checktypes')
const _ = require('lodash')
const log = require('@samislam/log')

// -----
const AppError = require('../../utils/AppError')
const archiveDoc = require('../../utils/archiveDoc')

/*=====  End of importing dependencies  ======*/

const getValue = (parameter, ...args) => {
  console.log(parameter)
  return checkTypes.isAsycOrSyncFunc(parameter) ? parameter(...args) : parameter
}
const notFoundDefaultMsg = 'No record found with that ID'

/*=============================================
=            Creating Middlewares            =
=============================================*/

const createOne = (Model, dataObj, options) =>
  expressAsyncHandler(async (req, res, next) => {
    log.w(log.label, dataObj)
    // @param Model: MongooseModel
    // @param dataObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    dataObj = getValue(dataObj, req)
    options = getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      sendRes: {},
      queryOptions: {},
      callNext: false,
    }
    _.merge(chosenOptions, defaultOptions, options)

    console.log(dataObj)
    const doc = await Model.create(dataObj)
    sendRes(201, res, { data: doc }, chosenOptions.sendRes)
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
    filterObj = await getValue(filterObj, req)
    options = await getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      sendRes: {},
      queryOptions: {},
      callNext: false,
      projection: null,
    }
    _.merge(chosenOptions, defaultOptions, options)

    const docs = await Model.find(filterObj, chosenOptions.projection, chosenOptions.queryOptions)
    sendRes(200, res, { $$data: docs }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })

const getOne = (Model, filterObj, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel
    // @param filterObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    filterObj = await getValue(filterObj, req)
    options = await getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      sendRes: {},
      queryOptions: {},
      callNext: false,
      projection: null,
      notFoundMsg: notFoundDefaultMsg,
      notFoundErr: true,
    }
    _.merge(chosenOptions, defaultOptions, options)

    const doc = await Model.findOne(filterObj, chosenOptions.projection, chosenOptions.queryOptions)
    if (chosenOptions.notFoundErr && !doc) return next(new AppError(chosenOptions.notFoundMsg, 404))
    sendRes(200, res, { data: doc }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })
const getOneById = (Model, id, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel
    // @param id: ObjectId | string | function
    // @param options: object | function
    // getting the parameters values ---------------
    id = await getValue(id, req)
    options = await getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      sendRes: {},
      queryOptions: {},
      callNext: false,
      projection: null,
      notFoundMsg: notFoundDefaultMsg,
      notFoundErr: true,
    }
    _.merge(chosenOptions, defaultOptions, options)

    const doc = await Model.findById(id, chosenOptions.projection, chosenOptions.queryOptions)
    if (chosenOptions.notFoundErr && !doc) return next(new AppError(chosenOptions.notFoundMsg, 404))
    sendRes(200, res, { data: doc }, chosenOptions.sendRes)
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
    filterObj = await getValue(filterObj, req)
    updateObj = await getValue(updateObj, req)
    options = await getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      sendRes: {},
      queryOptions: { new: true, runValidators: true },
      callNext: false,
      notFoundMsg: notFoundDefaultMsg,
      notFoundErr: true,
    }
    _.merge(chosenOptions, defaultOptions, options)

    const doc = await Model.findOneAndUpdate(filterObj, updateObj, chosenOptions.queryOptions)
    if (chosenOptions.notFoundErr && !doc) return next(new AppError(chosenOptions.notFoundMsg, 404))
    sendRes(200, res, { data: doc }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })

const updateOneById = (Model, id, updateObj, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel
    // @param id: ObjectId | string | function
    // @param updateObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    id = await getValue(id, req)
    updateObj = await getValue(updateObj, req)
    options = await getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      sendRes: {},
      queryOptions: { new: true, runValidators: true },
      callNext: false,
      notFoundMsg: notFoundDefaultMsg,
      notFoundErr: true,
    }
    _.merge(chosenOptions, defaultOptions, options)

    const doc = await Model.findByIdAndUpdate(id, updateObj, chosenOptions.queryOptions)
    if (chosenOptions.notFoundErr && !doc) return next(new AppError(chosenOptions.notFoundMsg, 404))
    sendRes(200, res, { data: doc }, chosenOptions.sendRes)
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
    filterObj = await getValue(filterObj, req)
    options = await getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      sendRes: {},
      queryOptions: {},
      callNext: false,
      notFoundMsg: notFoundDefaultMsg,
      notFoundErr: true,
      sendDeletedDoc: false,
    }
    _.merge(chosenOptions, defaultOptions, options)

    const doc = await Model.findOneAndDelete(filterObj, chosenOptions.queryOptions)
    if (chosenOptions.notFoundErr && !doc) return next(new AppError(chosenOptions.notFoundMsg, 404))
    sendRes(204, res, { data: chosenOptions.sendDeletedDoc ? doc : null }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })
const deleteOneById = (Model, id, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel
    // @param id: ObjectId | string | function
    // @param options: object | function
    // getting the parameters values ---------------
    id = await getValue(id, req)
    options = await getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      sendRes: {},
      queryOptions: {},
      callNext: false,
      notFoundMsg: notFoundDefaultMsg,
      notFoundErr: true,
      sendDeletedDoc: false,
    }
    _.merge(chosenOptions, defaultOptions, options)

    const doc = await Model.findByIdAndDelete(id, chosenOptions.queryOptions)
    if (chosenOptions.notFoundErr && !doc) return next(new AppError(chosenOptions.notFoundMsg, 404))
    sendRes(204, res, { data: chosenOptions.sendDeletedDoc ? doc : null }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })
const archiveOne = (Model, filterObj, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel
    // @param filterObj: object | function
    // @param options: object | function
    // getting the parameters values ---------------
    filterObj = await getValue(filterObj, req)
    options = await getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      sendRes: {},
      queryOptions: {},
      callNext: false,
      notFoundMsg: notFoundDefaultMsg,
      notFoundErr: true,
      sendArchivedDoc: false,
    }
    _.merge(chosenOptions, defaultOptions, options)

    const doc = await archiveDoc(Model, filterObj, { ...chosenOptions.queryOptions, notFoundErr: false })
    if (chosenOptions.notFoundErr && !doc) return next(new AppError(chosenOptions.notFoundMsg, 404))

    sendRes(204, res, { data: chosenOptions.sendArchivedDoc ? doc : null }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })
const archiveOneById = (Model, id, options) =>
  expressAsyncHandler(async (req, res, next) => {
    // @param Model: MongooseModel
    // @param id: ObjectId | string | function
    // @param options: object | function
    // getting the parameters values ---------------
    id = await getValue(id, req)
    options = await getValue(options, req)
    // working with the options ---------------
    const chosenOptions = {}
    const defaultOptions = {
      sendRes: {},
      queryOptions: {},
      callNext: false,
      notFoundMsg: notFoundDefaultMsg,
      notFoundErr: true,
      sendArchivedDoc: false,
    }
    _.merge(chosenOptions, defaultOptions, options)

    const doc = await archiveDoc(
      Model,
      { _id: id },
      {
        queryOptions: chosenOptions.queryOptions,
        uniqueId: chosenOptions.uniqueId,
        uniqueFields: chosenOptions.uniqueFields,
        notFoundErr: false,
      }
    )
    if (chosenOptions.notFoundErr && !doc) return next(new AppError(chosenOptions.notFoundMsg, 404))

    sendRes(204, res, { data: chosenOptions.sendArchivedDoc ? doc : null }, chosenOptions.sendRes)
    if (chosenOptions.callNext) next()
  })

/*----------  end of code, exporting  ----------*/

module.exports = {
  getMany,
  getOne,
  getOneById,
  updateOne,
  updateOneById,
  deleteOne,
  deleteOneById,
  archiveOne,
  archiveOneById,
  createOne,
}
