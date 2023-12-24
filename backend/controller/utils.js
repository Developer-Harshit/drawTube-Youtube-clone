const { ObjectId } = require("mongodb");

const getObjectId = function (id, next) {
  let o_id;
  try {
    o_id = new ObjectId(id);
  } catch (err) {
    next(err);
    return null;
  }
  return o_id;
};

module.exports = {
  getObjectId,
};
