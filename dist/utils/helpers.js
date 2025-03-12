"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortObject = sortObject;
exports.createHash = createHash;
exports.formatDate = formatDate;
const crypto_1 = require("crypto");
function sortObject(obj) {
    return Object.keys(obj)
        .sort()
        .reduce((result, key) => {
        result[key] = obj[key];
        return result;
    }, {});
}
function createHash(data, secret) {
    return (0, crypto_1.createHmac)('sha512', secret)
        .update(Buffer.from(data, 'utf-8'))
        .digest('hex');
}
function formatDate(date) {
    return date.toISOString()
        .replace(/T/, '')
        .replace(/[-:]/g, '')
        .replace(/\..+/, '');
}
//# sourceMappingURL=helpers.js.map