const user = require('../models/UserModel');
var logger = require('../config/Logger');

const User = new user();
const CryptoJS = require('../config/CryptoHashGenerator');


exports.users_get_all = (req, res, next) => {

    User.getUsers((err, result) => {

        res.status(result.status).json(result);
    });
}

exports.users_create_user =  (req, res, next) => {    
    logger.info('user controller || create user ');
    const input = JSON.parse(JSON.stringify(req.body));
    
    if( !input.name || !input.email ) {
        res.status(422).json({
            data: 'validation error'
        });
    } else {

        try {
           
            const data = {
                name    : input.name,
                email   : input.email,
                skills  : input.skills,
                challenge  : CryptoJS.sha256Hash(
                                'q1234567',
                                'yY6pImsu4yZsdoYawn6jqizC',                                
                                'kzdqfTDP7j6PBqnz4awSUf8A'
                            )
            };
                
            User.addUser(data, (result) => {
                
                res.status(result.status).json(result);
            });
        } catch (error) {
            
        }
    }
}

exports.users_manage_user =  (req, res, next) => {

    const input = JSON.parse(JSON.stringify(req.body));        

    const data = {
        name    : input.name,
        skills  : input.skills            
    };

    const args = {
        id  : input.id
    };

    User.updateUser(data, args, (result) => {    
        res.status(200).json({
            data: result
        });
    });
}

exports.users_delete_user =  (req, res, next) => {

    const id = req.params.userId;

    User.deleteUser(id, (result) => {    
        res.status(200).json({
            data: result
        });
    });
}

exports.users_find_by_id =  (req, res, next) => {

    const id = req.params.userId;

    User.findUser(id, (result) => {
        res.status(200).json({
            data: result
        });
    });
}
    