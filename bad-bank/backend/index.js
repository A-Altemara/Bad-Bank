const express = require('express');
const app = express();
const cors = require('cors');
const dal = require('./dal.js');

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
})
);

app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});


app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// for hello world test
app.get('/hello', function (req, res) {
    res.send('Hello World!');
});

// for data abstraction layer
// create a new account
app.get('/account/create/:name/:email/:password', function (req, res) {
    dal.create(req.params.name, req.params.email, req.params.password).
        then((user) => {
            console.log(user);
            res.send(user);
        })
});


// login to an account
app.get('/account/login/:email/:password', function (req, res) {
    dal.login(req.params.email, req.params.password).
        then((user) => {
            res.send(user);
        });
});

// deposit funds to an account
app.get('/account/deposit/:email/:amount', function (req, res) {
    dal.deposit(req.params.email, req.params.amount).
        then((balance) => {
            console.log("New Balance: " + balance);
            res.send(balance);
        });
});

// get the balance for an account
app.get('/account/balance/:email', function (req, res) {
    dal.balance(req.params.email)
        .then((balance) => {
            console.log("Balance: " + balance);
            res.send(balance);
        });
});

// for all data in the database
app.get('/account/all', function (req, res) {
    dal.all()
        .then((docs) => {
            console.log('docs in index', docs);
            res.send(docs);
        })
});

const port = 4500;
app.listen(port);
console.log('Running on port: ' + port);
