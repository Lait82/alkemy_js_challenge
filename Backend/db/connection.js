import sql from 'mssql';

// sql.connect(dbSettingsObj);  // <--- this is an async method

const dbDefaultSettings ={
  user: 'lait',
  password: 'admin1234',
  server:'localhost',
  database: 'budgetDB',
  options: {
    encrypt: true,  
    trustServerCertificate: true,
  },
  
}
export async function getConnection(dbSettingsOpt = dbDefaultSettings){

  try{
    const pool = await sql.connect(dbSettingsOpt);
    return pool;
  }
  catch(error){
    console.error(error);
  }
  
}

getConnection();