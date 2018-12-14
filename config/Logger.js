
var winston = require('winston');
const config = require('./Constant');

var options = {
    file: {
      level: 'info',
      filename: config.LOGGER.FILE_NAME,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
    console: {
      level: 'error',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
};

const levels = { 
    error: 0, 
    warn: 1, 
    info: 2, 
    verbose: 3, 
    debug: 4, 
    silly: 5 
};

const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    transports: [
      //new winston.transports.Console(options.console),
      new winston.transports.File(options.file)
    ]
  });

logger.stream = {
    write: function(message) {
      logger.info(message);
    },
};


/* logger
  .clear()          // Remove all transports
  .add(console)     // Add console transport
  .add(files)       // Add file transport
  .remove(console); // Remove console transport */

module.exports = logger;