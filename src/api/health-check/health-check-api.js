const express = require('express');
const router = express.Router();

/*
*   The base URL for health is '/api/health'
*/

router.get('/', function (req, res, next) {
    res.json({"status": "UP"});
});

module.exports = router;