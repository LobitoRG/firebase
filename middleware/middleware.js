const jwt = require('jsonwebtoken');
const JWT_SECRET= require('../controllers/authController').JWT_SECRET;

function authenticationToken(req, res, next){
    const authHeader = req.headers['authorization'];
    console.log (authHeader);
    const token = authHeader && authHeader.split(' ')[1]
    if(!token)
        return res.status(403).json({code: 403, message: 'No es un token'})
    
    jwt.verify(token, JWT_SECRET, (err, user)=>{
      console.log(err)
      if (err){
         switch(err.name){
            case 'JsonWebTokenError':
                return res.status(403).json({code:403, message: 'Token invalido'})
            case 'TokenExpiredError':
                return res.status(401).json({code:401, message: 'Token expirado'})
            default:
                return res.status(400).json({code:400, message: 'Error al verificar el token'})

            }

      }
      req.user = user;
      next();
    }); 
}
module.exports = authenticationToken;