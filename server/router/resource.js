const express = require("express");
const _resource = require("../router_handler/resource");

const router = express.Router();

router.get("/getImg", _resource.getImg);

module.exports = router;
