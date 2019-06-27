const express = require('express')
const Sale = require('../models/sale')
const router =new express.Router()


router.get('/dashboard/totalSales',async (req,res)=>{

    try{
        const accessIps = await Sale.count()
          res.send(accessIps)
    } catch (e){
        res.status(500).send(e)
    }

}
)