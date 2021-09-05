export const queries = {
  getAllMovements:'SELECT * FROM movements',
  getAllMovsByUser: 'SELECT * FROM movements WHERE id_user = @id_user',
  getSingleMovement: 'SELECT * FROM movements WHERE id = @id',
  createNewMovement: `INSERT INTO movements (
    category,
    reason,
    creation_date,
    id_user,
    amount,
    currency) VALUES (
      @category,
      @reason,
      @creation_date,
      @id_user,
      @amount,
      @currency)`,
  updateMovement: `UPDATE movements SET 
    reason = @reason,
    amount = @amount,
    creation_date = @creation_date WHERE id = @id`,
  deleteMovement: 'DELETE FROM movements WHERE id_user = @id_user and id = @id',
  getLastTenMovements: `SELECT TOP(10)[category]
    , [reason]
    , [creation_date]
    , [id]
    , [id_user] 
    , [amount]
  FROM movements WHERE id_user = @id_user ORDER BY creation_date DESC`,
  ////////////////////// Login Queries
  validateUser: `SELECT * FROM users WHERE email = @email and pass = @pass`,
  createNewUser: `INSERT INTO users (full_name, surname, email, pass) VALUES (@full_name, @surname, @email, @pass)`
}