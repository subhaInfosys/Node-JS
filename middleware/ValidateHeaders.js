const config = require('../config/Constant');

module.exports =  (req, res, next) => {
    
    const appKey = req.headers['x-application-key'];

    if( appKey == undefined ) {
        res.status(422).json({
            error: "Missing X-Application-Key header."
        });
    } else if( config.X_APPLICATION_KEY != appKey ) {
        res.status(403).json({
            error: "Invalid X-Application-Key header."
        });
    }else {   
       next();
    }
}

