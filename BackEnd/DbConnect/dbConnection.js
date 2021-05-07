const mongoose = require('mongoose');

//mongoose DB connection
const dbConnection =()=>{
mongoose.connect(process.env.MONGODB_URL,{ 
    useFindAndModify: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParse: true,
    }
)
.then(()=>{console.log(`DB Connected`)})
.catch((err)=>console.log(err))
}

module.exports = dbConnection;