import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import shoutOutRoutes from "./routes/shoutouts";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", shoutOutRoutes);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const api = functions.https.onRequest(app);
