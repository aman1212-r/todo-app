const pool = require('../config/db');

async function getTodos(userId) {
  const res = await pool.query('SELECT * FROM todos WHERE user_id = $1', [userId]);
  return res.rows;
}

async function createTodo (userId, title, description) {
  const res = await pool.query(
    'INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
    [userId, title, description]
  );
  return res.rows[0];
}

async function updateTodo (id, title, description) {
  const res = await pool.query(
    'UPDATE todos SET title = $1, description = $2 WHERE id = $3 RETURNING *',
    [title, description, id]
  );
  return res.rows[0];
}

async function deleteTodo (id) {
  await pool.query('DELETE FROM todos WHERE id = $1', [id]);
}

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
