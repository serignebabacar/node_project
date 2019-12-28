'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const nunjucks = require('nunjucks')
const app = express()
const fs = require('fs')
var router = express.Router()


app.use(cors())
app.use(bodyParser.json()) // Body parser use JSON data
app.use(bodyParser.urlencoded({extended: true}))
app.use('/static-files', express.static('static'))

app.set('view engine', 'njk')
nunjucks.configure('views', {
    autoescape: true,
    express: app
})

// Param Serveur
let port = 8082
let tableau = []
const dataPath = 'fichierTest.json'

router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
  });
const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            throw err
        }
        callback(JSON.parse(data))
    })
}

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

    fs.writeFile(filePath, fileData, encoding, (err) => {
        if (err) {
            throw err
        }
        callback()
    })
}

// READ
app.get('/info', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err
        }
        data = JSON.parse(data)
        res.render('index.njk', {items:data})
    })
})


app.post('/', (req, res) => {

    readFile((data) => {
        tableau = data
        let tab_ids = []
        for (let i = 0;i < tableau.length;i++) {
            tab_ids[i] = tableau[i].id
        }
        req.body.id = Math.max(...tab_ids) + 1
        if (req.body.id == '-Infinity') {
            req.body.id = 1
        }
        if (!req.body.nomNouvel && !req.body.contenu) {
            res.render('index')
        } else {
            tableau.push(req.body)
            writeFile(JSON.stringify(tableau, null, 2), () => {
                data = []
                res.render('index', {items: tableau})
            })
        }
    }, true)
})
app.put('/user/:id', (req, res) => {

    readFile((data) => {
        let k = 0
        let dab = data
        let userId = req.params.id
        for (let i = 0;i < dab.length;i++) {

            if (dab[i].id == userId) {
                dab[i].nomNouvel = req.body.nomNouvel
                dab[i].contenu = req.body.contenu
                k = 1
            }
        }
        if (k === 1) {
            writeFile(JSON.stringify(dab, null, 2), () => {
                res.status(200).send('modification effectue avec succes')
            })
        } else {
            res.status(400).send('cet utilisateur nexsiste pas')
        }

    },
    true)
})
app.get('/:id', (req, res) => {

    readFile((data) => {
        tableau = data
        let userId = req.params.id
        for (let i = 0;i < tableau.length;i++) {

            if (tableau[i].id == userId) {
                tableau.splice(i, 1)
                writeFile(JSON.stringify(tableau, null, 2), () => {
                    res.render('index', {items : tableau})
                })
            }
        }
    }, true)
})
app.use((req, res, next)=> {
    res.render('index')
})

app.listen(port, () => {
    console.log('port '+ port)
})

