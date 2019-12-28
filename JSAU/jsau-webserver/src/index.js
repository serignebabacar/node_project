'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const nunjucks = require('nunjucks')
const app = express()
//const fs = require('fs')
const my_shared_code_headless = require('./my_shared_code_headless')

app.use(cors())
app.use(bodyParser.json()) // Body parser use JSON data
app.use(bodyParser.urlencoded({extended: true}))
app.use('/static-files', express.static('static'))
//app.use(express.static(__dirname + '/public'))
//app.set('view engine', 'njk')
nunjucks.configure('views', {
    autoescape: true,
    express: app
})

// Param Serveur
let port = 5000
// READ
app.get('/', (req, res) => {
})
app.get('/info', (req, res) => {
    let k = 20
    let even_numbers = my_shared_code_headless.generateEvenNumbers(k)
    res.render('index.html', {data:'jsau-webserver-1.0.0', even:even_numbers, ko: k})

})

app.post('/', (req, res) => {
})
app.put('/user/:id', (req, res) => {

})
app.get('/:id', (req, res) => {
})
app.use((req, res, next)=> {
    res.render('index.html')
})

app.listen(port, () => {
    console.log('port' + port)
})

