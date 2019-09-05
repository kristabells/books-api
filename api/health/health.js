const express = require('express');
const router = express.Router();

/* GET health */
router.get('/', function (req, res, next) {
    res.json({"status": "UP"});
});

module.exports = router;