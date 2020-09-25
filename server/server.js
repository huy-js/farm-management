//require("dotenv").config();
const express = require("express");
const app = express();
const initAPIs = require("./src/routes/api");
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
