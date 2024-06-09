//instead of knex.js, use this file
  //   host: process.env.DB_HOST,
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_NAME,
  // })
 
  module.exports = {
  client: "mysql2",
  connection: {
    host: "localhost",
    database: "world",
    user: "root",
    password: "Analytics#2024",
  },
};

