
var appRoot = require('app-root-path');

var d = new Date(), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();

module.exports = {
  "APP_PORT": process.env.APP_PORT || 3000,
  "LOGGER": {
    "DIR_PATH":   `${appRoot}/storage/logs/`,
    "LOG_CHANNEL": process.env.LOG_CHANNEL || "single",
    "FILE_NAME":   (process.env.LOG_CHANNEL=='daily')? `${appRoot}/storage/logs/applog-` +day+`-`+month +`-`+year+`.log` : `${appRoot}/storage/logs/applog.log`
  },
  "IDENTITY": {
    "JWT_ISSUER": process.env.JWT_ISSUER || "accounts.ums",
    "JWT_SECRET": process.env.JWT_SECRET || "verysecretivesecret",
    "CHALLENGE_SECRET": process.env.CHALLENGE_SECRET || "kzdqfTDP7j6PBqnz4awSUf8Adfsad",
    "CHALLENGE_SALT": process.env.CHALLENGE_SALT || "yY6pImsu4yZsdoYawn6jqizCcxz",
  },
  "APP_NAME":  process.env.APP_NAME || "ums",
  "APP_ENV":   process.env.APP_ENV || "local",
  "APP_DEBUG": process.env.APP_DEBUG || "true",
  "APP_KEY":   process.env.APP_KEY || "5Syw49JVgmCDrGv5QBDbxtDvpTR2XxkF36Vr4EMVkvDVecJX",
  "APP_TIMEZONE": process.env.APP_TIMEZONE || "UTC",
  "APP_PORT":     process.env.APP_PORT || 3000,

  "DB_CONNECTION":  process.env.DB_CONNECTION || "mysql",
  "DB_HOST":        process.env.DB_HOST || "127.0.0.1",
  "DB_PORT":        process.env.DB_PORT || 3306,
  "DB_DATABASE":    process.env.DB_DATABASE || "node_test",
  "DB_USERNAME":    process.env.DB_USERNAME || "root",
  "DB_PASSWORD": "",
  
  "X_APPLICATION_KEY": process.env.X_APPLICATION_KEY || "5Syw49JVgmCDrGv5QBDbxtDvpTR2XxkF36Vr4EMVkvDVecJX"
  
}
