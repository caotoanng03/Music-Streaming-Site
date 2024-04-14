"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordPost = exports.resetPassword = exports.otpPasswordPost = exports.otpPassword = exports.forgotPasswordPost = exports.forgotPassword = exports.logout = exports.loginPost = exports.registerPost = exports.register = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const md5_1 = __importDefault(require("md5"));
const generateHelper = __importStar(require("../../helpers/generate"));
const forgot_password_model_1 = __importDefault(require("../../models/forgot-password.model"));
const sendMail_1 = require("../../helpers/sendMail");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('client/pages/user/index', {
        pageTitle: 'Register/ Login'
    });
});
exports.register = register;
const registerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const alreadyExistedUser = yield user_model_1.default.findOne({
        email: email
    }).select("-password -token");
    if (alreadyExistedUser) {
        req.flash('error', "An asociated email have linked to this email");
        return;
    }
    const userData = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: (0, md5_1.default)(req.body.password),
    };
    if (req.body.avatar) {
        userData['avatar'] = req.body.avatar;
    }
    if (req.body.phone) {
        userData['phone'] = req.body.phone;
    }
    const newUser = yield user_model_1.default.create(userData);
    yield newUser.save();
    res.cookie('tokenUser', newUser.tokenUser);
    req.flash('success', 'You successfully registered new account!');
    res.redirect('/');
});
exports.registerPost = registerPost;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_model_1.default.findOne({
        email: email,
        deleted: false
    });
    if (!user) {
        req.flash('error', 'Email is incorrect! Try again.');
        res.redirect(`back`);
        return;
    }
    if ((0, md5_1.default)(password) !== user.password) {
        req.flash('error', 'Password is incorrect! Try again.');
        res.redirect(`back`);
        return;
    }
    if (user.status === 'inactive') {
        req.flash('error', 'The account is being banned! Please contact Admin.');
        res.redirect(`back`);
        return;
    }
    res.cookie('tokenUser', user.tokenUser);
    req.flash('success', 'Successfully logged in!');
    res.redirect('/');
});
exports.loginPost = loginPost;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('tokenUser');
    res.redirect('/');
});
exports.logout = logout;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render(`client/pages/user/otp-send`, {
        pageTitle: 'Forgot Password'
    });
});
exports.forgotPassword = forgotPassword;
const forgotPasswordPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield user_model_1.default.findOne({
        email: email,
        deleted: false
    });
    if (!user) {
        req.flash('error', 'Email does not exist! Try again.');
        res.redirect('back');
        return;
    }
    const otp = generateHelper.generateRandomNumber(6);
    const forgotPasswordObject = {
        email,
        otp,
        expireAt: Date.now()
    };
    const forgotPassword = new forgot_password_model_1.default(forgotPasswordObject);
    yield forgotPassword.save();
    const subject = `[Music-Streaming-Site] Your OTP code`;
    const html = `
    <p>A password recovery event has been triggered. Here is your otp code: <strong>${otp}</strong></p>
    <p>The OTP code is limited to 3 minutes.</p>
    <p>If you do not reset your password within 3 minutes, you will need to submit a new request.</p>
    `;
    (0, sendMail_1.sendMail)(email, subject, html);
    res.redirect(`/user/password/otp?email=${email}`);
});
exports.forgotPasswordPost = forgotPasswordPost;
const otpPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    res.render(`client/pages/user/otp-verify`, {
        pageTitle: 'Verify OTP',
        email
    });
});
exports.otpPassword = otpPassword;
const otpPasswordPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    const doesExist = yield forgot_password_model_1.default.findOne({
        email: email,
        otp: otp
    });
    if (!doesExist) {
        req.flash('error', 'Otp code is not valid! Try again.');
        res.redirect('back');
        return;
    }
    const user = yield user_model_1.default.findOne({
        email: email,
        deleted: false
    });
    res.cookie('tokenUser', user.tokenUser);
    res.redirect(`/user/password/reset`);
});
exports.otpPasswordPost = otpPasswordPost;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render(`client/pages/user/reset-password`, {
        pageTitle: 'Reset Password'
    });
});
exports.resetPassword = resetPassword;
const resetPasswordPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const user = yield user_model_1.default.findOne({
        tokenUser: req.cookies.tokenUser,
    });
    if (!user) {
        res.redirect('back');
        return;
    }
    yield user_model_1.default.updateOne({
        _id: user.id
    }, {
        password: (0, md5_1.default)(password)
    });
    req.flash('success', 'You password was reset successfully!');
    res.redirect('/');
});
exports.resetPasswordPost = resetPasswordPost;
