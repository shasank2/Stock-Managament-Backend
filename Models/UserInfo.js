const mongoose = require('mongoose')
const Stocks = require('./StocksModel')

////////////////////////////////////////FOR DASHBOARD PAGE/////////////////////////////////////////////

const UserInfoSchema = new mongoose.Schema({
    StockName: {type:mongoose.Schema.Types.ObjectId, ref: 'Stocks'},  //Ref form StocksModel.js
    TotalUnits: {type:Number, required:true},               //How much stocks he owns of that company
    TotalInvestment: {type:Number, required:true},           //How much money he has used to buy stocks
    SoldAmount: {type:Number, required:true},                // Keep adding sold Stocks * SellRate (when transaction of sell is made)
    OverallProfit: {type:Number, requried:true},             //TotalInvestment - SoldAmount
    CurrentAmount: {type:Number, required:true}                
                                                                //Calculate these values in POST request  
})

module.exports = mongoose.model('UserInfo', UserInfoSchema)