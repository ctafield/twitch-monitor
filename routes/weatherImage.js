const express = require('express');
const router = express.Router();

const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')

router.get('/user', async function (req, res, next) {

    // https://api.openweathermap.org/data/2.5/onecall?lat=52.672382&lon=-1.8282597&appid=e6f3b655cab9f4033ca8f3a1b9c1a2fe&exclude=minutely


    next();
});

module.exports = router;