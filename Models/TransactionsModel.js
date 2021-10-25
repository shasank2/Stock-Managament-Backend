const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    StockName: {type: String}, //Ref from StocksModel.js
    TransactionType: {type:String, enum: ['Buy','Sell']},
    Quantity: {type:Number },
    Price: {type:Number},
    Date: {type:Date}
})

module.exports =  mongoose.model("Transaction", TransactionSchema);