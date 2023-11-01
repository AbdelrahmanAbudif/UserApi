const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000
//Trying to connect to mongodb
connectDB();
app.use(express.json());
app.get('/', (req , res) => res.send('API RUNNING'));
app.use('/user' , require('./routes/api/user'));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));