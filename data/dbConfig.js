const knex=require('knex');
const knexfile= require('../knexfile');
const dbConfig=knex(knexfile.development)

module.exports=dbConfig;
