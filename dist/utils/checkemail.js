"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkemail = void 0;
const checkemail = (email) => {
    if (email.length <= 1) {
        return false;
    }
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
};
exports.checkemail = checkemail;
//# sourceMappingURL=checkemail.js.map