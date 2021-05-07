const express = require('express');
const User = require('../DataModels/user');
const asyncHandler = require('express-async-handler')
const jwtToken = require('../utils/jwtToken');
const authHandlerMW = require('../Middlewares/authHandlerMW');

const userRoute = express.Router();

//Register User
userRoute.post('/register', asyncHandler( async(req,res)=>{
        const {firstName,lastName,phoneNum, email, password} = req.body;
        const userExists = await User.findOne({email: email});
        console.log(userExists) 
        if(userExists) {
             res.status(401);
             throw new Error('User Already Exist');
         }
         res.status(200);
         const userCreated = await User.create({firstName,lastName,phoneNum, email, password});
         const result = await User.findById(userCreated._id)
         res.json({
            _id: userCreated._id,
            firstName: userCreated.firstName,
            lastName: userCreated.lastName,
            phoneNum: userCreated.phoneNum,
            email: userCreated.email,
            password:userCreated.password,
            token: jwtToken(userCreated._id),
            result: result
        });

}));

//Login User
userRoute.post('/login', asyncHandler(async(req,res)=>{
    const{email,password} = req.body;
    //this  part authenticate only the email from user 
    const user = await User.findOne({email});

    if(user && await user.isPasswordMatch(password)) {
        //status server ok 
        //returning to user the login data Json
        const result = await User.findById(user._id)
        res.status(200);
        res.json({
            _id: user._id,
            name: user.name,
            password:user.password,
            email: user.email,
            token: jwtToken(user._id),
            result: result
        });
    }else{
        res.status(401);
        throw new Error('User/Email Invalid ')
    }
}))

//Update User
// userRoute.put('/:id', authHandlerMW, (req,res)=>{
//     res.send(' Update route')  
    
//         const user = await User.findById(req.params.id);
//         if (user) {
//             const updatedPet = await Pet.findByIdAndUpdate(
//                 req.params.id,
//                 req.body,
//                 {
//                     new: true,
//                     runValidators: true,
//                 }
//             );
//             res.status(200);
//             res.json(updatedPet);
//         }
//         else {
//             res.status(500);
//             throw new Error('Updated Failed')
//         }
    
//     }))
      
// });
//Delete User 
userRoute.delete('/delete/:id', (req,res)=>{
    const id = req.params.id;
    res.send(' Delete route')    
});
//GET Users
userRoute.get('/get/:id', async (req,res)=>{
  
    const result = await User.findById(req.params.id)
    res.send(result) 
    // res.send("get user route") 
    
});


module.exports = userRoute;