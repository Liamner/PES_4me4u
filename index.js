import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import apiRoutes from "./routes/api.js";

const app = express();

app.use("/api", apiRoutes);

app.use(cors());

const CONNECTION_URL =
  "mongodb+srv://admin:1234@4me4u.4lr2m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
  }).then(() =>
    app.listen(PORT, () =>
      console.log("Connection is established on port:" + PORT)
    )
  ).catch((err) => console.log(err.message));
