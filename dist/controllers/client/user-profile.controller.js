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
exports.editProfilePost = exports.editProfile = exports.profile = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('client/pages/user/profile', {
        pageTitle: 'Profile'
    });
});
exports.profile = profile;
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('client/pages/user/profile-edit', {
        pageTitle: 'Edit Profile'
    });
});
exports.editProfile = editProfile;
const editProfilePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email } = req.body;
    const profileData = {
        fullName,
        email,
    };
    if (req.body.phone) {
        profileData['phone'] = req.body.phone;
    }
    if (req.body.avatar) {
        profileData['avatar'] = req.body.avatar;
    }
    yield user_model_1.default.updateOne({
        tokenUser: req.cookies.tokenUser
    }, profileData);
    req.flash('success', 'Profile updated successfully!');
    res.redirect('/user/profile');
});
exports.editProfilePost = editProfilePost;
