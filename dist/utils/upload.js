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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = exports.uploadConfigs = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary = __importStar(require("cloudinary"));
exports.cloudinary = cloudinary;
// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.API_CLOUDINARY_NAME,
    api_key: process.env.API_CLOUDINARY_KEY,
    api_secret: process.env.API_CLOUDINARY_SECRET,
});
// Create multiple storage configurations for different folders
const createStorage = (folderName) => {
    return new multer_storage_cloudinary_1.CloudinaryStorage({
        cloudinary: cloudinary.v2,
        params: {
            folder: folderName,
            allowed_formats: ["jpg", "png", "jpeg", "webp"],
        },
    });
};
// Multiple upload configurations
const uploadConfigs = {
    profile: (0, multer_1.default)({
        storage: createStorage("profile_pictures"),
        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    }).single("image"),
    gallery: (0, multer_1.default)({
        storage: createStorage("gallery_images"),
        limits: { fileSize: 5 * 1024 * 1024 },
    }).array("images", 10), // Allow up to 10 images
    upload: (0, multer_1.default)({
        storage: createStorage("uploads"),
        limits: { fileSize: 5 * 1024 * 1024 },
    }).single("image"),
    product: (0, multer_1.default)({
        storage: createStorage("products"),
        limits: { fileSize: 5 * 1024 * 1024 },
    }).single("image"),
};
exports.uploadConfigs = uploadConfigs;
console.log("Multer middleware configured for multiple upload types with Cloudinary storage");
//# sourceMappingURL=upload.js.map