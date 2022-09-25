const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
require('dotenv').config();


const app = express()
const mongoURI = process.env.MONGO_URI

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

mongoose.connection.once('open', () => {
    console.log('Connected to mongoDB')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('API is ON PORT 4000')
})