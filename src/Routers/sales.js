const express = require("express");
const Sale = require("../models/sale");
const router = new express.Router();

router.post("/sales", async (req, res) => {
  const sale = new Sale(req.body);

  try {
    await sale.save();
    res.status(201).send(sale);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/sales", async (req, res) => {
  try {
    const sales = await sale.find({});
    res.send(sale);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/sales/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["FullName", "ContactNumber", "Status"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates" });
  }

  try {
    const sale = await Sale.findById(req.params.id);

    updates.forEach(update => (sale[update] = req.body[update]));
    await sale.save();

    // const user = await User.findByIdAndUpdate(req.params.id,req.body,{ new:true , runValidators:true})

    if (!sale) {
      return res.status(404).send();
    }
    res.send(sale);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/sales/:id", async (req, res) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id);

    if (!sale) {
      return res.status(404).send();
    }
    res.send(sale);
  } catch (e) {
    res.status(400).send(e);
  }
});
module.exports = router;
