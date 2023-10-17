var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');

app.use(express.static('public'));
// const corsOptions = {
//     origin: "http://localhost:3000"
// };

// /**
//  * This configures all of the following routes to use the cors middleware
//  * with the options defined above.
//  */
// app.use(cors(corsOptions)
app.use(cors());

app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});
app.options("http://localhost:3000", cors());

const allowedOrigins = [
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'http://localhost:3000',
    'http://localhost:27017',
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Origin not allowed by CORS'));
        }
    },
};

// Enable preflight requests for all routes
app.options('*', cors(corsOptions));

app.get('/', cors(corsOptions), (req, res, next) => {
    res.json({ message: 'This route is CORS-enabled for an allowed origin.' });
});



// for data abstraction layer

// create a new user account
app.get('/account/create/:name/:email/:password', function (req, res) {
    // else create user
    dal.create(req.params.name, req.params.email, req.params.password).
        then((user) => {
            console.log(user);
            res.send(user);
        })
});

// login to an account
app.get('/account/login/:email/:password', function (req, res) {
    dal.login(req.params.email, req.params.password).
        then((loggedIn) => {
            console.log(loggedIn ? "Login Succeeded" : "Login Failed");
            res.send(loggedIn);
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

// withdraw funds from an account
app.get('/account/withdraw/:email/:amount', function (req, res) {
    dal.withdraw(req.params.email, req.params.amount).
        then((balance) => {
            console.log("New Balance: " + balance);
            res.send(balance);
        });
});

// get the balance for an account
app.get('/account/balance/:email', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    dal.balance(req.params.email).
        then((balance) => {
            console.log("Balance: " + balance);
            res.send(balance);
        });
});

// for data abstraction layer
app.get('/account/all', function (req, res) {
    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
        })
});

const port = 3000;
app.listen(port);
console.log('Running on port: ' + port);

