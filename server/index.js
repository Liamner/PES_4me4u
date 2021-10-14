const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiRoutes = require('./routes/api.js')(app,express);
app.use("/api", apiRoutes);

//app.use(cors());

const CONNECTION_URL =
  "mongodb+srv://Jefe:1234@4me4u.iyl4h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//static files location
// Exprees will serve up production assets
app.use(express.static(path.join(__dirname, '../app')));

// Express serve up index.html file if it doesn't recognize route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../app/App.tsx'));
});

app.use(express.static(__dirname+'/public'));

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