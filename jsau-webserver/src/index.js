'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const nunjucks = require('nunjucks')
const app = express()
const fs = require('fs')

app.use(cors())
app.use(bodyParser.json()) // Body parser use JSON data
app.use(bodyParser.urlencoded({extended: true}))


nunjucks.configure('views', {
    autoescape: true,
    express: app
})

// Param Serveur
let port = 3000

const dataPath = 'fichierTest.json'

const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            throw err
        }
        callback(returnJson ? JSON.parse(data) : data)
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
        res.render('index.html', {items:data})
    })
})


app.post('/user', (req, res) => {

    readFile((data) => {
        let k = 0
        let dab = data
        let tab_ids = []
        for (let i = 0;i < dab.length;i++) {
            tab_ids[i] = dab[i].id
            if (dab[i].id == req.body.id) {
                k = 1
            }
        }
        if (k === 1) {
            res.status(409).send('user exist deja ')
        } else {
            req.body.id = Math.max(...tab_ids) + 1
            dab.push(req.body)
            writeFile(JSON.stringify(dab, null, 2), () => {
                res.status(201).send('new user added')
            })
        }

    },
    true)
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
app.get('/delete/:id', (req, res) => {

    readFile((data) => {
        let k = 0
        let dab = data
        let userId = req.params.id
        for (let i = 0;i < dab.length;i++) {

            if (dab[i].id == userId) {
                dab.splice(i, 1)
                k = 1
            }
        }
        if (k === 1) {
            writeFile(JSON.stringify(dab, null, 2), () => {
                //res.render('index.html', {items:dab})
                //res.render('index.html', {items:dab})
                res.send("suppression reussie ")
            })
        }

    },
    true)
})

app.listen(port, () => {
})

