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
