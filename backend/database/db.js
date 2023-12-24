const { MongoClient, GridFSBucket } = require("mongodb");
const state = {
  db: null,
  conn: null,
  bucket: null,
};
async function connectDB(url, done) {
  if (state.conn) return done();
  const client = new MongoClient(url);
  try {
    state.conn = await client.connect();
  } catch (err) {
    done(err);
  }
  console.log("Connected to DB");
  state.db = state.conn.db("test");
  state.bucket = new GridFSBucket(state.db, {
    bucketName: "videobucket",
    chunkSizeBytes: 1024 * 255,
  });

  done();
}
function getDB() {
  return state.db;
}
function getBucket() {
  return state.bucket;
}
module.exports = {
  connectDB,
  getBucket,
  getDB,
};
