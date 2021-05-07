const asynchandler = require ('express-async-handler');
const jwt = require('jsonwebtoken');

const authHandlerMW = asynchandler( async(req,res,next)=>{ 
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { 
        try {
            token = req.headers.authorization.split[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            
            const user = await User.findById(decoded.id) 
            req.user= user;
            // //sending token in a HTTP-only Cookie
            // res.cookie("token", token, {
            //     httpOnly: true,
            //     }).send();
            next();

        } 
        catch (error) {
            res.status(401);
            throw Error ('Not authorized, invalid TOKEN')
        }
    }
})

module.exports = authHandlerMW;