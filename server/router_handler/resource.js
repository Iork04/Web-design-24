const path = require("path");
const fs = require("fs");
const md5File = require("md5-file");

// 获取图片资源
exports.getImg = async (req, res) => {
  try {
    const number = req.query.number || 1;
    const imgname = req.query.imgname || 1;
    const imagePath = path.join(
      __dirname,
      "..",
      "src",
      `${number}`,
      `${imgname}.jpg`
    );

    fs.access(imagePath, fs.constants.F_OK, (err) => {
      if (err) {
        // 文件不存在，发送 404 响应
        res.status(404).send("File not found").end();
      } else {
        // 文件存在，读取并发送文件内容
        // 获取客户端发送的 If-None-Match 头部信息
        const ifNoneMatch = req.headers["if-none-match"];

        // 检查资源是否修改
        const etag = md5File.sync(imagePath);

        if (ifNoneMatch === etag) {
          // 资源未修改，返回 304 Not Modified 状态码
          res.status(304).end("The file does not need to be updated!");
        } else {
          // 设置资源的 ETag 头部
          res.setHeader("ETag", etag);

          // 返回资源内容
          res.sendFile(imagePath);
        }
      }
    });
  } catch (error) {
    res.end(error.message);
  }
};

// 获取文字资源
exports.getContent = async (req, res) => {
  try {
    const number = req.query.number || 1;
    const contentPath = path.join(
      __dirname,
      "..",
      "src",
      `${number}`,
      "content.json"
    );

    fs.access(contentPath, fs.constants.F_OK, (err) => {
      if (err) {
        res.status(404).send("File not found").end();
      } else {
        fs.readFile(contentPath, (err, data) => {
          if (err) {
            res.status(500).send("Error reading file").end();
          } else {
            // 解析 JSON 数据
            const jsonData = JSON.parse(data);

            // 发送 JSON 数据给客户端
            res.json(jsonData);
          }
        });
      }
    });
  } catch (error) {
    res.end(error.message);
  }
};
