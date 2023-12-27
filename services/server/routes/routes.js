const express = require("express"),
  router = express.Router();

  router.use("/user", require("../controllers/user"));
  router.use("/channel", require("../controllers/channel"));

  module.exports = router;