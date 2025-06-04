const express = require('express')
const db = require('./db/connection')
const endpointsJSON = require('./endpoints.json')

const app = express()

app.get('/api', (req, res)=>{
    res.status(200).send({endpoints: endpointsJSON})
})


module.exports = app