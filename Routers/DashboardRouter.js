const router = require('express').Router()
const userInfo = require('../Models/UserInfo')
//const Stockmodel = require('../Models/StocksModel')          ////Just for test

/////// Home page   /////////
router.get('/', async (req,res)=>{
    try {  
        let val = await userInfo.find({}).populate('StockName')
        res.send(val)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;