const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./views/swagger.json');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
