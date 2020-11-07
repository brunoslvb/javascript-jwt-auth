const Knex = require('knex');
const knexfile = require('../../knexfile');

const env = process.env.NODE_ENV === 'test' ? knexfile.test : knexfile.development;

const connection = Knex(env);

module.exports = connection;
