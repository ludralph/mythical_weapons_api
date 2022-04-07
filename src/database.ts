import dotenv from "dotenv";
import { Pool }  from 'pg';

dotenv.config();

const { Host, Database,POSTGRES_TEST_DB, User, Password, NODE_ENV } = process.env;

let client: Pool;
console.log('ENV ', NODE_ENV)
if (NODE_ENV === "test") {
  console.log('I am in test mode');
  client = new Pool({
    host: Host,
    database: POSTGRES_TEST_DB,
    user: User,
    password: Password,
  });
}
else{
  client = new Pool({
    host: Host,
    database: Database,
    user: User,
    password: Password,
  });
} 
  


export default client;

