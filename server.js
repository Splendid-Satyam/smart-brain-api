const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
     client: 'pg',
     connection: {
       host : '127.0.0.1',
       user : 'postgres',
       password : 'satyam',
       database : 'smart-brain'
     }
   });

// MAIN APP VARIABLE

const app = express();                  


// MIDDLEWARES

app.use(bodyParser.json());
app.use(cors());

//  SERVER ENDPOINTS

// WORKING
app.get('/', (req,res) => res.send(database.users))
// SIGNIN
app.post('/signin', signin.handleSignin(db, bcrypt))
// REGISTER
app.post('/register', register.handleRegister(db, bcrypt))
// GET PROFILE
app.get('/profile/:id', profile.handleProfile(db))
// IMAGE ENTRIES AND DETECTION
app.put('/image', image.handleImage(db))


// SERVER LISTEN 

app.listen(3001, () => {
     console.log('app is running on localhost:3001');
})
