require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const session = require('express-session');
const { SERVER_PORT, DB_STRING, SESSION_SECRET } = process.env;

const { register, login, getPosts, getPost, postNewArticle, deletePost, logout, getMe } = require('./controller');

// middleware
app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

massive({
    connectionString: DB_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db);
    console.log('Database connected!');
});
// endpoint

// auth
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);
app.get('/api/auth/me', getMe);
// app.get('/api/posts/:userid', getPosts);
app.get('/api/posts', getPosts);
app.get('/api/post/:postid', getPost);
// app.post('/api/post/:userid', postNewArticle);
app.post('/api/post', postNewArticle);
app.delete('/api/post/:postid', deletePost);
app.post('/api/auth/logout', logout);

// listen
app.listen(SERVER_PORT, () => console.log('Server is listening to port', SERVER_PORT));