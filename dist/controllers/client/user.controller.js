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
exports.registerPost = exports.register = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('client/pages/user/index', {
        pageTitle: 'Register/ Login'
    });
});
exports.register = register;
const registerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const alreadyExisted = yield user_model_1.default.findOne({
        email: email
    }).select("-password -token");
    if (alreadyExisted) {
        req.flash('error', "An asociated email have linked to this email");
        return;
    }
    const userData = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
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
