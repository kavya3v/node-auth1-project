
exports.up = async function(knex) {
  await knex.schema.createTable("roles",(table)=>{
    table.increments('id')
    table.string("role_name",128).notNullable().unique()
})
//to store hashed credentials
await knex.schema.createTable("users",(table)=>{
    table.increments('id')
    table.string("username",128).notNullable().unique().index()
    table.string("password",128).notNullable()
    //foreignt key
    table.integer("role")
    .unsigned()
    .references("roles.id")
    .onUpdate("CASCADE")
    .onDelete("RESTRICT")
})
}

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("roles")
  await knex.schema.dropTableIfExists("users")
}
