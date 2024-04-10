"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = void 0;
const isValidEmail = (email) => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(validRegex);
};
exports.isValidEmail = isValidEmail;
