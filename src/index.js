const express = require('express')
const passport = require('passport');
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const session = require("express-session");
require('./db/mongoose')

const userRouter = require('./Routers/user')
const salesRouter = require('./Routers/sales')
const accessIpRouter = require("./Routers/accessIp")
const cardDetailRouter = require("./Routers/cardDetail")
const dashboardRouter = require("./Routers/dashboard")
const authRouter = require('./Routers/auth')
const setUpPassport = require("./setuppassport");

const app = express()
const port = process.env.PORT || 3000

setUpPassport();

app.use(cookieParser());
app.use(session({
    secret: "LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t",
    resave: true,
    saveUninitialized: true
  }));
  
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json())
app.use(authRouter)
app.use(userRouter)
app.use(salesRouter)
app.use(accessIpRouter)
app.use(cardDetailRouter)
app.use(dashboardRouter)




app.listen(port, ()=>{
    console.log('Server is up ' + port)
})