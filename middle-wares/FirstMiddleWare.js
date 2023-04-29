const check = (req, res, next)=>{
    try {
        if(req.body !=={}){
            next(); // At a time one response can snd/access ◀️◀️◀️◀️ this one 
        }
        else{
            res.json({
                Message:'You reached MiddleWare (🚗🚗🚗)', //◀️◀️◀️◀️ or this one
                Result:req.body
            })
        }
        console.log(req.body);
       
    } catch (error) {
        res.json({
            Message:error.message,
            Result:null
        })
    }
}

module.exports = {
    check
}