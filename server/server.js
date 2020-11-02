const express = require("express");
const app = express();
// tach router ra 1 file rieng
const initAPIs = require("./src/routes/api");
const mongoose = require("mongoose");
// connect mongodb
// const uri = process.env.ATLAS_URI || process.env.MONGO_URI;
const uri =
  process.env.MONGO_URI || "mongodb://localhost:27017/farm-management";
mongoose.connect(uri, {
  useNewUrlParser: true,
});
mongoose.connection.once("open", function () {
  //console.log("Database Connection Established Successfully.");
});
// Cho phép các api của ứng dụng xử lý dữ liệu từ body của request
app.use(express.json());
// connect react with node use axios
cors = require("cors");
app.use(cors());
// tao routes
initAPIs(app);

let port = 3456;
//let localhost = "192.168.1.5";
let localhost = "192.168.1.193";
//let port = 8081;
app.listen(port, localhost, () => {
  console.log(`Hello Phat ${port}`);
});
// app.listen(port, "localhost", () => {
//   console.log(`Hello Phat ${port}`);
// });
