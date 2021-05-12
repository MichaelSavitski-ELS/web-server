const request = require('postman-request');

const geocode = (address, callback) => {
    const geocodingKey = 'pk.eyJ1IjoidGhlcnl1dWppbm1pa2UiLCJhIjoiY2tvZDlyMTRiMDA4ODJvcHdpNHJmM2ViZiJ9.XLt-UpIuQsYBe2SDOad_bA';

    const encodedAddress = encodeURI(address);

    const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?limit=1&access_token=${geocodingKey}`

    request({ url: geocodingUrl, json: true, rejectUnauthorized: false }, (error, { body, features }) => {
        if (body) {
            if (!body.features) {
                return callback('Unable to find location.');
            }

            return callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            });
        }
        else {
            return callback('Unable to connect to location services.');
        }
    });
}

module.exports = geocode;