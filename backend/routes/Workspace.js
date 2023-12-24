// Express router
const fs = require("fs");

const express = require("express");
const { getDB } = require("../database/db");
const { ObjectId } = require("mongodb");
const router = express.Router();

router.get("/", async (req, res) => {
  const WorkspaceCollection = getDB().collection("drafts");

  const output = await WorkspaceCollection.find({}).toArray();

  res.json({ msg: "sucess", output });
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  let o_id;
  try {
    o_id = new ObjectId(id);
  } catch (err) {
    res.status(404).json({ msg: "data not found" });
    return;
  }
  const WorkspaceCollection = getDB().collection("drafts");
  const output = await WorkspaceCollection.findOne({ _id: o_id });
  res.json({ msg: "sucess", output });
});

router.post("/:id", async (req, res) => {
  const { userid, images } = req.body;

  // update data using the workspace id
  const { id } = req.params;

  const WorkspaceCollection = getDB().collection("drafts");
  const output = await WorkspaceCollection.insertOne({
    userid,
    imageUrls: images,
  });
  res.json({ msg: "sucess", output });
});

module.exports = router;
