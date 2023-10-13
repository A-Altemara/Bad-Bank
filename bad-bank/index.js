var express = require('express');
var app = express();
var cors = require('cors');

app.use(express.static('public'));
app.use(cors());

// create a new user account
app.get('/account/create/:name/:email/:password', function (req, res) {
    res.send({
        name: req.params.name,
        email: req.params.email,
        password: req.params.password
    });
});

// login to an account
app.get('/account/login/:email/:password', function (req, res) {
    res.send({
        email: req.params.email,
        password: req.params.password
    });
});

// deposit funds to an account
app.get('/account/deposit/:email/:amount', function (req, res) {
    res.send({
        email: req.params.email,
        amount: req.params.amount
    });
});

// withdraw funds from an account
app.get('/account/withdraw/:email/:amount', function (req, res) {
    res.send({
        email: req.params.email,
        amount: req.params.amount
    });
});

// get the balance for an account
app.get('/account/balance/:email', function (req, res) {
    res.send({
        email: req.params.email
    });
});

// get all the data for all accounts
app.get('/account/all', function (req, res) {
    res.send({
        name: req.params.name,
        email: req.params.email,
        password: req.params.password
    });
});

var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);