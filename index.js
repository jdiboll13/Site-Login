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

const login = (req, res, next) => {
  if (req.body.username === 'JohnnyRico' && req.body.password === 'Roughnecks123') {
    next()
  } else {
    res.redirect('/login')
  }
}

app.get('/login', (req, res) => {
  res.render('login')
})

app.use(login)

app.post('/', (req, res) => {
  res.render('index', req.body)
})

app.listen(3000, () => {
  console.log("Let's do this!")
})
