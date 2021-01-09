const request = require('superagent');
const NodeCache = require('node-cache');
const cache = new NodeCache();

const helixUrl = 'https://api.twitch.tv/helix';

async function getUserByName(token, clientId, userName) {
    const userUrl = `${helixUrl}/users?login=${userName}`;

    const result = await request
        .get(userUrl)
        .auth(token, { type: 'bearer' })
        .set('Client-ID', clientId);

    const { data } = result.body;
    return data;
}

async function getStreamByUserId(token, clientId, userId) {
    const userUrl = `${helixUrl}/streams?user_id=${userId}`;

    const result = await request
        .get(userUrl)
        .auth(token, { type: 'bearer' })
        .set('Client-ID', clientId);

    const { data } = result.body;
    return data;
}

async function getToken(clientId, secret) {
    var token = cache.get('token');
    if (token != null) {
        return token;
    }

    const tokenUrl = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${secret}&grant_type=client_credentials`;

    const result = await request.post(tokenUrl);

    const { access_token } = result.body;
    if (access_token == null) {
        return null;
    }

    cache.set('token', access_token, result.body.expires_in);

    return access_token;
}

module.exports = { getUserByName, getStreamByUserId, getToken };