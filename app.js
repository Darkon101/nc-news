const express = require('express')
const db = require('./db/connection')
const endpointsJSON = require('./endpoints.json')
const { getTopics } = require('./controllers/topics.controller')
const { getArticles, getArticleById, patchArticleById} = require('./controllers/articles.controller')
const { getUsers } = require('./controllers/users.controller')
const { handleCustomErrors, handleServerErrors, handlePSQLErrors } = require('./errors')
const { getCommentsById, postCommentById } = require('./controllers/comments.controller')



const app = express()
app.use(express.json())

app.get('/api', (req, res)=>{
    res.status(200).send({endpoints: endpointsJSON})
})

app.get('/api/topics', getTopics)

app.get('/api/articles', getArticles)

app.get('/api/users', getUsers)

app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles/:article_id/comments', getCommentsById)

app.post('/api/articles/:article_id/comments', postCommentById)

app.patch('/api/articles/:article_id', patchArticleById)

app.use(handleCustomErrors)
app.use(handlePSQLErrors)
app.use(handleServerErrors)


module.exports = app