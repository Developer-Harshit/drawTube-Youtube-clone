const express = require("express");
const { getDB } = require("../database/db");

const { getObjectId } = require("../controller/Utils");

const router = express.Router();

router.get("/", async (req, res) => {
  const VideoCollection = getDB().collection("video");
  // type: "all" | "partial"
  const { type, from, count } = req.query;
  let findQuery = {};
  let sortQuery = { _id: 1 };
  let output;
  if (type == "partial")
    output = await VideoCollection.find(findQuery)()
      .sort(sortQuery)
      .skip(parseInt(from))
      .limit(parseInt(count))
      .toArray();
  else output = await VideoCollection.find(findQuery).sort(sortQuery).toArray();

  res.json({ msg: "sucess", output });
});
router.get("/purge", async (req, res, next) => {
  const VideoCollection = getDB().collection("video");

  const output = await VideoCollection.deleteMany({ title: "" });

  res.json({ msg: "sucess", output });
});
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const o_id = getObjectId(id, next);
  if (!o_id) return;
  const VideoCollection = getDB().collection("video");

  const output = await VideoCollection.findOne({ _id: o_id });

  res.json({ msg: "sucess", output });
});

router.post("/", async (req, res, next) => {
  const { title, desc, animationid, length, userid, thumbnail } = req.body;

  const VideoCollection = getDB().collection("video");
  if (!getObjectId(userid, next)) return;
  if (!getObjectId(animationid, next)) return;

  const output = await VideoCollection.insertOne({
    title,
    desc,
    animationid,
    length,
    userid,
    thumbnail,
  });
  res.json({ msg: "sucess", output });
});

module.exports = router;
