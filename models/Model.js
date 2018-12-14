const mysql  = require('mysql');
const config = require('../config/Constant');

class Model {

  constructor( table ) {

    this._dbConfig = {
      host     : config.DB_HOST,
      port     : config.DB_PORT,
      user     : config.DB_USERNAME,
      password : config.DB_PASSWORD,
      database : config.DB_DATABASE
    };    

    this._createConnection(this._dbConfig);

    this._table = table;
    this._andArgs = {};
    this._orArgs = {};
    this._orderBy = {};
  }

    
  _createConnection (connection) {

    this._con = mysql.createConnection(connection);
  
  this._con.connect((err) => {
    if (err) {                            
        console.log('Not Connected');
    } else {
        console.log('Connected');
    }
  });
}  

_closeConnection() {
  this._con.end(()=> {
    console.log('Connection closed');
  }) ;
}

    
where(arg, val) {
    this._andArgs[arg] = val;
    return this;
}

orWhere(arg, val) {
    this._orArgs[arg] = val;
    return this;
}

orderBy(arg, val) {
  this._orderBy[arg] = val;
  return this;
}

_getQueryString() {
    var query = '';

    const andArr  = this._andArgs;
    const orArr   = this._orArgs;
    const orderBy = this._orderBy;

    var i=0;

    for (const key in andArr) {
        if (andArr.hasOwnProperty(key)) {

            if( i==0 ) {
              query = query.concat(" WHERE " + key + " = '"+ andArr[key] +"'"); 
            } else {                    
              query = query.concat(" AND "+ key + " = '"+ andArr[key] +"'");
            }

            i++;
        }
    }

    for (const key in orArr) {
        if (orArr.hasOwnProperty(key))
        query = query.concat(" OR "+ key +" = '"+ orArr[key] +"'");
    }

    var i=0;

    for (const key in orderBy) {
      if (orderBy.hasOwnProperty(key)) {

        if( i==0 ) {
          query = query.concat(" ORDER BY " + key +" "+ orderBy[key]); 
        } else {                    
          query = query.concat(", "+ key +" "+ orderBy[key]);
        }

        i++;
    }
  }

    return query;
}

  get(callback) {
    const where = this._getQueryString();

    const query = "SELECT * FROM " + this._table + where;
    
    let _this = this;
    this._con.query(query, function (err, rows, fields) {
        if(err) return callback(err);
        callback(null, rows);
        _this._closeConnection();
    });
  }

  find(id, callback) {

    const query = "SELECT * FROM " + this._table + " WHERE id IN (" + mysql.escape(id) + ")";
    
    let _this = this;
    this._con.query(query, function (err, rows, fields) {
        if(err) return callback(err);
        callback(null, rows);
        _this._closeConnection();
    });
  }

  save(data, callback) {
    
    this._con.query("INSERT INTO " + this._table + " SET ? ", data, (err, rows, fields) => {
        if(err) return callback(err);
        callback(null, rows);
        this._closeConnection();
    });
  }

  updateWhere(data, args, callback) {
    
    this._con.query("UPDATE " + this._table + " SET ? WHERE ? ",[data, args], (err, rows, fields) => {
        if(err) return callback(err);
        callback(null, rows);
        this._closeConnection();
    });
  }

  update(data, callback) {

    const where = this._getQueryString();

    this._con.query("UPDATE " + this._table + " SET ? " + where, [data], (err, rows, fields) => {
        if(err) return callback(err);
        callback(null, rows);
        this._closeConnection();
    });
  }

  deleteById(args, callback) {
    this._con.query("DELETE FROM " + this._table + " WHERE ? ", args, (err, rows, fields) => {
        if(err) return callback(err);
        callback(null, rows);
        this._closeConnection();
    });
  }  

  delete(callback) {
        
    const where = this._getQueryString();

    const query = "DELETE FROM " + this._table + where;

    this._con.query(query, (err, rows, fields) => {
      if(err) return callback(err);
      callback(null, rows);
      this._closeConnection();
    });
}

  dbRaw(query, callback) {
    this._con.query(query, (err, rows, fields) => {
        if(err) return callback(err);
        callback(null, rows);
        this._closeConnection();
    });
  }
 
}

module.exports = Model;


