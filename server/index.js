// 导入配置以及包
require("dotenv").config();
const port = process.env.PORT || 3000;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// 导入路由
const chatgptRouter = require("./router/chatgpt");
const resourceRouter = require("./router/resource");
const Crawler = require("./router/Crawler");

// 创建实例
const app = express();

// 配置中间件
app.use(cors());
app.use(bodyParser.raw({ type: "*/*" }));

app.use("/api", chatgptRouter, Crawler);
app.use("/resource", resourceRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
