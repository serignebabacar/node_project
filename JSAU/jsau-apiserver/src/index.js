'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const fs = require('fs')
const jsauNews = require('jsau-news')

app.use(cors())
app.use(bodyParser.json()) // Body parser use JSON data
app.use(bodyParser.urlencoded({extended: true}))

// Param Serveur
let port = 8080

const dataPath = 'fichierTest.json'

const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        callback(returnJson ? JSON.parse(data) : data)
    })
}

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

    fs.writeFile(filePath, fileData, encoding, (err) => {
        if (err) {
            console.error(err)
            return
        }
        callback()
    })
}

// READ
app.get('/news', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            res.sendStatus(500)
            return
        }
        console.log(jsauNews.categories)
        res.json(JSON.parse(data))
    })
})
app.get('/news/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            res.sendStatus(500)
            return
        }
        let k = 0
        let dab = JSON.parse(data)
        let data2 = []
        let userId = req.params.id
        for (let i = 0;i < dab.length;i++) {
            if (dab[i].id == userId) {
                k = i
                data2 = dab[i]
            }
        }
        if (k) {
            res.send(data2)
        } else {
            res.status(400).send('cet utilisateur nexsiste pas')
        }
    })
})

app.post('/news', (req, res) => {
    readFile((data) => {
        let dab = data
        let tab_ids = []
        for (let i = 0;i < dab.length;i++) {
            tab_ids[i] = dab[i].id
        }
        req.body.id = Math.max(...tab_ids) + 1
        if (jsauNews.validate(req.body.contenu)) {
            console.log('ok')
        }
        console.log(tab_ids)
        if (req.body.id == '-Infinity') {
            req.body.id = 1
        }
        dab.push(req.body)
        writeFile(JSON.stringify(dab, null, 2), () => {
            res.status(201).send('new user added')
        })

    },
    true)
})
app.put('/news/:id', (req, res) => {

    readFile((data) => {
        let k = 0
        let dab = data
        let userId = req.params.id
        for (let i = 0;i < dab.length;i++) {

            if (dab[i].id == userId) {
                req.body.id = userId
                dab[i] = req.body
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
app.delete('/news/:id', (req, res) => {

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
                res.status(200).send('suppression reussie')
            })
        } else {
            res.status(400).send('cet utilisateur nexsiste pas')
        }

    },
    true)
})

app.listen(port, () => {
    console.log('port ' + port)
})

