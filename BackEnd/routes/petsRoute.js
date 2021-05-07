const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Pet = require('../DataModels/pet');
const errorHandlerMW = require('../Middlewares/errorHandlerMW');
const user = require('../DataModels/user')
const petRouter = express.Router();

//Create a Pet
petRouter.post('/insert', expressAsyncHandler(async (req, res) => {
  
    const pet = await Pet.create(req.body);
    const name = req.body.name;
    const breed = req.body.breed
    if (pet) {
        res.status(200);
        res.json(pet);
    } else {
        res.status(500);
        throw new Error('Pet creating Failed')
    }
}));


//Getting a Pet
petRouter.get('/read', expressAsyncHandler(async (req, res) => {
    const pet = await Pet.find({}, (err, result) => {

        if (err) {
            res.status(401);
            res.send(err);
        }
        res.send(result)
            })
        }))



// update
petRouter.put('/:id', expressAsyncHandler(async (req, res) => {
    const pet = await Pet.findById(req.params.id);
    if (pet) {
        const updatedPet = await Pet.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        res.status(200);
        res.json(updatedPet);
    }
    else {
        res.status(500);
        throw new Error('Updated Failed')
    }

}))


//GET all PETs FROM 1 user 
petRouter.get('/saved/:id', expressAsyncHandler(async (req, res) => {
    const userId = await pet.findById(req.params.id);
    try{
        user = await User.findById({_id: ObjectID(userId)});
    } catch (err) { 
        throw new Error ('could not Find user saved pets')
    }
    if(!user) { 
        return res.status(404).json({ message : "user not found to look saved pets"})
    }
res.json({pet:pet})
}))


//Delete Pet
petRouter.delete('/:id', expressAsyncHandler(async (req, res) => {
    try {
        const pet = await Pet.findByIdAndDelete(req.params.id);

        res.status(200);
        res.send(pet);
    } catch (error) {
        res.json(error);
    }

}))




module.exports = petRouter;