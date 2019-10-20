// replace this with a real logging library
function consoleLogger(req, res, next){
    try{
        next();
    } catch(e){
        console.log(e.message);
        return res.status(500).json({ error: 'Internal server error.' }).end();
    }
}

export default consoleLogger;