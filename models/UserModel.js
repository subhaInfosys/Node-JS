const user = require('../repositories/UserRepository');

class User {

    getUsers(callback) {

        const User = new user();
        var res = {};

        User.orderBy('id', 'asc').get((err, result) => {

            if(err || !result.length){
            // since result is array of objects [{word: 'someword'},{word: 'someword2'}] let's remap it
            //result = result.map(obj => obj.word);
            // result should now look like ['someword','someword2']
            // return it
            //console.log('here ' + result[0].name);

                res = {status:401, code:"ERROR", message:"No result found !!!"};
                callback(null, res);
            } else {
                res = {status:200, code:"SUCCESS", result};
                callback(null, res);
            }
        });
    }

    findUser(id, callback) {

        const User = new user();

        const idArray = JSON.parse("[" + id + "]");
        //var array = string.split(",").map(Number);

        // find used for etrieve a model by its primary key...
        User.find(idArray, (err, result) => {

            if(err || !result.length) return callback('error or no results');
          
            callback(result);
        });
    }

    addUser(data, callback) {

        const User = new user();
        var res = {};

        User.where('email', data.email).get((err, result) => {

            if(err || result.affectedRows < 0) {

                res = {status:400, code:"MYSQL_ERROR", message:"Record insert failed !!!"};
                callback(res); 
            } else {
                if( result.length > 0 ) {
                    res = {status:400, code:"DUPLICATE_ENTRY", message:"Duplicate enity !!!"};
                    callback(res);
                } else {
                    console.log('here');
                    User.save(data, (err, result) => {
                        if(err || result.affectedRows < 0) {
                            res = {status:400, code:"MYSQL_ERROR", message:"Record insert failed !!!"};
                            callback(res); 
                        } else {
                            res = {status:200, code:"SUCCESS", message:"Record inserted successfully !!!"};
                            callback(res);
                        }
                        
                    });
                }
            }

        });
    }

    updateUser(data, args, callback) {

        const User = new user();

        User.where('id', args.id).update(data, (err, result) => {
            if(err || result.affectedRows < 0) return callback('Record update failed !!!');
            callback('Record updated successfully !!!');
        });
    }

    deleteUser(id, callback) {
        const User = new user();
        
        User.where('id', id).delete((err,result) => {
            if(err || result.affectedRows == 0) return callback('Error while deleting record !!!');
            callback('Record deleted !!!');
        });
    }
}

module.exports = User;