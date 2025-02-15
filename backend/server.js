require('dotenv').config();
const express = require('express')
const cors = require('cors');
const app = express();
const ConnectDB = require('./config/DbConnect')
const route = require('./Routes/todo-route')
app.use(express());
app.use(cors());
app.use(express.json());

// Connecting the DataBase
ConnectDB();
 app.use('/api',route);
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`backend is running in the http://localhost:${port}`);
    })