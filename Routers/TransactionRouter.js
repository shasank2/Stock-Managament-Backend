const router = require('express').Router()
const TransactionSchema = require('../Models/TransactionsModel')

const userInfo = require('../Models/UserInfo')

router.get('/Transaction', async (req,res)=>{
    try {
        let val = await TransactionSchema.find({})
        res.send(val)

    } catch (error) {
        console.log(error)
    }
})

module.exports = router