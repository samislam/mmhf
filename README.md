**MMHF: Mongoose Middleware Handlers Factory** Is a package of Express middlewares to quickly perform the daily CRUD operations, catching the errors internally and sending unified formats of responses to the clients.

# Examples:

### Example of using `factory.getMany()`:

```js
const express = require('express')
const UsersModel = require('./modles/UsersModel.js')
// ----- require mmhf
const factory = require('@samislam/mmhf')

const app = express()

app.get('/api/users', factory.getMany(UsersModel))

app.listen(3000, () => console.log('listening on port 3000...'))
```

When a client requests the endpoint **/api/users** the response would be:

```js
/*
    { # 200
        status: 'success',
        results: 3
        data: [
            { 
                id: 1,
                name: 'Murat'
                age: 9
            },
            { 
                id: 2,
                name: 'Yaser'
                age: 10
            },
            { 
                id: 3,
                name: 'Omer'
                age: 10
            },
        ]
    }
*/
```

---

### Example of using `factory.getOne()`:

```js
const express = require('express')
const UsersModel = require('./modles/UsersModel.js')
// ----- require mmhf
const factory = require('@samislam/mmhf')

const app = express()

app.get(
  '/api/users/:id',
  factory.getOne(UsersModel, (req) => req.params.id)
)

app.listen(3000, () => console.log('listening on port 3000...'))
```

When a client requests the endpoint **/api/users/2** the response would be:

```js
/*
    { # 200
        status: 'success',
        data: { 
                id: 2,
                name: 'Yaser'
                age: 10
              }
    }
*/
```

---

### Example of using `factory.createOne()`:

```js
const express = require('express')
const UsersModel = require('./modles/UsersModel.js')
// ----- require mmhf
const factory = require('@samislam/mmhf')

const app = express()

app.post(
  '/api/users/:id',
  factory.createOne(UsersModel, (req) => req.body)
)

app.listen(3000, () => console.log('listening on port 3000...'))
```

When a client POSTs the endpoint **/api/users** with the following data, the response would be:

```js
// REQUEST to [POST /api/users ]
{
    name: 'Saleem',
    age: 11
}
/*  RESPONSE:
    { # 201
        status: 'success',
        data: {
                id: 4,
                name: 'Saleem'
                age: 11
              }
    }
*/
```

# API

## Qucik overview:

```js
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
factory.updateOneWithSave(Model, filterObj, updateObj, options)
factory.updateOneByIdWithSave(Model, id, updateObj, options)
// [D] Delete ----
factory.deleteOne(Model, filterObj, options)
factory.deleteOneById(Model, id, options)
factory.archiveOne(Model, filterObj, options)
factory.archiveOneById(Model, id, options)
```

The API is pretty simple and stright forward, there are 4 types of middlewares **CRUD** [**C**reating middlewares, **R**eading middlewares, **U**pdating middlewares, **D**eleting middlewares].

## Creating Middlewares:

## `createOne(Model: MongooseModel, dataObj: object | function, options: object | function)`

- **Model**: Your Mongoose model.
- **dataObj**: _object_ | _function_, The data you want to write.
  - When a function is provided, it will be called with the express **req** object as the first parameter.
  - If a function is provided, it must return an object.
- **options**: _object_ | _function_
  - When a function is provided, it will be called with the express **req** object as the first parameter.
  - If a function is provided, it must return an object.
  - see the options available in the **available options** section.

Create one document using the `dataObj` argument, and send the response.

- Internally uses the Mongoose method `Model.create()`.
- operation success status code: **201**.

## Reading Middlewares:

## `getMany(Model: MongooseModel, filterObj: object | function, options: object | function)`

- **Model**: Your Mongoose model.
- **filterObj**: _object_ | _function_, The search filter you use to find the documents.
  - When a function is provided, it will be called with the express **req** object as the first parameter.
  - If a function is provided, it must return an object.
- **options**: _object_ | _function_
  - When a function is provided, it will be called with the express **req** object as the first parameter.
  - If a function is provided, it must return an object.

### Available options:

