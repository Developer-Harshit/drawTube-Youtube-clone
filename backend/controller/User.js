const { getDB } = require("../database/db");
const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const cloudinary = require("cloudinary");
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
    secure: true,
});
const dbName = "users";
function getPublicId(id) {
    return `drawtube/${dbName}/${id}`;
}
class User {
    static async findByID(id) {
        const UsersCollection = getDB().collection(dbName);
        return await UsersCollection.findOne({
            _id: id,
        });
    }
    static async findByTag(userhandle) {
        const UsersCollection = getDB().collection(dbName);
        return await UsersCollection.findOne({
            handle: userhandle,
        });
    }
    static async uploadData(data) {
        const UsersCollection = getDB().collection(dbName);
        return await UsersCollection.insertOne(data);
    }
    static async uploadPNG(dataUri, fileid) {
        return await cloudinary.v2.uploader.upload(dataUri, {
            public_id: getPublicId(fileid),
            resource_type: "image",
            overwrite: true,
        });
    }
    static async encrypt(text) {
        return await bcrypt.hash(text, saltRounds);
    }
    static async compare(text, hashed_text) {
        return await bcrypt.compare(text, hashed_text);
    }
    static getLink(fileid) {
        return (
            "https://res.cloudinary.com/" +
            process.env.CLOUD_NAME +
            "/image/upload/" +
            getPublicId(fileid) +
            ".png"
        );
    }
    static async updateData(uid, setData) {
        const updateQuery = {
            $set: setData,
        };
        const UsersCollection = getDB().collection(dbName);
        return await UsersCollection.updateOne({ _id: uid }, updateQuery);
    }
}
module.exports = User;
