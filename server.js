const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    });
    next();
});
// app.use((req, res,next) => {
//     res.render('maintenance.hbs');
// });


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (message) => {
    return message.toUpperCase();
});

app.use(express.static(__dirname + '/public'
    // , { extensions: ['html']}
));


app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Welcome',
        message: 'Handlebar intergration works'
    });
}).get('/about', (req, res) => {
    // res.send('<h1>About us</h1>');
    res.render('about.hbs', {
        pageTitle: 'About'
    })
}).get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Project'
    })
}).get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    })
});

app.listen(port, () => {
    console.log(`Server running in port ${port}`);
});