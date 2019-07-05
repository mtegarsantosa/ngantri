const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const http = require('http').Server(app)
const io = require('socket.io')(http)
const db = require('./conn')
const view_format = 'hbs'
app.use(bodyParser.json())
app.use(cookieParser())

io.on('connection',(socket)=>{
  console.log('socket connected')

  app.post('/voice', (req,res)=>{
    io.sockets.emit('voice',req.body.voice)
  })
})
// handlebars
const exphbs = require('express-handlebars')
app.engine(view_format, exphbs({
  extname:view_format,
  partialsDir: path.join(__dirname,'app','views','partials')
}))
app.set('view engine', view_format)
app.set('views', path.join(__dirname,'app','views'))

// route
app.use('/assets',express.static(path.join(__dirname,'public')))
app.use('/', require(__dirname+'/route'))

// server
http.listen(3000, ()=>{
  console.log('server njalan di lobang 3000..')
})
