// 获取key
const openaiApiKey = process.env.APIKEY;

// axios实例配置
const axios = require("axios");
const instance = axios.create({
  proxy: {
    protocol: "http",
    host: "127.0.0.1",
    port: 7890,
  },
});

// post数据
const requestData = {
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: "现在充当我的助手，主要为我介绍一些四川的景点!",
    },
  ],
  temperature: 0.7,
};

// 请求头
const header = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${openaiApiKey}`,
  },
};

exports.chat = async (req, res) => {
  try {
    requestData.messages = JSON.parse(req.body.toString()).messages;

    console.log(requestData.messages);

    const response = await instance.post(
      "https://api.openai.com/v1/chat/completions",
      requestData,
      header
    );
    res.end(JSON.stringify(response.data));
  } catch (error) {
    res.end(error.message);
  }
};
