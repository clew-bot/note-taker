const express = require("express");
const fs = require("fs");
const path = require("path")

const app = express();

const PORT = process.env.PORT || 8080

app.use(express.static('./public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/apiRouting")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });