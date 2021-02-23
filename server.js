const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var path = require('path');

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Comment line 18 out when deploying to heroku
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutsdb", { useNewUrlParser: true });

// Uncomment the below when deploying to the Heroku app
// mongoose.connect(
//   process.env.MONGODB_URI || 'mongodb://localhost/workoutsdb',
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
//   }
// );



// Bring in our routes
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);


app.listen(process.env.PORT || 3000, () => {
    console.log("App running on port 3000!");
  });