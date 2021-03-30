const express = require('express');
const path = require('path');
const logger = require('./middlewares/logger')

const app = express();

//Express Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Logger Middleware
app.use(logger); 

//Setup API Routes
app.use('/ahprices', require('./routes/api/ahpricesRoutes'));
app.use('/database', require('./routes/database/databaseRoutes'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));