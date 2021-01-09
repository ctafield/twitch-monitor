const express = require('express');
const router = express.Router();

const secrets = require('../secrets');

const { onecall } = require('../api/weatherApi');

const { createCanvas, loadImage } = require('canvas')

router.get('/user', async function (req, res, next) {

    const {
        openWeather: {
            apiKey, lat, lon
        }
    } = secrets;

    let weather;

    try {
        weather = await onecall(apiKey, lat, lon)
    } catch (error) {
        res.sendStatus(500);
    }

    const width = 400
    const height = 300
    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')

    res.setHeader('Content-Type', 'image/png');
    res.send(canvas.toBuffer('image/png'));    

    next();
});

module.exports = router;