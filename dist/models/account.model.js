"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const generate_1 = require("../helpers/generate");
const accountSchema = new mongoose_1.default.Schema({
    fullName: String,
    email: String,
    password: String,
    token: {
        type: String,
        default: function () {
            return (0, generate_1.generateRandomString)(30);
        }
    },
    phone: String,
    avatar: String,
    roleId: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, { timestamps: true });
const Account = mongoose_1.default.model('Account', accountSchema, 'accounts');
exports.default = Account;
