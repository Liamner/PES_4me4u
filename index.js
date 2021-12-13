/*import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import apiRoutes from "./routes/api.js";

app.use("/api", apiRoutes);

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
*/