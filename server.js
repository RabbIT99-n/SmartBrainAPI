const express=require('express');
const bodyParser= require('body-parser');
const bcrypt = require('bcrypt');
const cors= require('cors');
const knex= require ('knex');

const register= require('./controlers/register');
const signin= require('./controlers/signin');
const profile=require('./controlers/profile');
const image=require('./controlers/image');

const db = knex ({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true
    }
});

const app=express();

app.use(cors());
//CORS problem ?
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(bodyParser.json());


app.get('/', (req, res) => {
     res.send("It is working");
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req,res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req,res,db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT}`);
})


