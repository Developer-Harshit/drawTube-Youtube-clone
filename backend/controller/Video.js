const { getDB } = require("../database/db");
const cloudinary = require("cloudinary");
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
    secure: true,
});

const dbName = "videos";
function getPublicId(id) {
    return `drawtube/${dbName}/${id}`;
}

class Video {
    static async deleteCloudData(id) {
        return await cloudinary.v2.api.delete_resources([getPublicId(id)]);
    }
    static getCloudLink(fileid) {
        return (
            "https://res.cloudinary.com/" +
            process.env.CLOUD_NAME +
            "/video/upload/" +
            getPublicId(fileid) +
            ".mp4"
        );
    }

    static async uploadData(data) {
        const VideosCollection = getDB().collection(dbName);
        return await VideosCollection.insertOne(data);
    }
    static async uploadVideo(videoPath, fileid) {
        return await cloudinary.v2.uploader.upload(videoPath, {
            public_id: getPublicId(fileid),
            resource_type: "video",
            overwrite: true,
        });
    }
    static async getAll(from = 0, count = 10, findQuery = {}) {
        const VideosCollection = getDB().collection(dbName);

        let sortQuery = { date: 1 };
        return await VideosCollection.find(findQuery)
            .sort(sortQuery)
            .skip(parseInt(from))
            .limit(parseInt(count))
            .toArray();
    }

    static async findByID(id) {
        const VideosCollection = getDB().collection(dbName);
        const result = await VideosCollection.findOne({ _id: id });
        return result;
    }
    static async findByUID(uid) {
        const VideosCollection = getDB().collection(dbName);
        const result = await VideosCollection.find({
            uid: uid,
        }).toArray();
        return result;
    }
}
module.exports = Video;
