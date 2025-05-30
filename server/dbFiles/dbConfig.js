require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, // server name is before the slash
  database: process.env.DB_DATABASE,
  options: {
    trustServerCertificate: true,
    trustedConnection: false,
    enableArithAbort: true,
    instancename: "SQLEXPRESS03",
  },
  port: parseInt(process.env.DB_PORT),
};
module.exports = config;
