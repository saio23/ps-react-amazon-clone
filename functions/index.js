const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const dotEnv = require('dotenv').config();


const stripe = require('stripe')(process.env.STRIPE_KEY);

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

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;
  
    console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
      currency: "eur",
    });
  
    // OK - Created
    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });


  });
  


// LISTEN COMMAND
exports.api = functions.https.onRequest(app);