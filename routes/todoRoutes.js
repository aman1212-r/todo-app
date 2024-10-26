const express = require('express');
const todoController = require('../controllers/todoController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authenticateToken, todoController.getTodos);
router.post('/', authenticateToken, todoController.createTodo);
router.put('/:id', authenticateToken, todoController.updateTodo);
router.delete('/:id', authenticateToken, todoController.deleteTodo);

module.exports = router;
