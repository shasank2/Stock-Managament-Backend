const express = require('express')
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json())

const mongoose = require('mongoose')
const uri = 'mongodb+srv://novelty:novelty@cluster0.mv5r6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("DB connected");
})

///////////////////////////////////////////////    ROUTERS     /////////////////////////////////////////
app.use('/', require('./Routers/DashboardRouter'))           //Homepage

app.use(require('./Routers/BuySellRouter'))

app.use(require('./Routers/TransactionRouter'))

app.use(require('./Routers/AdminRouter'))

app.listen(3001,()=>{
    console.log("Listening....")
})