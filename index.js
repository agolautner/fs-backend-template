require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { logger } = require('./middleware/logger')
const auth = require('./middleware/auth')
const errorHandler = require('./middleware/errorHandler')

const app = express();
const port = process.env.PORT;

app.use(
    cors({
    origin: process.env.APP_URL
    })
);
app.use(express.json());

app.use(logger);

/* app.get('/api/public', (req, res) => {
    console.log('public')
    res.send('Hello World Public!')
})

app.get('/api/private', auth({block: true}), (req, res) => {
    console.log('private');
    res.send(`Hello World Private id: ${res.locals.userId}!`)
})

app.get('/api/prublic', auth({block: false}), (req, res) => {
    if (!res.locals.userId) return res.send('hello world public');
    res.send(`hello world prublic, your id is: ${res.locals.userId}`);
}) */
    
//errorHandlert utolsokent hivjuk meg
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/templateDB', () => {
    app.listen(port, () => {
        console.log(`Listening at ${port}`)
    });
});