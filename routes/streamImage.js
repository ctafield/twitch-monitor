const express = require('express');
const router = express.Router();

const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')

/* GET home page. */
router.get('/user', async function (req, res, next) {

    //  if (!req.stream) {         
    //      next();
    //      return;
    // }

    const width = 400
    const height = 300
    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')

    let imageUrl, fill, verb;

    if (req.stream) {
        imageUrl = 'assets/images/streaming.png';
        fill = '#000';
        verb = 'is';
    } else {        
        imageUrl = 'assets/images/offline.png';
        fill = '#fff';
        verb = "is not";
    }

    const image = await loadImage(imageUrl)
    context.drawImage(image, 0, 0, 400, 300)

    context.font = 'normal 60px Goldie Boxing, serif'
    context.textAlign = 'center'
    context.fillStyle = fill
    context.fillText(req.user.display_name, 200, 80, 400)

    context.font = 'normal 60px Goldie Boxing, serif'
    context.fillText(verb, 200, 170, 400)
    context.fillText('streaming', 200, 250, 400)

    res.setHeader('Content-Type', 'image/png');
    res.send(canvas.toBuffer('image/png'));

    next();
});

module.exports = router;