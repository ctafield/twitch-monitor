const express = require('express');
const router = express.Router();

const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')

router.get('/user', async function (req, res, next) {
    next();
});

module.exports = router;