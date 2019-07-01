const express = require("express");
const AccessIp = require("../models/accessIp");
const router = new express.Router();

router.post("/accessIp", async (req, res) => {
  const accessIp = new AccessIp(req.body);
      console.log(accessIp)
  try {
    await accessIp.save();
    res.status(201).send(accessIp);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/accessIp", async (req, res) => {
  try {
    const accessIps = await AccessIp.find({});
    res.send(accessIps);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/accessIp/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const accessIp = await AccessIp.findById(_id);

    if (!accessIp) {
      return res.status(404).send();
    }
    res.status(201).send(accessIp);
  } catch (e) {
    res.status(500).send(e);
  }
  // users.findById(_id).then users=>{
  //     res.status(201).send users)
  // }).catch(err =>{
  //     res.status(500).send(err)
  // })
});
router.patch("/accessIp/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["ip","access"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates" });
  }

  try {
    const accessIp = await AccessIp.findById(req.params.id);

    updates.forEach(update => (accessIp[update] = req.body[update]));
    await accessIp.save();

    // const user = await User.findByIdAndUpdate(req.params.id,req.body,{ new:true , runValidators:true})

    if (!accessIp) {
      return res.status(404).send();
    }
    res.send(accessIp);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/accessIp/:id", async (req, res) => {
  try {
    const accessIp = await AccessIp.findByIdAndDelete(req.params.id);

    if (!accessIp) {
      return res.status(404).send();
    }
    res.send(accessIp);
  } catch (e) {
    res.status(400).send(e);
  }
});
module.exports = router;
