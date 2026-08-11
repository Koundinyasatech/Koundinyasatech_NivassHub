import * as dotenv from 'dotenv';
dotenv.config();

import * as sql from 'mssql';

export const dbConfig: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER!,
  database: process.env.DB_DATABASE,
  options: {
    trustServerCertificate: true,
    encrypt: false,
  },
};

export const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log('Database Connected');
    return pool;
  })
  .catch((err) => {
    console.error('Database Connection Failed:', err);
    throw err;
  });

export { sql };