import mongoose from "mongoose";
import * as generate from "../helpers/generate";

const accountSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    token: {
        type: String,
        default: function () {
            return generate.generateRandomString(30);
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

const Account = mongoose.model('Account', accountSchema, 'accounts');

export default Account;