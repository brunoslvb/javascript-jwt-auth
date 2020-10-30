const connection = require('../database/connection');

const table = 'customers';

module.exports = {

  async get () {

    return await connection(table).select('*');

  },

  async getById (id) {

    return await connection(table).select('*').where('id', id).first();

  },

  async getWhere (name, value) {

    return await connection(table).select('*').where(name, value).first();

  },

  async post (data) {

    return await connection(table).insert(data);

  },

  async put (id, data) {

    return await connection(table).where('id', id).update(data);

  },

  async changePassword (id, data) {

    return await connection(table).where('id', id).update(data);

  }

};
