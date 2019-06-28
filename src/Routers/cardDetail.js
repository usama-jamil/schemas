const express = require("express");
const CardDetail = require("../models/cardDetail");
const router = new express.Router();

router.post("/cardDetail", async (req, res) => {
  const cardDetail = new CardDetail(req.body);
  try {
    await cardDetil.save();
    res.status(201).send(cardDetail);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/cardDetail", async (req, res) => {
  try {
    const cardDetail = await CardDetail.find({});
    res.send(cardDetail);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.patch("/cardDetail/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates" });
  }

  try {
    const cardDetail = await CardDetail.findById(req.params.id);

    updates.forEach(update => (cardDetail[update] = req.body[update]));
    await cardDetail.save();

    // const cardDetail = await cardDetail.findByIdAndUpdate(req.params.id,req.body,{ new:true , runValidators:true})

    if (!cardDetail) {
      return res.status(404).send();
    }
    res.send(cardDetail);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/cardDetail/:id", async (req, res) => {
  try {
    const cardDetail = await CardDetail.findByIdAndDelete(req.params.id);

    if (!cardDetail) {
      return res.status(404).send();
    }
    res.send(cardDetail);
  } catch (e) {
    res.status(400).send(e);
  }
});
module.exports = router;
