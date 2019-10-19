import { validationResult } from 'express-validator';

function validateParameters(req, res, next){
    const missingParameters = validationResult(req);
    if(missingParameters.isEmpty()){
        next();
    } else {
        return res.status(422).json({ errors: missingParameters.array() });
    }
}

export default validateParameters;