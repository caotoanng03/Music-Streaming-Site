"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPassword = void 0;
const isValidPassword = (passwrd) => {
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return passwrd.match(passRegex);
};
exports.isValidPassword = isValidPassword;
