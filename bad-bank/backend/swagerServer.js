const express = require('express');
const app = express();
const cors = require('cors');
const dal = require('./dal.js');

// const swaggerJSDoc = require('swagger-jsdoc');
// const swaggerUI = require('swagger-ui-express');

app.use(cors());

// Define Swagger options
// const swaggerOptions = {
//     swaggerDefinition: {
//         info: {
//             title: 'Banking App',
//             version: '1.0.0',
//             description: 'API for Banking App',
//         },
//         basePath: '/',
//     },
//     apis: ['server.js'], // Your main application file
// };

// // Initialize Swagger
// const swaggerSpec = swaggerJSDoc(swaggerOptions);

// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// CORS Headers
app.all('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});

// // Middleware to serve Swagger JSON at /swagger.json
// app.get('/swagger.json', (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.send(swaggerSpec);
// });

// for hello world test
/**
 * @swagger
 * /hello:
 *   get:
 *     description: Returns "Hello World!"
 *     responses:
 *       200:
 *         description: Successful response
 */
app.get('/hello', function (req, res) {
    res.send('Hello World!');
});

// for data abstraction layer
// create a new account
/**
 * @swagger
 * /account/create/{name}/{email}/{password}:
 *   get:
 *     description: Create a new account
 *     parameters:
 *       - name: name
 *         description: User's name
 *         in: path
 *         type: string
 *         required: true
 *       - name: email
 *         description: User's email
 *         in: path
 *         type: string
 *         required: true
 *       - name: password
 *         description: User's password
 *         in: path
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successful response
 */
app.get('/account/create/:name/:email/:password', function (req, res) {
    // else create user
    dal.create(req.params.name, req.params.email, req.params.password)
        .then((user) => {
            console.log(user);
            res.send(user);
        });
});

// login to an account
/**
 * @swagger
 * /account/login/{email}/{password}:
 *   get:
 *     description: Log in to an account
 *     parameters:
 *       - name: email
 *         description: User's email
 *         in: path
 *         type: string
 *         required: true
 *       - name: password
 *         description: User's password
 *         in: path
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successful response
 */
app.get('/account/login/:email/:password', function (req, res) {
    dal.login(req.params.email, req.params.password)
        .then((loggedIn) => {
            console.log(loggedIn ? 'Login Succeeded' : 'Login Failed');
            res.send(loggedIn);
        });
});

// deposit funds to an account
/**
 * @swagger
 * /account/deposit/{email}/{amount}:
 *   get:
 *     description: Deposit funds to an account
 *     parameters:
 *       - name: email
 *         description: User's email
 *         in: path
 *         type: string
 *         required: true
 *       - name: amount
 *         description: Amount to deposit
 *         in: path
 *         type: number
 *         required: true
 *     responses:
 *       200:
 *         description: Successful response
 */
app.get('/account/deposit/:email/:amount', function (req, res) {
    dal.deposit(req.params.email, req.params.amount)
        .then((balance) => {
            console.log('New Balance: ' + balance);
            res.send(balance);
        });
});

// withdraw funds from an account
/**
 * @swagger
 * /account/withdraw/{email}/{amount}:
 *   get:
 *     description: Withdraw funds from an account
 *     parameters:
 *       - name: email
 *         description: User's email
 *         in: path
 *         type: string
 *         required: true
 *       - name: amount
 *         description: Amount to withdraw
 *         in: path
 *         type: number
 *         required: true
 *     responses:
 *       200:
 *         description: Successful response
 */
app.get('/account/withdraw/:email/:amount', function (req, res) {
    dal.withdraw(req.params.email, req.params.amount)
        .then((balance) => {
            console.log('New Balance: ' + balance);
            res.send(balance);
        });
});

// get the balance for an account
/**
 * @swagger
 * /account/balance/{email}:
 *   get:
 *     description: Get the balance for an account
 *     parameters:
 *       - name: email
 *         description: User's email
 *         in: path
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successful response
 */
app.get('/account/balance/:email', function (req, res) {
    dal.balance(req.params.email)
        .then((balance) => {
            console.log('Balance: ' + balance);
            res.send(balance);
        });
});

// for all data in the database
/**
 * @swagger
 * /account/all:
 *   get:
 *     description: Get all data in the database
 *     responses:
 *       200:
 *         description: Successful response
 */
app.get('/account/all', function (req, res) {
    dal.all()
        .then((docs) => {
            console.log('docs in index', docs);
            res.send(docs);
        });
});

const port = 4500;
app.listen(port);
console.log('Running on port: ' + port);