'use strict'

// create instance of express
const express = require('express')
const app = express()

/* create instance of express
const morgan = require('morgan')
app.use(morgan('dev')) */

/* import this package in your project
 and tell Express to use this as middle-ware
(pour manipuler post) */
const bodyParser = require('body-parser')


//include file system(write,readFile..)
const fs = require('fs')

let cors = require('cors')
app.use(cors())

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json())// Body parser use JSON data
app.use(bodyParser.urlencoded({extended: true}))


// Param Serveur
let port = 1500
let mesroutes = express.router()


const dataPath = 'fichierTest.json'
const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            //res.writeHead(500)
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


// call get method
app.get('/', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err
        }
        res.send(JSON.parse(data))
    })
})


// call get method (Read par un id)
app.get('/user/:id', (req, res) => {
    readFile((data) => {
        let k = 0
        let dab = data
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

    }, true)

})
// call POST method
app.post('/user', (req, res) => {

    readFile(data => {
        //let k = 0
        let dab = data
        //let newUserId = Object.keys(data).length + 1
        dab.push(req.body)
        writeFile(JSON.stringify(dab, null, 2), () => {
            res.status(201).send('new user added')
        })

    })
})


// call PUT method
app.put('/user/:id', (req, res) => {
    readFile((data) => {
        let k = 0
        let dab = data
        let userId = req.params.id
        for (let i = 0;i < dab.length;i++) {
            if (dab[i].id == userId) {
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

    }, true)
})
// call DELETE method
app.delete('/user/:id', (req, res) => {
    readFile( data => {
        let k = 0
        let dab = data
        let userId = req.params.id
        for (let i = 0; i < dab.length;i++) {
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

    }, true)
})

app.use(mesroutes)
app.listen(port)
