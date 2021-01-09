const express = require('express');
const router = express.Router();

const { getToken, getUserByName, getStreamByUserId } = require('../api/twitchapi');

const secrets = require('../secrets');

/* GET users listing. */
router.get('/user', async function (req, res, next) {

  const { userName } = req.query;

  if (!userName) {
    res.status(400).send('"userName" is required.');
    return;
  }

  const {
    twitch: {
      clientId, secret
    }    
  } = secrets;

  try {
    const token = await getToken(clientId, secret);
    if (!token) {
      res.sendStatus(401);
      return;
    }

    const userDetails = await getUserByName(token, clientId, userName);
    if (!userDetails) {
      res.status(204).send(`${userName} not found.`);
      return;
    }

    const user = userDetails[0];
    const stream = await getStreamByUserId(token, clientId, user.id);

    req.user = user;
    req.stream = stream && stream[0];
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = router;