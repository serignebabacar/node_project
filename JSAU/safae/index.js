'use strict'
const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')

const app = express()
const fs = require('fs')

app.use(cors())
app.use(bodyParser.json()); // Body parser use JSON data
app.use(bodyParser.urlencoded({ extended: true }));

// Param Serveur
let port = 3000
let mesroutes = express.Router()



const dataPath = 'fichierTest.json';

const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
 fs.readFile(filePath, encoding, (err, data) => {
    if (err) {
        res.writeHead(500);
        throw err;
 }
 callback(returnJson ? JSON.parse(data) : data);
 });
};

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

fs.writeFile(filePath, fileData, encoding, (err) => {
    if (err) {
        throw err;
    }
    callback();
 });
};

// READ
app.get('/', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        res.send(JSON.parse(data));
    });
});
app.get('/user/:id', (req, res) => {
    readFile((data) => {
        let k = 0
        let dab = data
        let data2=[];
        let userId = req.params.id
        for (let i = 0;i < dab.length;i++) {

            if (dab[i].id == userId) {
                k = i
                data2=dab[i];
            }
        }
        if (k) {
            res.send(data2);
        } else {
            res.status(400).send('cet utilisateur nexsiste pas')
        }

    },
    true)
 });
app.post('/user', (req, res) => {

    readFile(data => {
        var k =0;
        var dab = data;
        const newUserId = Object.keys(data).length + 1;
        dab.push(req.body);
        writeFile(JSON.stringify(dab, null, 2), () => {
            res.status(201).send('new user added');
        });
        
    },
    true);
 });
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

    },
    true)
 });
 app.delete('/user/:id', (req, res) => {

    readFile(data => {
        var k =0;
        var dab = data;
        var userId = req.params.id;
        for(var i=0;i<dab.length;i++ ){
           
            if(dab[i].id==userId){
                dab.splice(i, 1)
                k=1;
            }
        }
        if(k===1){
            writeFile(JSON.stringify(dab, null, 2), () => {
                res.status(200).send('suppression reussie');
            });
        }else{
            res.status(400).send('cet utilisateur nexsiste pas');
        }
        
    },
    true);
 });

app.use(mesroutes)
app.listen(port, function () {
    console.log('Example app listening on port ' + port)
})
