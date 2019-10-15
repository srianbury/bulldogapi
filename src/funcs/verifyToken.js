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
    next();
  } else {
      const message = 'No Bearer Found.';
      res.status(401).json({ message });
  }
}

export default verifyToken;