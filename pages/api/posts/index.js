import { connectToDatabase } from "../../../utill/mongodb";
import { Timestamp } from "mongodb";
import multer from "multer";

export const config = { api: { bodyParser: { sizeLimit: "4mb" } } }; // Set desired value here } } }

export default async function handler(req, res) {
  const { method, body } = req;

  const { db } = await connectToDatabase();
  // const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, "C:/Users/AamirMuhammadAmin/linkedinclone/public/images");
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, file.originalname + "- " + Date.now());
  //   },
  // });
  // const upload = multer({ dest: storage });

  if (method === "GET") {
    try {
      const posts = await db
        .collection("posts")
        .find()
        .sort({ timestamp: -1 })
        .toArray();
      res.status(200).json(posts);
    } catch (error) {
      res.status(5000).json(error);
    }
  }

  if (method === "POST") {
    try {
      const post = await db.collection("posts").insertOne({
        ...body,
        timestamp: new Timestamp(),
      });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
