const express = require("express");
const { getDB } = require("../database/db");

const { getObjectId } = require("../controller/Utils");

const router = express.Router();

router.get("/", async (req, res) => {
  const DraftCollection = getDB().collection("drafts");

  const output = await DraftCollection.find({}).toArray();

  res.json({ msg: "sucess", output });
});
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const o_id = getObjectId(id, next);
  if (!o_id) return;
  const DraftCollection = getDB().collection("drafts");

  const output = await DraftCollection.findOne({ _id: o_id });

  res.json({ msg: "sucess", output });
});

router.post("/", async (req, res, next) => {
  const { editorid, images } = req.body;

  if (!getObjectId(id, next)) return;
  const DraftCollection = getDB().collection("drafts");

  const output = await DraftCollection.insertOne({ editorid, images });
  res.json({ msg: "sucess", output });
});

router.put("/:id", async (req, res, next) => {
  const { images } = req.body;
  const { id } = req.params;
  const o_id = getObjectId(id, next);
  if (!o_id) return;
  const DraftCollection = getDB().collection("drafts");
  const output = await DraftCollection.updateOne(
    { _id: o_id },
    {
      $set: { images },
    }
  );
  res.json({ msg: "sucess", output });
});

module.exports = router;
