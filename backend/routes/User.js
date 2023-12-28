const express = require("express");

const { getDB } = require("../database/db");
const router = express.Router();
const { getObjectId } = require("../controller/Utils");

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const o_id = getObjectId(id, next);
  if (!o_id) return;
  const UserCollection = getDB().collection("users");

  const output = await UserCollection.findOne({ _id: o_id });

  res.json({ msg: "sucess", output });
});
router.post("/log", async (req, res) => {
  // gets email and password , verifies them and then returns jwt ,abd user info
  // access email ,password
  const { email, password } = req.body;
  // parse password
  const parsedPassword = password;

  // verify them in db and gets userdata - username,email,password,profileUrl
  const UserCollection = getDB().collection("users");
  const user = await UserCollection.findOne({
    email,
  });

  if (!user) return res.status(404).json({ msg: "user not found" });

  if (!(user.password == parsedPassword))
    return res.status(404).json({ msg: "password is incorrect" });

  // generates jwt token

  //attaches jwt
  user.password = null;

  // returns userdata and
  res.json({ msg: "sucess", user });
});

router.post("/sign", async (req, res) => {
  // get email password ,profile url and stores them in db
  const { username, email, password, image } = req.body;
  // parse password
  const parsedPassword = password;
  // check if user already exist
  const UserCollection = getDB().collection("users");
  const existingUser = await UserCollection.findOne({
    email,
  });
  if (existingUser) return res.status(404).json({ msg: "user already exist" });

  // creates new user
  const user = await UserCollection.insertOne({
    username,
    email,
    password: parsedPassword,
    image,
  });

  // generates jwt token

  //attaches jwt

  // returns userdata and
  res.json({ msg: "sucess", user });
});

module.exports = router;
