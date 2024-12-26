const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const env = require('dotenv');
const dbConnection = require('./config/db_connection');
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');


const app = express();
app.use(cors());
app.use(bodyParser.json())

// configs
env.config();
dbConnection();

// routes
app.use('/users',userRouter);
app.use('/posts',postRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App is Running on Port ${PORT}`)
})