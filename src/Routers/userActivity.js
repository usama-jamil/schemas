const express = require("express");
const UserActivity = require("../models/userActivity");
const router = new express.Router();

router.post("/userActivities", async (req, res) => {
  const userActivity = new UserActivity(req.body);
  try {
    await userActivity.save();
    res.status(201).send(userActivity);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/userActivities", async (req, res) => {
  try {
    const userActivity = await UserActivity.find({});
    res.send(userActivity);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/userActivities/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const userActivity = await UserActivity.findById(_id);
    console.log(userActivity);

    if (!userActivity) {
      return res.status(404).send();
    }
    res.status(201).send(userActivity);
  } catch (e) {
    res.status(500).send(e);
  }
  // users.findById(_id).then users=>{
  //     res.status(201).send users)
  // }).catch(err =>{
  //     res.status(500).send(err)
  // })
});

router.delete("/userActivities/:id", async (req, res) => {
  try {
    const userActivity = await UserActivity.findByIdAndDelete(req.params.id);

    if (!userActivity) {
      return res.status(404).send();
    }
    res.send(userActivity);
  } catch (e) {
    res.status(400).send(e);
  }
});
