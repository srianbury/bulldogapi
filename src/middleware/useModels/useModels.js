import models from '../../models';


async function useModels(req, res, next){
    req.context = {
        models,
        // me: await models.User.findByLogin('lcamson'),
    };
    next();
}

export default useModels;
