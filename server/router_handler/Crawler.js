const axios = require("axios");

var vedioInfoList = {}; //存储搜索列表
var vedioInfoListTime = {}; //存储时间戳

// 判断是否拉取
function BiliExamine(keyword) {
  const nowTime = new Date().getTime();
  const storedTime = vedioInfoListTime[keyword];
  return !storedTime || nowTime - storedTime > 24 * 60 * 60 * 1000;
}

// 拉取搜索列表
async function GetVedioInfo(keyword) {
  const url = "https://api.bilibili.com/x/web-interface/search/all/v2";
  const requestData = {
    keyword: keyword,
  };
  const config = {
    params: requestData,
    headers: {
      Cookie: "SESSDATA=233",
    },
  };
  try {
    searchResponse = await axios.get(url, config);
    videoInfo = searchResponse.data.data.result[11].data;
    let infoList = [];
    for (var i = 0; i < 15; ++i) {
      const data = {
        arcurl: videoInfo[i].arcurl,
        title: videoInfo[i].title.replace(/<[^>]+>/g, ""),
        description: videoInfo[i].description,
        pic: videoInfo[i].pic,
      };
      infoList.push(data);
    }
    const nowTime = new Date().getTime();
    vedioInfoListTime[keyword] = nowTime;
    vedioInfoList[keyword] = infoList;
    // console.log(infoList);
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
}

// 返回搜索列表
exports.Bili = async (req, res) => {
  const keyword = req.query.keyword || "九寨沟";
  if (BiliExamine(keyword)) {
    await GetVedioInfo(keyword);
  }
  try {
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.json(vedioInfoList[keyword]);
  } catch (error) {
    console.error(error.message);
    res.end(error.message);
  }
};

// 返回图片
exports.BiliImg = async (req, res) => {
  const keyword = req.query.keyword || "九寨沟";
  const index = req.query.index || 1;
  if (BiliExamine(keyword)) {
    await GetVedioInfo(keyword);
  }
  try {
    const url = vedioInfoList[keyword][index].pic;
    imgInfo = await axios.get(url, {
      responseType: "arraybuffer",
    });
    const data = Buffer.from(imgInfo.data).toString("base64");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.end(data);
  } catch (error) {
    console.error(error.message);
    res.end(error.message);
  }
};
