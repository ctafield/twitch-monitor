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

    context.fillStyle = '#000'
    context.fillRect(0, 0, 400, 300)

    context.textAlign = 'center'
    context.fillStyle = '#fff'

    // currently temp
    context.font = 'normal 24px White Rabbit, serif'
    context.fillText(`Currently`, 80, 35, 150)

    context.font = 'normal 60px White Rabbit, serif'
    context.fillText(`${weather.current.temp.toFixed(0)}'c`, 80, 100, 125)

    // currently feels like
    context.font = 'normal 24px White Rabbit, serif'
    context.fillText(`Feels Like`, 305, 35, 150)

    context.font = 'normal 60px White Rabbit, serif'
    context.fillText(`${weather.current.feels_like.toFixed(0)}'c`, 305, 100, 125)    

    const imageUrl =`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`;
    const image = await loadImage(imageUrl)
    context.drawImage(image, 150, 100, 100, 100)

    context.font = 'normal 60px White Rabbit, serif'
    context.fillText(`${weather.current.weather[0].main}`, 200, 250, 125)    

    res.setHeader('Content-Type', 'image/png');
    res.send(canvas.toBuffer('image/png'));

    next();
});

module.exports = router;