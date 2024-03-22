const express = require("express");
const _resource = require("../router_handler/resource");

const router = express.Router();

router.get("/getImg", _resource.getImg);
router.get("/getContent", _resource.getContent);

module.exports = router;
