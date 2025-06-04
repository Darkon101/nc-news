const express = require('express')
const db = require('./db/connection')
const endpointsJSON = require('./endpoints.json')
const { getTopics } = require('./controllers/topics.controller')
const { getArticles } = require('./controllers/articles.controller')
const { getUsers } = require('./controllers/users.controller')

const app = express()

app.get('/api', (req, res)=>{
    res.status(200).send({endpoints: endpointsJSON})
})

app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)

app.get('/api/users', getUsers)

module.exports = app