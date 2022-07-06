
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

app.listen(3000, ()=> console.log('listening on port 3000...'))
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
-----

### Example of using `factory.getOne()`:
```js
const express = require('express')
const UsersModel = require('./modles/UsersModel.js')
// ----- require mmhf
const factory = require('@samislam/mmhf')

const app = express()

app.get('/api/users/:id', factory.getOne(UsersModel, (req) => req.params.id))

app.listen(3000, ()=> console.log('listening on port 3000...'))
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
-----

### Example of using `factory.createOne()`:
```js
const express = require('express')
const UsersModel = require('./modles/UsersModel.js')
// ----- require mmhf
const factory = require('@samislam/mmhf')

const app = express()

app.post('/api/users/:id', factory.createOne(UsersModel, (req) => req.body))

app.listen(3000, ()=> console.log('listening on port 3000...'))
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
factory.createOne(Model, filterObj)
// [R] Read ----
factory.getMany(Model, filterObj)
factory.getOne(Model, filterObj)
factory.getOneById(Model, id)
// [U] Update ----
factory.updateOne(Model, filterObj)
factory.updateOneById(Model, id)
// [D] Delete ----
factory.deleteOne(Model, filterObj)
factory.deleteOneById(Model, id)
factory.archiveOne(Model, filterObj)
factory.archiveOneById(Model, id)
```

The API is pretty simple and stright forward, there are 4 types of middlewares **CRUD** [**C**reating middlewares, **R**eading middlewares, **U**pdating middlewares, **D**eleting middlewares].

## Creating Middlewares:

```js
factory.createOne(Model: MongooseModel, dataObj: object | function, options: object | function)
```
Create one document using the `dataObj` argument, and send the response.
- Internally uses the Mongoose method `Model.create()`.
- operation success status code: **201**.


## Reading Middlewares: 

```js
factory.getMany(Model: MongooseModel, filterObj: object | function, options: object | function)
```
Get multiple documents, search for them using the `filterObj` argument, and send them with a `results` property.

- `results` is the count of the documents returned from the database.
- internally uses the Mongoose method `Model.find()`.
- operation success status code: **200**.

```js
factory.getOne(Model: MongooseModel, filterObj: object | function, options: object | function)
```
Get one document, search for it using the `filterObj` argument, and send the response.
- internally uses the Mongoose method `Model.findOne()`.
- operation success status code: **200**.

```js
factory.getOneById(Model: MongooseModel, id: ObjectId | string | function, options: object | function)
```
Get one document, search for it by its ID, and send the response.
- internally uses the Mongoose method `Model.findById()`.
- operation success status code: **200**.

## Updating Middlewares: 

```js
factory.updateOne(Model: MongooseModel, filterObj: object | function, updateObj: object | function, options: object | function)
```
Update one document, search for it using the `filterObj` argument, update the specified fields specified in the `updateObj` arguemnt, and send the response.
- Internally uses the Mongoose method `Model.findOneAndUpdate()`.
- operation success status code: **200**.

```js
factory.updateOneById(Model: MongooseModel, id: ObjectId | string | function, updateObj: object | function, options: object | function)
```
Update one document, search for it using the by its ID, update the specified fields specified in the `updateObj` arguemnt, and send the response.
- Internally uses the Mongoose method `Model.findByIdAndUpdate()`.
- operation success status code: **200**.

## Deleting Middlewares:

```js
factory.deleteOne(Model: MongooseModel, filterObj: object | function, options: object | function)
```
Delete one document, search for it using the `filterObj` argument, and send the response.
- Internally uses the Mongoose method `Model.findOneAndDelete()`.
- operation success status code: **204**.

```js
factory.deleteOneById(Model: MongooseModel, id: ObjectId | string | function, options: object | function)
```
Delete one document, search for it by its ID, and send the response.
- Internally uses the Mongoose method `Model.findByIdAndDelete()`.
- operation success status code: **204**.

```js
factory.archiveOne(Model: MongooseModel, filterObj: object | function, options: object | function)
```
- operation success status code: **204**.

```js
factory.archiveOneById(Model: MongooseModel, id: ObjectId | string | function, options: object | function)
```
- operation success status code: **204**.




# Error handling

**MMHF** depends on [express-async-handler](https://www.npmjs.com/package/express-async-handler), it performs the asynchronous tasks normally, and when it catches an error, it internally calls `next()` with the error, you can then use that error to handle it the way you want in your [express error handling middleware](https://expressjs.com/en/guide/error-handling.html).

-----
Created at: **5 - July - 2022**
