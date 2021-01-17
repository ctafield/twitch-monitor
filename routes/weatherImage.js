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

    context.fillStyle = '#fff'
    context.fillRect(0, 0, 400, 300)

    context.textAlign = 'center'

    // currently temp
    context.font = 'normal 24px White Rabbit, serif'
    context.fillStyle = '#000'
    context.fillText(`Currently`, 80, 35, 150)

    context.font = 'normal 60px White Rabbit, serif'
    context.fillStyle = '#000'
    context.fillText(`${weather.current.temp.toFixed(0)}'c`, 80, 100, 125)

    // currently feels like
    context.font = 'normal 24px White Rabbit, serif'
    context.fillStyle = '#000'
    context.fillText(`Feels Like`, 305, 35, 150)

    context.font = 'normal 60px White Rabbit, serif'
    context.fillStyle = '#000'
    context.fillText(`${weather.current.feels_like.toFixed(0)}'c`, 305, 100, 125)    

    const imageUrl =`assets/icons/${weather.current.weather[0].icon}.png`;
    const image = await loadImage(imageUrl)
    context.drawImage(image, 150, 90, 100, 100)

    context.font = 'normal 60px White Rabbit, serif'
    context.fillStyle = '#000'
    context.fillText(`${weather.current.weather[0].main}`, 200, 240, 125)    


    context.font = 'normal 12px White Rabbit, serif'
    context.fillStyle = '#000'

    const cd = new Date()
    const formatted_date =  cd.getHours() + ":" + cd.getMinutes() + " " + cd.getDate() + "/" + (cd.getMonth() + 1) + "/" + cd.getFullYear()

    context.fillText(`Updated ${formatted_date}`, 200, 275, 125)    


    res.setHeader('Content-Type', 'image/png');
    res.send(canvas.toBuffer('image/png'));

    next();
});

module.exports = router;