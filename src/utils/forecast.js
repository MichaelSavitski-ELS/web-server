const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const weatherUrl = `http://api.weatherstack.com/current?access_key=29737794fc6523693eb87f76029e5b69&query=${latitude},${longitude}&units=f`;

    request({ url: weatherUrl, json: true }, (error, { body }) => {
        if (error) {
            return callback(error, undefined);
        }
        else {
            const currentData = body.current;
            console.log(currentData);
            const location = `${body.location.address}. ${body.location.region}, ${body.location.country}`;
            const temperature = currentData.temperature;
            const feelsLike = currentData.feelslike;
            const description = currentData.weather_descriptions[0];
            const forecast = ` ${description}. It is currently ${temperature} degrees out.  It feels like ${feelsLike} degrees out.`;

            return callback(undefined, { forecast, location });
        }
    });
}

module.exports = forecast;