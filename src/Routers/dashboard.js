const express = require("express");
const Sale = require("../models/sale");
const router = new express.Router();

router.get("/dashboard/totalSales", async (req, res) => {
  try {
    const totalSales = await Sale.countDocuments();
    res.send({totalSales});
  } catch (e) {
    res.status(500).send(e);
  }
});


router.get("/dashboard/todaySales", async (req, res) => {
    try {
      const todaySales = await Sale.count({Date: new Date("2019-07-01")});
      res.send({todaySales});
    } catch (e) {
      res.status(500).send(e);
    }
  });

  router.get("/dashboard/callBack", async (req, res) => {
    try {
      const todaySales = await Sale.count({name: 'anand'});
      res.send(todaySales);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  router.get("/dashboard/transfer", async (req, res) => {
    try {
      const todaySales = await Sale.count({name: 'anand'});
      res.send(todaySales);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  module.exports = router;