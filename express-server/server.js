const express = require('express');
const path = require('path');
const logger = require('./middlewares/logger')
const cors = require('cors');

const app = express();

//Express Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Logger Middleware
app.use(logger); 

//Headers
app.use(cors());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Origin", "*");
//  next();
// });

//Setup API Routes
app.use('/ahprices', require('./routes/api/ahpricesRoutes'));
app.use('/database', require('./routes/database/databaseRoutes'));
app.use('/recipes', require('./routes/recipes/recipesRoutes'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));