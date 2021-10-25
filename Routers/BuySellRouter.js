const router = require('express').Router()
const UserInfoSchema = require('../Models/UserInfo')
const StockSchema = require('../Models/StocksModel')
const TransactionSchema = require('../Models/TransactionsModel')

let ForTotalInvestment, ForSoldAmount, ForOverallProfit, ForCurrentAmount, ForQuantity

router.get('/BuySell', async (req, res) => {
    try {
        let val = await UserInfoSchema.find({}).populate('StockName')
        res.send(val)
    } catch (error) {
        console.log(error)
    }
})

router.post('/BuySell', async (req, res) => {
    let l_item_id = req.body.Selected[0]

    // CONDITION FOR BUYING
    if (req.body.Switch == true) {
        ForTotalInvestment = req.body.Quantity * req.body.price
        //console.log(ForTotalInvestment,ForQuantity)
        try {
            StockSchema.findByIdAndUpdate(l_item_id.StockName._id, {
                $inc: {
                    Quantity: -(req.body.Quantity)
                }
            }, { new: true }).exec()
        } catch (error) {
            console.log(error)
        }
        try {
            UserInfoSchema.findByIdAndUpdate(l_item_id._id, {
                $inc: {
                    TotalUnits: req.body.Quantity,
                    TotalInvestment: Math.abs(ForTotalInvestment)
                },
            }).exec()
        } catch (error) {
            console.log(error)
        }
        //Find Stock again to re calculate amount
        try {
            StockSchema.findById(l_item_id.StockName._id).exec((err, val) => {
                ForCurrentAmount = val.Quantity * val.Price
                console.log(ForCurrentAmount)
            })
        } catch (error) {
            console.log(error)
        }

        //Find Stock again to calculate Overall profit
        try {
            UserInfoSchema.findById(l_item_id._id).exec((err, val) => {
                ForOverallProfit = val.TotalInvestment - val.SoldAmount
            })
        } catch (error) {
            console.log(error)
        }
        //Finally updating UserInfo with OverallProfit and CurrentAmount
        // try {
        //     await UserInfoSchema.findByIdAndUpdate(l_item_id._id, {
        //         $inc: {
        //             CurrentAmount : -ForCurrentAmount
        //             //OverallProfit : ForOverallProfit
        //         },
        //     }).exec()
        // } catch (error) {
        //     console.log(error)
        // }


    }

    // CONDITION FOR SELLING
    else {
        ForSoldAmount = req.body.Quantity * req.body.price
        //console.log(ForSoldAmount,ForQuantity)
        try {
            StockSchema.findByIdAndUpdate(l_item_id.StockName._id, {
                $inc: {
                    Quantity: req.body.Quantity
                }
            }, { new: true }).exec()
        } catch (error) {
            console.log(error)
        }
        try {
            UserInfoSchema.findByIdAndUpdate(l_item_id._id, {
                $inc: {
                    TotalUnits: -(req.body.Quantity),
                    SoldAmount: Math.abs(ForSoldAmount)
                },
            }).exec()
        } catch (error) {
            console.log(error)
        }

        //Find Stock again to re-calculate amount
        try {
            StockSchema.findById(l_item_id.StockName._id).exec((err, val) => {
                ForCurrentAmount = val.Quantity * val.Price
            })
        } catch (error) {
            console.log(error)
        }
        //Find Stock again to calculate Overall profit
        try {
            UserInfoSchema.findById(l_item_id._id).exec((err, val) => {
                ForOverallProfit = val.TotalInvestment - val.SoldAmount
                console.log(ForOverallProfit)
            })
        } catch (error) {
            console.log(error)
        }

        // try {
        //     UserInfoSchema.findByIdAndUpdate(l_item_id._id, {
        //         $inc: {
        //             CurrentAmount : ForCurrentAmount,
        //             OverallProfit : ForOverallProfit
        //         },
        //     }).exec()
        // } catch (error) {
        //     console.log(error)
        // }
    }

    try {
        await TransactionSchema.create({
            StockName: l_item_id.StockName.StockName,
            TransactionType: req.body.Switch? 'Buy':'Sell',
            Quantity: req.body.Quantity,
            Price: req.body.price,
            Date: new Date()
        })
    } catch (error) {
        console.log(error)
    }

})

module.exports = router;