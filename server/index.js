const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');


//import apiRoutes from "./routes/api.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const apiRoutes =  require('./routes/api.js')(app);
app.use("/api", apiRoutes);

//app.use(cors());

const CONNECTION_URL =
  "mongodb+srv://Jefe:1234@4me4u.iyl4h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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