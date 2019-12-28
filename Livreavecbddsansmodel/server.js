'use strict'
let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')
let mongoose = require('mongoose')
app.set('view engine', 'ejs')

//mongoose.connect('mongodb://localhost/objetLoove')
mongoose.connect('mongodb://localhost/Objet', {useNewUrlParser: true})
// eslint-disable-next-line new-cap
let objetSchema = mongoose.Schema({
    nom : String,
    type : String,
    description : String
})
let Objet = mongoose.model('Objet', objetSchema)
//Middlewares
app.use('/assets', express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(session({
    secret: 'dcdccdcdc',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))
app.use(require('./middlewares/flash'))

//Routes
app.get('/', (req, res) => {
    Objet.find((err, objets) => {
        if (err) {
            console.error(err)
        }
        res.render('pages/index', {objets})
    })
})
app.get('/pages/donnees', (req, res) => {
    Objet.find((err, objets) => {
        if (err) {
            console.error(err)
        }
        res.render('pages/donnees', {objets})
    })
})
app.get('/remove/:id', (req, res) => {
    Objet.remove({_id: req.params.id}, (err) => {
        if (err) {
            console.error(err)
        }
        res.redirect('/')
    })
})
app.post('/', (req, res) => {
    if (req.body.nom === undefined || req.body.nom === '' || req.body.type === undefined || req.body.type === '') {
        req.flash('error', "le nom et le type de l'objet sont obligatoires ")
        res.redirect('/')
    } else {
        let objet = new Objet()
        objet.nom = req.body.nom
        objet.type = req.body.type
        objet.description = req.body.description
        objet.save((err) => {
            if (err) {
                console.error(err)
                return
            }
            res.redirect('/')

        })
    }

})

app.listen(8081)