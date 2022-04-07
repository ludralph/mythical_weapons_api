import dotenv from "dotenv";
import { Pool }  from 'pg';

dotenv.config();

const { Host, Database,POSTGRES_TEST_DB, User, Password, NODE_ENV, DATABASE_URL } = process.env;

let client: Pool;

if (NODE_ENV === "production") {
  const connectionString = DATABASE_URL;
  client = new Pool({
    connectionString,
  });
} 
else if (NODE_ENV === "development") {
  client = new Pool({
    host: Host,
    database: Database,
    user: User,
    password: Password,
  });
} 
else {
  client = new Pool({
    host: Host,
    database: POSTGRES_TEST_DB,
    user: User,
    password: Password,
  });
} 

export default client;

