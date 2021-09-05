import {config} from 'dotenv';

const envVars = config();

console.log(process.env.NICKNAME);


export default{
  port: envVars.PORT ? envVars.PORT : 4000 ,
  
}