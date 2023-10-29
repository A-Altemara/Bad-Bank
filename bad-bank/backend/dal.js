const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db = null;

// Connect to MongoDB and initialize the 'db' variable
async function connectToMongo() {
    const client = new MongoClient(url, { monitorCommands: true });

    try {
        // Connect to MongoDB using the client
        await client.connect();

        // Connect to the 'myproject' database
        db = client.db('myproject');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

// Call the connectToMongo function to establish the connection
connectToMongo();

async function test() {
    try {
        // Wait for the MongoDB connection to be established
        await connectToMongo();

        if (!db) {
            throw new Error('MongoDB connection is not established.');
        }
        console.log("connected to test")
    } catch (err) {
        console.error(err);
        throw err; // Propagate the error
    }
}

// Function to create a user document in the 'users' collection
async function create(name, email, password) {
    try {
        // Wait for the MongoDB connection to be established
        await connectToMongo();

        if (!db) {
            throw new Error('MongoDB connection is not established.');
        }

        const collection = db.collection('users');
        const doc = { name, email, password, balance: 0, role: "user" };
        const result = await collection.insertOne(doc);
        return doc;
    } catch (err) {
        console.error(err);
        throw err; // Propagate the error
    }
}

// Login a user
async function login(email, password) {
    try {
        // Wait for the MongoDB connection to be established
        await connectToMongo();

        if (!db) {
            throw new Error('MongoDB connection is not established.');
        }

        const collection = db.collection('users');
        const docs = await collection.find().toArray();
        const user = docs.find((user) => user.email == email);
        if (!user) {
            return false;
        }

        if (user.password == password) {
            return user;
        }

        return false;
    } catch (err) {
        console.error(err);
        throw err; // Propagate the error
    }
}

// fuction to deposit funds to an account
async function deposit(email, amount) {
    try {
        // Wait for the MongoDB connection to be established
        await connectToMongo();

        if (!db) {
            throw new Error('MongoDB connection is not established.');
        }

        const collection = db.collection('users');
        const docs = await collection.find().toArray();
        const user = docs.find((user) => user.email == email);
        if (!user) {
            console.log("user not found");
            return null;
        }

        //amount is a string from the url, have to convert to a number before adding or updating the db
        amount = Number(amount);
        // Calculate the new balance after the deposit
        const newBalance = user.balance + amount;

        // Update the user's balance in the collection
        await collection.updateOne(
            { email: user.email },
            { $set: { balance: newBalance } }
        );

        console.log(`Fund adjustment of ${amount} to ${user.email} completed.`);
        return "" + newBalance; //return a string instead of a number, numbers are error codes in "res.send"
    } catch (err) {
        console.error(err);
        throw err; // Propagate the error
    }
}

// function to withdraw funds from an account
// async function withdraw(email, amount) {

//     try {
//         // Wait for the MongoDB connection to be established
//         await connectToMongo();

//         if (!db) {
//             throw new Error('MongoDB connection is not established.');
//         }

//         const collection = db.collection('users');
//         const docs = await collection.find().toArray();
//         const user = docs.find((user) => user.email == email);
//         if (!user) {
//             console.log("user not found");
//             return null;
//         }

//         //amount is a string from the url, have to convert to a number before adding or updating the db
//         amount = Number(amount);
//         // Calculate the new balance after the withdraw
//         const newBalance = user.balance - amount;

//         // Update the user's balance in the collection
//         await collection.updateOne(
//             { email: user.email },
//             { $set: { balance: newBalance } }
//         );

//         console.log(`Withdraw of ${amount} to ${user.email} completed.`);
//         return "" + newBalance; //return a string instead of a number, numbers are error codes in "res.send"
//     } catch (err) {
//         console.error(err);
//         throw err; // Propagate the error
//     }
// }

// function to get the balance for an account
async function balance(email) {
    try {
        // Wait for the MongoDB connection to be established
        await connectToMongo();

        if (!db) {
            throw new Error('MongoDB connection is not established.');
        }

        const collection = db.collection('users');
        const docs = await collection.find().toArray();
        const user = docs.find((user) => user.email == email);
        if (!user) {
            console.log("user not found");
            return null;
        }

        console.log(`user.balance: ${user.balance}`);
        return "" + user.balance; //return a string instead of a number, numbers are error codes in "res.send"
    } catch (err) {
        console.error(err);
        throw err; // Propagate the error
    }
}

// Function to retrieve all user documents from the 'users' collection
// TODO: Stretch goal exclude password from the returned documents, change get to post and tell it to only send back the name and email and balance.
async function all() {
    try {
        // Wait for the MongoDB connection to be established
        await connectToMongo();

        if (!db) {
            throw new Error('MongoDB connection is not established.');
        }

        const collection = db.collection('users');
        const docs = await collection.find().toArray();

        console.log("Connected to all");
        return docs;
    } catch (err) {
        console.error(err);
        throw err; // Propagate the error
    }
}

module.exports = { create, login, deposit, balance, all };