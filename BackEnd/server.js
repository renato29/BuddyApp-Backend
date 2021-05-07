const express = require('express');
const mongoose = require('mongoose')
const path = require ('path');
const cors = require('cors')
const dotenv = require('dotenv');
require('./DbConnect/dbConnection');
const dbConnection  = require('./DbConnect/dbConnection');
const error = require('./Middlewares/errorHandlerMW');
// const passport = require('passport');

const userRoute  = require('./routes/userAuthRoutes');
const petRouter = require('./routes/petsRoute');


dotenv.config()

//passport config 
// require('./config/passport')(passport);

const app = express();

//mongoose DB connection
dbConnection();
//passing bodyData 
app.use(express.json())
app.use(cors())

//Static Folder 
// app.use(express.static(path.join(__dirname, "public")))
//Routers

    //Users
    app.use('/api/user', userRoute)
    //Pets
    app.use('/api/pets', petRouter);
    //Google Route
    // app.use('/api/user', require('./routes/authG'))    

//Error Middleware
app.use(error.errorHandlerMW);


// // Sessions  
// app.use(
//     session({
//     secret: 'keyboard cat',
//     resave: false, 
//     saveUninitialized: false ,
//     store: MongoStore.create({mongoUrl: 'mongodb://localhost/test-app'})
// }))
    
    //resave: dont save session if nothing modified
    //saveUnitinitialized dont save a session until something is modify.

//passport MW
// app.use(passport.initialize())
// app.use(passport.session())


//Server
const PORT = process.env.PORT|| 5050;

const HOST = '0.0.0.0';

app.listen(PORT,() =>{
    console.log(`Server is runing in http://localhost:${PORT}/${HOST}`);
})

