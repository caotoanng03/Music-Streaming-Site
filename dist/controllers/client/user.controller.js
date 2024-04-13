"use strict";
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
exports.logout = exports.loginPost = exports.registerPost = exports.register = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const md5_1 = __importDefault(require("md5"));
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
