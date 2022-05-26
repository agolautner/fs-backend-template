const router = require('express').Router();

router.post('/api/login', async (req, res) => {
    /* 
    receive google code --> get google token --> get userId
    googleId exists ? send jwt token : create user and send jwt token
    */
});