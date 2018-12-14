const Model = require('../models/Model');

class User extends Model {
    constructor() {        
        const _table = 'users';
        super(_table);
    }

    findOrFailUniqueUser(email){
        User.where('email', email).get((err, result) => {
            if(err) return callback(err);
            callback(null, result);
        });
    }

}

module.exports = User;
