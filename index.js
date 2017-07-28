const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  req.checkBody('login', '*You must login to access this site.').notEmpty()
  req.checkBody('password', '*Please provide a password.').notEmpty()

  const errors = req.validationErrors()
  console.log(errors)
  if (errors) {
    res.render('login', { errors: errors })
  } else {
    res.render('index', { login: req.body.login })
  }
})

app.listen(3000, () => {
  console.log("Let's do this!")
})
