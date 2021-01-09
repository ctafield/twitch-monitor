const request = require('superagent');

async function onecall(appid, lat, lon) {
    const userUrl = `https://api.openweathermap.org/data/2.5/onecall`;

    const result = await request
        .get(userUrl)
        .query({
            appid,
            lat,
            lon,
            exclude: "minutely",
            units: "metric"
        });

    const { body: data } = result;
    return data;
}

module.exports = { onecall };