import express from "express";
//import { ObjectId } from 'mongodb';
import { getClient } from "../db";
import Post from "../models/Post";

//creates a new router object
const routes = express.Router();

routes.get("/shoutouts", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<Post>("shoutOuts")
      .find()
      .toArray();
    res.json(results);
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

routes.post("/shoutouts", async (req, res) => {
  const post: Post = req.body;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<Post>("shoutOuts")
      .insertOne(post);
    post._id = result.insertedId;
    res.status(201);
    res.json(post);
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default routes;
