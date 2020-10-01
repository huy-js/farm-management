const express = require("express");
const app = express();
// tach router ra 1 file rieng
const initAPIs = require("./src/routes/api");
const mongoose = require("mongoose");
// connect mongodb
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once("open", () => {
  console.log("Database Connection Established Successfully.");
});
// Cho phép các api của ứng dụng xử lý dữ liệu từ body của request
app.use(express.json());
// connect react with node use axios
cors = require("cors");
app.use(cors());
// tao routes
initAPIs(app);

let port = 3456;
app.listen(port, () => {
  console.log(`Hello Phat ${port}`);
});
