const router = require('express').Router()
const StockSchema = require('../Models/StocksModel')
const UserInfoSchema = require('../Models/UserInfo')

router.get('/Admin', (req,res)=>{
    res.send("Admin page to add Stocks")
})

router.post('/Admin', async (req,res)=>{
    console.log(req.body)
    let StockID , Lquantity, Lprice;    //L for Local varaibles
    try {
        let SelectedStock = await StockSchema.create({
            StockName:req.body.StockName,
            Quantity:Number(req.body.Quantity),
            Price:Number(req.body.Price)
        })
        StockID = SelectedStock._id
        Lquantity = SelectedStock.Quantity
        Lprice = SelectedStock.Price
        console.log("Stock created")
    } catch (error) {
        console.log(error)
    }
    try{
        await UserInfoSchema.create({
            StockName: StockID,
            TotalUnits:0,
            TotalInvestment:0,
            SoldAmount:0,
            OverallProfit:0,
            CurrentAmount: Lquantity * Lprice
        })
    } catch (error) {
        console.log(error)
    }
})

// router.get('/AdminCheck', (req,res)=>{
//     UserInfoSchema.find({},(err,result)=>{
//         result.populate('StockName').exec()
//     })
// })


module.exports = router;