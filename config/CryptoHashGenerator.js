/*
 * CryptoHashGenerator.js
 * services/operahouse-api/controllers/IdentityFramework
 *
 * Created by Li Theen Kok on 2 Jun 2017.
 * Copyright (C) 2017 Apptivity Lab. All Rights Reserved.
 */

const CryptoJS = require("crypto-js")

module.exports = {
    "random": (secret) => {
        return CryptoJS.enc.Hex.stringify(CryptoJS.SHA256(`${new Date().getMilliseconds()}`, secret))
    },

    /**
     * @param {String} message
     * @param {String} salt
     * @param {String} secret
     */
    "sha256Hash": (message, salt = "", secret = "") => {
        const saltedChallenge = `${salt}.${message}`
        const hash = CryptoJS.HmacSHA256(saltedChallenge, secret)
        return CryptoJS.enc.Hex.stringify(hash)
    }
}
