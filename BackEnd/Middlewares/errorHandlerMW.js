
const errorHandlerMW=(error, req, res, next)=>{

    //set Status code
    const errorStatusCode = res.statusCode == 200 ? 500 : res.statusCode;

    res.status(errorStatusCode);
    res.json({ 
        message: error.message,
    });
};


module.exports = { errorHandlerMW }
