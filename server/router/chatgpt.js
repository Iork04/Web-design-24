const express = require("express");
const _chatgpt = require("../router_handler/chatgpt");

const router = express.Router();

router.post("/chatgpt", _chatgpt.chat);

module.exports = router;
