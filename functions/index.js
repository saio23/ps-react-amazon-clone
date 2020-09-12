const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')
('sk_test_51HQCazHhiclqlK7r6WGmYjGUiZlmHcqLKjXQCSEOgyP0hE4fiqspy4DI9b26yPTk9aA5MSgfTtTO963CBIIDnBKk00m0H8Lnpl');

// API

// APP CONFIG
 const app = express();
// MIDDLEWARES
app.use(cors({origin: true}));
app.use(express.json());

// API ROUTES
// example endpoint after (firebase init cloudfunctions -- run)
// http://localhost:5001/amazfclone-a7c3d/us-central1/api

app.get('/',(request,response) => response.status(200).send('hello world'));

app.post("/payments/create", async (request,response) => {
    const total = request.query.total;

    console.log('Payment request received NOW for this amount >>>', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of the currency
        currency: "eur",
    });
    
    // OK - Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });


}); 


// LISTEN COMMAND
exports.api = functions.https.onRequest(app);