const express = require('express');
const hbs = require('hbs');
const { join } = require('path');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

app.set('view engine', 'hbs');
app.set('views', join(__dirname, '../templates/views'));
hbs.registerPartials(join(__dirname, '../templates/partials'));
app.use(express.static(join(__dirname, '../public')));

hbs.registerHelper('isDefined', (value) => {
    return value !== undefined;
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Michael',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude } = {}) => {
        if (error) {
            return res.send({
                error,
            });
        }
        else {
            forecast(latitude, longitude, (error, { forecast, location }) => {
                if (error) {
                    return res.send({
                        error,
                    });
                }

                return res.send({
                    address: req.query.address,
                    location,
                    forecast,
                });
            });
        }
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Michael',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is the help message.',
        name: 'Michael',
    });
})

app.get('/help', (req, res) => {
    res.send({
        name: 'Michael',
        age: 'How dare you.'
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error',
        message: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});