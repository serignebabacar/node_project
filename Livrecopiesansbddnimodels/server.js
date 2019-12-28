'use strict'
let  express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')
var mongoose = require('mongoose')
app.set('view engine', 'ejs')

//mongoose.connect('mongodb://localhost/objetLoove')
mongoose.connect('mongodb://localhost/objetLoove', {useNewUrlParser: true});
var ObjetSchema = mongoose.Schema({
    nomObjet : String,
    typeObjet : String ,
    poidsObjet : Number
})
var Objet = mongoose.model('Objet',ObjetSchema)

//Middlewares
app.use('/assets',express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(session({
    secret: 'dcdccdcdc',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

app.use(require('./middlewares/flash'))

//Routes
app.get('/', (req, res) => {
    console.log(req.session.flash)
    res.render('pages/index')
})
app.post('/', (req, res) => {
    
    if(req.body.message === undefined  || req.body.message === ''){
        req.flash('error',"vous n'avez pas postez de message")
        res.redirect('/')
    }
})

app.listen(8082)
