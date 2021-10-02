// import express from "express";
// //import { ObjectId } from 'mongodb';
// import { getClient } from "../db";
// import Post from "../models/Post";

// //creates a new router object
// const routes = express.Router();

// // GET /user/:name
// // Extended challenge, part 1, question 1
// routes.get("/user/:name", async (req, res) => {
//   console.log("it works-ish");
//   const name = req.params.name;

//   const client = await getClient();
//   const result = await client
//     .db()
//     .collection<Post>("shoutOuts")
//     .find({ title: name })
//     .toArray(); //use with find and aggregate

//   res.json(result);
// });

// export default routes;
