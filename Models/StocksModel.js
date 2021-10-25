const mongoose = require('mongoose')

const StockSchema = new mongoose.Schema({
    StockName: {type:String, required:true},
    Quantity: {type:Number, required:true},    //Amount of units left in the company
    Price: {type:Number, required:true}           //Company's price for selling its stocks
})

module.exports = mongoose.model("Stocks",StockSchema)