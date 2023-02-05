require("dotenv").config();
const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const csvUpload = require("express-fileupload");
// app.use(csvUpload()); // parses csv file while recieving and then adds it to the req.files
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
const cors = require("cors");

// Mine
// const connectToMongo = require("./db");
const connectToMongoDB = require("./databases/MongoDB/config");
const { createDir } = require("./utilities/helper_functions");
const { vars } = require("./utilities/constants");

app.use(cors());

app.use(express.json()); // to use req.body

// connectToMongo();
connectToMongoDB();

// routes
app.use("/api/user/auth", require("./api/routes/user.js"));

app.use("/api/admin/auth", require("./api/routes/admin.js"));

app.use("/api/public", require("./api/routes/public.js"));

app.listen(5000, () => {
  console.log("Server is listening at port 5000");

  // createDir(vars.imageFile.ORIGINAL_UPLOADS_DIR_PATH);
  // createDir(vars.imageFile.COMPRESSED_UPLOADS_DIR_PATH);
});
