const express = require('express')
const db = require('./db/connection')
const endpointsJSON = require('./endpoints.json')
const { getTopics } = require('./controllers/topics.controller')
const { getArticles, getArticleById} = require('./controllers/articles.controller')
const { getUsers } = require('./controllers/users.controller')
const { handleCustomErrors, handleServerErrors, handleBadRequestErrors } = require('./errors')
const { getCommentsById } = require('./controllers/comments.controller')



const app = express()

app.get('/api', (req, res)=>{
    res.status(200).send({endpoints: endpointsJSON})
})

app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)

app.get('/api/users', getUsers)

app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles/:article_id/comments', getCommentsById)


app.use(handleCustomErrors)
app.use(handleBadRequestErrors)
app.use(handleServerErrors)


module.exports = app