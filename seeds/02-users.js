
exports.seed = async function(knex) {
   await knex("roles").insert([
     {role_name: "Analyst"},
     {role_name: "Sofware Engineer"},
     {role_name: "Architect"}
   ])
   await knex("users").insert([
    {id:1, username: "test",password: "test"},
  ])
};
