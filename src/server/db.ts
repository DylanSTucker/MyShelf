import pg from "pg";
import dotenv from 'dotenv';
dotenv.config({ path: './db.env' });

import {
    SecretsManagerClient,
    GetSecretValueCommand,
  } from "@aws-sdk/client-secrets-manager";
  
  const secret_name = "myshelf_secrets";
  
  const client = new SecretsManagerClient({
    region: "ca-central-1",
  });
  
  let response;
  
  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }
  
  const secret = response.SecretString;
  
  // Your code goes here
  console.log(secret);


export const pool = new pg.Pool({
    user: process.env.POSTGRES_USERNAME as string,
    password: process.env.POSTGRES_PASSWORD as string,
    host: process.env.HOST,
    port: process.env.PORT as unknown as number,
    database: "myshelf",

    //had to add this for AWS database
    ssl: {
        rejectUnauthorized: false
    }
});

//added purely for testing purposes
pool.connect((err) => {
    if(err){
        console.log(err.message);
        return;
    }
    console.log("Database connected");
})

//module.exports = pool;