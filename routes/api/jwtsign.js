const jwt = require('jsonwebtoken');
const config = require("config");

const sign = payload =>{
    var value = null;
    return new Promise(resolve =>{
        jwt.sign(
            payload,
            config.get("jwtSecret"),
        {expiresIn:36000},
        (err,token)=>{
            if (err)throw err;
            resolve (token);
        }
        )
    })
}
module.exports = sign;