- **projection:**: (defaults to `null`) the mongoose findOne method arguemnt, optional fields to return, read more [here](https://mongoosejs.com/docs/api/model.html#model_Model.find).
- for other options, read the options available in the **available options** section.

Get multiple documents, search for them using the `filterObj` argument, and send them with a `results` property.

- `results` is the count of the documents returned from the database.
- internally uses the Mongoose method `Model.find()`.
- operation success status code: **200**.

## `getOne(Model: MongooseModel, filterObj: object | function, options: object | function)`

- **Model**: Your Mongoose model.
- **filterObj**: _object_ | _function_, The search filter you use to find the document.
  - When a function is provided, it will be called with the express **req** object as the first parameter.
  - If a function is provided, it must return an object.
- **options**: _object_ | _function_
  - When a function is provided, it will be called with the express **req** object as the first parameter.
  - If a function is provided, it must return an object.

### Available options:

- **projection:**: (defaults to `null`) the mongoose findOne method arguemnt, optional fields to return, read more [here](https://mongoosejs.com/docs/api/model.html#model_Model.find).
- for other options, read the options available in the **available options** section.

Get one document, search for it using the `filterObj` argument, and send the response.

- internally uses the Mongoose method `Model.findOne()`.
- operation success status code: **200**.

## `getOneById(Model: MongooseModel, id: ObjectId | string | function, options: object | function)`

- **Model**: Your Mongoose model.
- **id**: _ObjectId_ | _string_ | _function_, The ID of the document.
  - When a function is provided, it will be called with the express **req** object as the first parameter.
  - If a function is provided, it must return an object.
- **options**: _object_ | _function_
  - When a function is provided, it will be called with the express **req** object as the first parameter.
  - If a function is provided, it must return an object.

### Available options:

- **projection:**: (defaults to `null`) the mongoose findOne method arguemnt, optional fields to return, read more [here](https://mongoosejs.com/docs/api/model.html#model_Model.find).
- for other options, read the options available in the **available options** section.

Get one document, search for it by its ID, and send the response.

- internally uses the Mongoose method `Model.findById()`.
- operation success status code: **200**.

## Updating Middlewares:

## `updateOne(Model: MongooseModel, filterObj: object | function, updateObj: object | function, options: object | function)`

- **Model**: Your Mongoose model.
- **filterObj**: _object_ | _function_, The search filter you use to find the document.
  - When a function is provided, it will be called with the express **req** object as the first parameter.
  - If a function is provided, it must return an object.
- **updateObj**: _object_ | _function_, the data you want to write on the document if found.
  - When a function is provided, it will be called with the express **req** object as the first parameter.
  - If a function is provided, it must return an object.
- **options**: _object_ | _function_
  - When a function is provided, it will be called with the express **req** object as the first parameter.
  - If a function is provided, it must return an object.

### Available options:

- **queryOptions:** uses `{ new: true, runValidators: true }` internally by default.
- see the options available in the **available options** section.

Update one document, search for it using the `filterObj` argument, update the specified fields specified in the `updateObj` arguemnt, and send the response.

- Internally uses the Mongoose method `Model.findOneAndUpdate()`.
- operation success status code: **200**.

## `updateOneById(Model: MongooseModel, id: ObjectId | string | function, updateObj: object | function, options: object | function)`

- **Model**: Your Mongoose model.
- **id**: _ObjectId_ | _string_ | _function_, The ID of the document.
  - When a function is provided, it will be called with the express **req** object as the first parameter.
  - If a function is provided, it must return an object.
- **updateObj**: _object_ | _function_, the data you want to write on the document if found.
  - When a function is provided, it will be called with the express **req** object as the first parameter.
  - If a function is provided, it must return an object.
- **options**: _object_ | _function_
  - When a function is provided, it will be called with the express **req** object as the first parameter.
  - If a function is provided, it must return an object.

### Available options:

- **queryOptions:** uses `{ new: true, runValidators: true }` internally by default.
- see the options available in the **available options** section.

Update one document, search for it using the by its ID, update the specified fields specified in the `updateObj` arguemnt, and send the response.

- Internally uses the Mongoose method `Model.findByIdAndUpdate()`.
- operation success status code: **200**.

## `updateOneWithSave(Model: MongooseModel, filterObj: object | function, updateObj: object | function, options: object | function)`

- **Model**: Your Mongoose model.
- **filterObj**: _object_ | _function_, The search filter you use to find the document.
  - When a function is provided, it will be called with the express **req** object as the first parameter.
  - If a function is provided, it must return an object.
- **updateObj**: _object_ | _function_, the data you want to write on the document if found.
  - When a function is provided, it will be called with the express **req** object as the first parameter.
  - If a function is provided, it must return an object.
- **options**: _object_ | _function_
  - When a function is provided, it will be called with the express **req** object as the first parameter.
  - If a function is provided, it must return an object.

### Available options:

- `saveQueryOptions`: options you want to pass to the Mongoose `Document.save()` method, see the official [Mongoose .save() method docs](https://mongoosejs.com/docs/api/document.html#document_Document-save) for these options.
- see the options available in the **available options** section.

Update one document, search for it using the `filterObj` argument, update the specified fields specified in the `updateObj` arguemnt, and send the response.
This method has the benifit of runnin the Mongoose `'save'` hooks/middlewares, it also fires the Mongoose `findOne` middleware because it first searches for the specified document, and then **_merges_** the updates specified in the `updateObj` argument with the original data in the document.

- Internally uses the Mongoose method `Model.findOne()` and `Document.save()`.
- operation success status code: **200**.

## `updateOneByIdWithSave(Model: MongooseModel, id: ObjectId | string | function, updateObj: object | function, options: object | function)`

- **Model**: Your Mongoose model.
- **id**: _ObjectId_ | _string_ | _function_, The ID of the document.
  - When a function is provided, it will be called with the express **req** object as the first parameter.
  - If a function is provided, it must return an object.
- **updateObj**: _object_ | _function_, the data you want to write on the document if found.
  - When a function is provided, it will be called with the express **req** object as the first parameter.
  - If a function is provided, it must return an object.
- **options**: _object_ | _function_
  - When a function is provided, it will be called with the express **req** object as the first parameter.
  - If a function is provided, it must return an object.

### Available options:

- `saveQueryOptions`: options you want to pass to the Mongoose `Document.save()` method, see the official [Mongoose .save() method docs](https://mongoosejs.com/docs/api/document.html#document_Document-save) for these options.
- see the options available in the **available options** section.

Update one document, search for it using the `filterObj` argument, update the specified fields specified in the `updateObj` arguemnt, and send the response.
This method has the benifit of runnin the Mongoose `'save'` hooks/middlewares, it also fires the Mongoose `findOne` middleware because it first searches for the specified document, and then **_merges_** the updates specified in the `updateObj` argument with the original data in the document.

- Internally uses the Mongoose method `Model.findOne()` and `Document.save()`.
- operation success status code: **200**.

## Deleting Middlewares:

## `deleteOne(Model: MongooseModel, filterObj: object | function, options: object | function)`

- **Model**: Your Mongoose model.
- **filterObj**: _object_ | _function_, The search filter you use to find the document.
  - When a function is provided, it will be called with the express **req** object as the first parameter.
  - If a function is provided, it must return an object.
- **options**: _object_ | _function_
  - When a function is provided, it will be called with the express **req** object as the first parameter.
  - If a function is provided, it must return an object.

### Available options:

- **sendDeletedDoc:** _boolean_, (default **false**) send the document which got deleted with the response.
  - **Note:** since the default status code is **204**, you're most likey not going to see the body of the response on the client-side, (for example when you're using [PostMan](https://www.postman.com/)).
- see the options available in the **available options** section.

Delete one document, search for it using the `filterObj` argument, and send the response.

- Internally uses the Mongoose method `Model.findOneAndDelete()`.
- operation success status code: **204**.

## `deleteOneById(Model: MongooseModel, id: ObjectId | string | function, options: object | function)`

- **Model**: Your Mongoose model.
- **id**: _ObjectId_ | _string_ | _function_, The ID of the document.
  - When a function is provided, it will be called with the express **req** object as the first parameter.
  - If a function is provided, it must return an object.
- **options**: _object_ | _function_
  - When a function is provided, it will be called with the express **req** object as the first parameter.
  - If a function is provided, it must return an object.

### Available options:

- **sendDeletedDoc:** _boolean_, (default **false**) send the document which got deleted with the response.
  - **Note:** since the default status code is **204**, you're most likey not going to see the body of the response on the client-side, (for example when you're using [PostMan](https://www.postman.com/)).
- see the options available in the **available options** section.

Delete one document, search for it by its ID, and send the response.

- Internally uses the Mongoose method `Model.findByIdAndDelete()`.
- operation success status code: **204**.

## `archiveOne(Model: MongooseModel, filterObj: object | function, options: object | function)`

> - 🧪 This middleware is here for experimental purposes only, and it might get removed at any time.
> - ⚠️ Don't use this middleware, as it's not guarnteed, you've been warned.

Soft delete a document by setting a \_archived property on the document with the current timestamp indicating the time of archiving, when this property is set, you should filter any find query using mongoose to search only for the documents that don't have the \_archive property.

- operation success status code: **204**.

## `archiveOneById(Model: MongooseModel, id: ObjectId | string | function, options: object | function)`

> - 🧪 This middleware is here for experimental purposes only, and it might get removed at any time.
> - ⚠️ Don't use this middleware, as it's not guarnteed, you've been warned.

Soft delete a document by setting a \_archived property on the document with the current timestamp indicating the time of archiving, when this property is set, you should filter any find query using mongoose to search only for the documents that don't have the \_archive property.

- operation success status code: **204**.

# Available Options

All the middlewares share the following options:

```js
sendRes: {}, // default value
queryOptions: {}, // default value
callNext: false, // default value
statusCode,
```

- **sendRes**: _object_, the options you want to pass to the [sendRes](https://www.npmjs.com/package/@samislam/sendres) module, mmhf defaults to the default configurations of [sendRes](https://www.npmjs.com/package/@samislam/sendres), if you want to configure how your response styles, use this property.
  see the available options for this property object on the offical docs of [sendRes](https://github.com/samislam/sendres#available-options).
- **queryOptions**: _object_, the options you want to pass down to the query method, these are passed directly down to the mongoose query method which is in use, for instnce, if you're using `factory.getOneById(Model, (req)=> req.params.id, { queryOptions: { strictQuery: false } })`, the `strictQuery: false` you wrote is going to be passed to the inner `Model.findOneById` mongoose method. If you want to see the available options for each query, refer to the official [Mongoose documentation](https://mongoosejs.com/docs) for this purpose.
- **callNext**: _boolean_, If you have an express middleware that you want to execute after running one of the middlewares, use this option to make the middleware you're using call the express `next()` function internally.
  - **Note:** even if this options was set to **true**, the response will be sent either ways, **and you can't send a response twice**.
- **statusCode**: _number_, the success status code, refer to the API section to know the default success status code for each middleware.

all the middlewares **except** [createOne(), getMany()] uses the following options:

```js
notFoundMsg: 'No record found with that ID', // default value
notFoundErr: true, // default value
```

- **notFoundErr**: call next with an error if the requested document was not found (default to **true**).
- **notFoundMsg**: the **message** property the will be in the response if a document was not found.
  - of course, this option will only have effect if the **notFoundErr** option was **true**.

For more options, refer to each middleware in the API above to see if any other options are available per each middleware.

# Error handling

**MMHF** depends on [express-async-handler](https://www.npmjs.com/package/express-async-handler), it performs the asynchronous tasks normally, and when it catches an error, it internally calls `next()` with the error, you can then use that error to handle it the way you want in your [express error handling middleware](https://expressjs.com/en/guide/error-handling.html).

The errors can be one of two types:

1. a mongoose error, such as validation errors, casting errors, or duplicate fields errors, for this you need to read [the official docs of Mongoose](https://mongoosejs.com/docs/).
2. an mmhf error, and the only error that mmhf have is the not found error, when it tries to search for a document, then it can't find that document, for this, mmhf automatically handles that and sends a response to the client, thus you don't need to handle that anywhere.

---

Created at: **5 - July - 2022**
