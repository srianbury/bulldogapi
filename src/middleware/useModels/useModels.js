import models from '../../models';


function useModels(req, res, next){
    req.context = {
        models,
        // me: await models.User.findByLogin('lcamson'),
    };
    next();
}

export default useModels;
