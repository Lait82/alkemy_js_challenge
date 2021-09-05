import {getConnection, queries} from '../db'
import { _isDataInputValid } from './utilityFunctions';
import sql from 'mssql';


// normalizes timestamp length
const _timestampNormalizer = (arr) =>{
  return arr.map(val =>{
    if(val.creation_date.length === 10){
      val.creation_date += '000';
    }
  })
}

export const getMovements = async (req, res) =>{
  try{
    // console.log('tu vieja puta')
    const pool = await getConnection();  // get connection llama a la conexion y retorna el pool (conexion preestablecida a la bd)
    const result = await pool.request().query(queries.getAllMovements); 
    console.log(result);
    _timestampNormalizer(result.recordset);
    res.json(result.recordset);
  }
  catch(error){
    console.log('There was a problem when retrieving the data');
    res.status(500);
    res.send(error.msg);
  }
};

export const getAllMovsByUser = async(req, res) =>{
  try{
    const pool = await getConnection();  // get connection llama a la conexion y retorna el pool (conexion preestablecida a la bd)
    const result = await pool.request()
    .input('id_user', req.params.id_user)
    .query(queries.getAllMovsByUser); 
    console.log(result);
    _timestampNormalizer(result.recordset);
    res.json(result.recordset);
  }
  catch(error){
    console.log('There was a problem when retrieving the data');
    res.status(500);
    res.send(error.msg);
  }
}

export const getMovById = async (req,res) =>{
  try{
    const pool = await getConnection();  // get connection llama a la conexion y retorna el pool (conexion preestablecida a la bd)
    const result = await pool.request()
    .input('id', req.params.id)
    .query(queries.getSingleMovement); 
    console.log(result);
    _timestampNormalizer(result.recordset);
    res.json(result.recordset);
  }
  catch(error){
    console.log('There was a problem when retrieving the data');
    res.status(500);
    res.send(error.msg);
  }
}

export const newMovement = async (req, res) =>{

  const {category, reason = 'Desconocida', creation_date, id_user, currency, amount} = req.body;

  // checks for indispensable data
  if (!_isDataInputValid(category, creation_date, id_user)) return res.status(400).json({msg:'bad requeeest'});
  try{
    const pool = await getConnection(); 
    const postTest = await pool
      .request()
      .input('category', sql.NVarChar, category) // el 1er parametro de input es el nombre del campo en la db
      //  el 2do es el tipo de dato y el 3ero es el valor que tomará en el record
      .input('reason', sql.NVarChar, reason)
      .input('creation_date', sql.NVarChar,creation_date)
      .input('id_user', sql.Int, id_user)
      .input('amount', sql.Decimal(9,3), amount)
      .input('currency', sql.NVarChar, currency)
      .query(queries.createNewMovement);

    res.json({msg: 'new element inserted successfully', category, reason, creation_date, id_user})
  }
  catch(error){
    res.status(500)
    res.send(error.msg);
  }
}

export const getLastTenMovements = async (req, res) =>{
  try{
    const pool = await getConnection();  // get connection llama a la conexion y retorna el pool (conexion preestablecida a la bd)
    const result = await pool.request()
    .input('id_user', req.params.id_user)
    .query(queries.getLastTenMovements);

    // this code here fixes the 
    _timestampNormalizer(result.recordset);
    res.json(result.recordset);
  }
  catch(error){
    console.log('problema en get muvments');
    res.status(500);
    res.send(error.msg);
  }
};

export const deleteMovement = async (req, res)=>{
  try{
    const pool = await getConnection();  // get connection llama a la conexion y retorna el pool (conexion preestablecida a la bd)
    const result = await pool.request()
    .input('id_user', req.params.id_user)
    .input('id', req.params.id)
    .query(queries.deleteMovement); 
    res.sendStatus(204);
  }
  catch(error){
    console.log('problema en delete movement');
    res.status(500);
    res.send(error.msg);
  }
}

export const updateMovement = async (req, res) =>{
  const {reason, amount, creation_date} = req.body;
  // checks for indispensable data
  if (!_isDataInputValid(reason, amount, creation_date)) return res.status(400).json({msg:'bad request'});
  
  try{
    const pool = await getConnection(); 
    const postTest = await pool
      .request()
      .input('reason',sql.NVarChar,  reason)
      .input('amount', sql.Decimal(16, 2) , amount)
      .input('creation_date', sql.NVarChar , creation_date)
      .input('id', sql.Int, req.params.id)
      .query(queries.updateMovement);
    
    res.json({msg: 'new element updated successfully'})
  }
  catch(error){
    res.status(500)
    res.send(error.msg);
  }
}

