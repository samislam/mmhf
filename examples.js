// the following are all the available methods: ---------------
// [C] Create ----
factory.createOne(Model, dataObj, options)
// [R] Read ----
factory.getMany(Model, (filterObj = {}), options)
factory.getOne(Model, filterObj, options)
factory.getOneById(Model, id, options)
// [U] Update ----
factory.updateOne(Model, filterObj, updateObj, options)
factory.updateOneById(Model, id, updateObj, options)
// [D] Delete ----
factory.deleteOne(Model, filterObj, options)
factory.deleteOneById(Model, id, options)
// don't use these as they're not guarnteed
factory.archiveOne(Model, filterObj, options)
factory.archiveOneById(Model, id, options)