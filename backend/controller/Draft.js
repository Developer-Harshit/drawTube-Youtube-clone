const { getDB } = require("../database/db");
const cloudinary = require("cloudinary");
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
    secure: true,
});

const dbName = "drafts";
function getPublicId(id) {
    return `drawtube/${dbName}/${id}.json`;
}

class Draft {
    static async deleteJSON(id) {
        return await cloudinary.v2.api.delete_resources([getPublicId(id)]);
    }

    static async uploadData(data) {
        const DraftsCollection = getDB().collection(dbName);
        return await DraftsCollection.insertOne(data);
    }
    static async uploadJSON(dataUri, fileid) {
        return await cloudinary.v2.uploader.upload(dataUri, {
            public_id: getPublicId(fileid),
            resource_type: "raw",
            overwrite: true,
        });
    }
    static getLink(fileid) {
        return (
            "https://res.cloudinary.com/" +
            process.env.CLOUD_NAME +
            "/raw/upload/" +
            getPublicId(fileid)
        );
    }
    static async getOneByID(id) {
        const DraftsCollection = getDB().collection(dbName);
        const result = await DraftsCollection.findOne({ _id: id });
        return result;
    }
    static async getOneByUID(id, uid) {
        const DraftsCollection = getDB().collection(dbName);
        const result = await DraftsCollection.findOne({
            _id: id,
            uid: uid,
        });
        return result;
    }
    static async getAllByUID(uid) {
        const DraftsCollection = getDB().collection(dbName);
        return await DraftsCollection.find({ uid: uid }).toArray();
    }
}
module.exports = Draft;
