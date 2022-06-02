const router = require('express').Router();
const httpModule = require('../utils/http');
const http = httpModule(); //later on we might want to set a baseURL as an argument to this function call
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const config = {
    google: {
        client_id: '423125049963-vnhlm59vvirdjsquu0efhqvq5u91orks.apps.googleusercontent.com', //fefi's credentials, pls don't abuse them, thanks so much
        client_secret: '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',
        redirect_uri: 'http://localhost:3000/callback',
        token_endpoint: 'https://oauth2.googleapis.com/token',
        grant_type: 'authorization_code',
        scope: "openid"
    },
    /* facebook: {
        client_id: '', //app_id?
        client_secret: '', //app_secret?
        redirect_uri: '',
        token_endpoint: '',
        grant_type: 'authorization_code',
    }, */

}

router.post('/login', async (req, res) => {
    const payload = req.body;
    if (!payload) return res.sendStatus(400);

    const code = payload.code;
    const provider = payload.provider;
    if (!code || !provider) return res.sendStatus(400); //not enough data!

    if (!Object.keys(config).includes(provider)) return res.sendStatus(400); //dummy stuff sent

    const response = await http.post(config[provider].token_endpoint, {
        "code": code,
        "client_id": config[provider].client_id,
        "client_secret": config[provider].client_secret,
        "redirect_uri": config[provider].redirect_uri,
        "grant_type": "authorization_code"
    })

    if (!response) return res.sendStatus(500);
    if (response.status !== 200) return res.sendStatus(401);

    const decoded = jwt.decode(response.data.id_token);
    if (!decoded) return res.sendStatus(500);

    const key = `providers.${provider}`
    const user = await User.findOneAndUpdate(
        {[key]: decoded.sub},
        {
            providers: { [provider]: decoded.sub }
        },
        { upsert: true, new: true }
    );

   const sessionToken = jwt.sign(
       { userId: user.id, providers: user.providers }, 
       process.env.JWT_SECRET, 
       { expiresIn: '1h' }
    );
   res.json({sessionToken});

    // User.create({
    //     "providers": {[provider]: decoded.sub}
    // })

    /* 
    receive google code --> get google token --> get userId
    googleId exists ? send jwt token : create user and send jwt token
    */
});

module.exports = router;