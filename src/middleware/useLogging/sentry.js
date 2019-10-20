import * as Sentry from '@sentry/node';

// replace this with a real logging library
function sentryLogger(req, res, next){
    try{
        next();
    } catch(e){
        Sentry.captureException(e);
        return res.status(500).json({ error: 'Internal server error.' }).end();
    }
}

export default sentryLogger;