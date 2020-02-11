const {createUser, getUserById, updateUserById, deleteUserById } = require('./controllers/user');

const express = require ('express');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.post('/user',createUser);
app.get('/user/:id',getUserById);
app.patch('/user/:id',updateUserById);
app.delete('/user/:id',deleteUserById);

app.listen( PORT, () => console.log( `Example app listening on port ${PORT}!` ) );