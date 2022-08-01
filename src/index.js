// [C]reate middlewares
const createOne = require('./create/createOne')
// [R]ead middlewares
const getMany = require('./read/getMany')
const getOne = require('./read/getOne')
const getOneById = require('./read/getOneById')
// [U]pdate middlewares
const updateOne = require('./update/updateOne')
const updateOneById = require('./update/updateOneById')
const updateOneWithSave = require('./update/updateOneWithSave')
const updateOneByIdWithSave = require('./update/updateOneByIdWithSave')
// [D]elete middlewares
const deleteOne = require('./delete/deleteOne')
const deleteOneById = require('./delete/deleteOneById')
const archiveOne = require('./delete/archiveOne')
const archiveOneById = require('./delete/archiveOneById')

module.exports = {
  // ? what gets exported here is public and can be used by the consumer of the module
  // [C]reate middlewares
  createOne,
  // [R]ead middlewares
  getMany,
  getOne,
  getOneById,
  // [U]pdate middlewares
  updateOne,
  updateOneById,
  updateOneWithSave,
  updateOneByIdWithSave,
  // [D]elete middlewares
  deleteOne,
  deleteOneById,
  archiveOne,
  archiveOneById,
}
