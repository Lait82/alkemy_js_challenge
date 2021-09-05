import {getConnection, queries} from '../db'
import { _isDataInputValid } from './utilityFunctions';
import sql from 'mssql';

export const validateUser = async (req, res)=>{
  const {email, pass} = req.body;

  try {
    if(!email.includes('@') && !email.includes('.')) {
      res.send('Invalid Email format');
    }
    const pool = await getConnection();
    const result = await pool.request()
    .input('email', email)
    .input('pass', pass)
    .query(queries.validateUser);
    console.log(result.rowsAffected[0]);

    if(result.rowsAffected[0] === 1){
      res.send({"isValid":true});
    }
    else{
      res.send({"isValid":false});
    }
  }

  catch(error){
    console.log('problema en el login');
    res.status(500);
    res.send(error.msg);
  }

}

export const createUser = async(req, res) =>{
  const {full_name, surname, email, pass} = req.body;

  // checks for indispensable data
  if (!_isDataInputValid(full_name, surname, email, pass)) return res.status(400).json({msg:'bad request'});
  try{
    const pool = await getConnection(); 
    const result = await pool
      .request()
      .input('full_name', sql.NVarChar, full_name)
      .input('surname', sql.NVarChar, surname)
      .input('email', sql.NVarChar, email)
      .input('pass', sql.NVarChar, pass)
      .query(queries.createNewUser);

    res.json({msg: 'User Created Successfully'})
  }
  catch(error){
    res.status(500)
    res.send(error.msg);
  }
}