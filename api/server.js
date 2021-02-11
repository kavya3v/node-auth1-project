const express= require('express');
const helmet=require('helmet');
const cors=require('cors');
const session= require('express-session');
const KnexSessionStore=require('connect-session-knex')(session);
const {validateSession} = require('../api/middleware');

const authRouter=require('./auth-router');
const usersRouter= require('./users-router');

const server=express();

const sessionConfig = {
    name:'monkey',
    secret:'keep it secret',//crypto sign the cookie
    cookie:{
      //how old could cookie be before its considered expired
      maxAge: 60 * 60 * 1000,
      secure:false,
      httpOnly:true
    },
    resave:false,//avoids recreating sessions that havn't changed
    saveUninitialized:false, //to comply with GDPR laws
    //make the configured instance of knexsession to use knex to store session data in db
    store:new KnexSessionStore({
      //pass it configured instance of knex
      knex: require('../data/dbConfig'),
      tablename: 'sessions',
      sidfieldname:'sid',
      createtable:true,//create it automaticly if session table doesn't exist
      clearInterval:60 * 60 * 1000 //in ms
    })
  }

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.get('/',(req,res,next)=>{
    res.send("hello from router!")
})

server.use('/api/auth',authRouter);
server.use('/api/users',usersRouter);
// server.use('/api/users',validateSession, usersRouter);
server.use('/',(error,req,res,next)=>{
    const statusCode=error.statusCode ? error.statusCode : 500;
    res.status(statusCode).json(error.message)
})

module.exports=server;


