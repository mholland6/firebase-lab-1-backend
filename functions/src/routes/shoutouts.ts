import express from "express";
import { ObjectId } from "mongodb";
import { getClient } from "../db";
import Post from "../models/Post";

//creates a new router object
const routes = express.Router();

routes.get("/shoutouts", async (req, res) => {
  const name: string = req.query.name as string;
  let query: any = {};

  if (name) {
    query = { title: name };
  }

  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<Post>("shoutOuts")
      .find(query)
      .toArray();
    res.json(results);
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

routes.post("/shoutouts", async (req, res) => {
  console.log("this is the route");
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

// delete a shoutout/post
routes.delete("/shoutouts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<Post>("shoutOuts")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.status(204).end();
    }
  } catch (err) {
    console.error("FAIL", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default routes;
