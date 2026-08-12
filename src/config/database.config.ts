import * as dotenv from 'dotenv';
import * as sql from 'mssql';
import * as path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

export const dbConfig: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER!,
  port: Number(process.env.DB_PORT) || 1433,
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
