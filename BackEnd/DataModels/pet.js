const mongoose = require('mongoose');
//cria  o modelo de pet e suas caracteristicas

const petSchema = new mongoose.Schema({
    
    status: {
        type: String,
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    breed: {
        type: String,
        required: true,
    },
    height: {
        type: Number,
  
    },
    weight: {
        type: Number,
    },
    color: {
        type: String,
    },
    type: {
        type:String,       
    },
    diet: {
        type:String,       
    },
    alergy: {
        type:String,       
    },
    bio: {
        type:String,       
    },
    user_id: { 
        type:String,
        value: 'user.name',
    }
},
    {
        timestamps: true,
    },

    


)

const Pet = mongoose.model('pet', petSchema);

module.exports = Pet;

/*
category : {
    type: String,
},
type: {
    type: String,
    required: [ true , 'Is a dog or Cat?']
},
Name:{
    type: String,
    required: true,
},
Adoptio_Status: {},
Picture: {
    img: "path",
},
Height:{

},
Weight:{

},
Color:{

},
Bio:{

},
Hypoallergenic:{
    type: String ,
    option: yes/no,
},
dietary_restrictions:{

},
breed_of_animal:{

} */
