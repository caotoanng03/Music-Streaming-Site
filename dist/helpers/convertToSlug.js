"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToSlug = void 0;
const unidecode_1 = __importDefault(require("unidecode"));
const convertToSlug = (keyword) => {
    const decodedKeyword = (0, unidecode_1.default)(keyword.trim());
    const formattedSlug = decodedKeyword.replace(/\s+/g, "-");
    return formattedSlug;
};
exports.convertToSlug = convertToSlug;
