const express = require('express');
const router = express.Router();

router.get('/user', async function (req, res, next) {
    res.send({
        user: req.user,
        stream: req.stream
    });
});

module.exports = router;