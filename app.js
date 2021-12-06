const express=require('express')
require('dotenv').config({path:"./config/config.env"})
const http =require('http')
const path=require('path')
const morgan=require('morgan')
const { engine }=require('express-handlebars')
const passport=require('passport')
const session=require('express-session')
const connectDB=require('./config/db')
const router=require('./routes/index')
const passportRouter=require('./routes/auth')

require('./config/passport')

connectDB()

const app=express()
//Morgan Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }

// Handlebars
app.engine('.hbs', engine({defaultLayout:'main',extname: '.hbs'}));
app.set('view engine', '.hbs');

// Session
app.use(session({secret:"MudunchaKandupidi",resave:false,saveUninitialized:true}))

// Passport Middlewares
app.use(passport.initialize())
app.use(passport.session())

// Router
app.use('/',router)
app.use('/auth',passportRouter)
 
// Server
const server=http.createServer(app)
const port=process.env.PORT

server.listen(port,()=>{
    console.log(`Server is Running on port ${port}`)
})