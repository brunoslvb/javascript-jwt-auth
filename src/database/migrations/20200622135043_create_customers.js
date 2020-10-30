const Knex = require('knex');

exports.up = function (knex) {
	return knex.schema.createTable('customers', table => {
		table.increments('id').primary();
		table.string('email').notNullable().unique();
		table.string('password').notNullable();
		table.timestamp('created_at').notNullable();
		table.timestamp('updated_at').notNullable();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('customers');
};
