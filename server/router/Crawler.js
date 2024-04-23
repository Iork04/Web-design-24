const express = require("express");
const _Crawler = require("../router_handler/Crawler");

const router = express.Router();

router.get("/crawler/bili", _Crawler.Bili);
router.get("/crawler/biliimg", _Crawler.BiliImg);

module.exports = router;
