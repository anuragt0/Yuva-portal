const express = require("express");
const app = express();
const connectToMongo = require("./db");
const cors = require("cors");
require("dotenv").config();
app.use(cors());

// to use req.body
app.use(express.json());

connectToMongo();

// app.use("/api/auth", require("./routes/auth.js"));
// app.use("/api", require("./routes/others.js"));

app.use("/api/user/auth", require("./routes/user.js"));

app.use("/api/admin/auth", require("./routes/admin.js"));

app.use("/api/public", require("./routes/public.js"));

app.listen(5000, () => {
  console.log("Server is listening at port 5000");
});
