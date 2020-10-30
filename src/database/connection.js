const Knex = require('knex');
const knexfile = require('../../knexfile');

const connection = Knex(knexfile.development);

module.exports = connection;