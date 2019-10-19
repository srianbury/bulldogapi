import jwt from 'jsonwebtoken';

/*
    Token format:
    Authorization: Bearer blahblaktokentoken
*/
function verifyToken(req, res, next){
  // get the auth header value
  const bearerHeader = req.headers.authorization;
  if(typeof bearerHeader !== 'undefined'){
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;

    jwt.verify(bearerToken, process.env.JWT_SCRT_KEY, (error, userInfo) => {
        req.userInfo = userInfo;
        if(!error){
            next();
        } else {
            res.status(401).json({ error });
        }
    });
  } else {
      const message = 'No Bearer Found.';
      res.status(401).json({ message });
  }
}

export default verifyToken;