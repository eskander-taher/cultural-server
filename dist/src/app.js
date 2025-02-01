"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./config/db");
const routes_1 = __importDefault(require("./routes"));
(0, db_1.connectDB)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("/api", routes_1.default);
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "..", "..", "uploads")));
// Set up storage engine
const storage = multer_1.default.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
// Initialize upload variable
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 10_000_000 }, // Limit file size to 10MB
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
}).array("images", 12); // Allow up to 12 images
// Check file type
const checkFileType = (file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        cb(new Error("Images only!"));
    }
};
// Upload route
app.post("/api/upload", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({ message: err.message });
        }
        else {
            if (req.files) {
                res.status(200).json({
                    message: "Files uploaded successfully",
                    files: req.files,
                });
            }
            else {
                res.status(400).json({ message: "No files uploaded" });
            }
        }
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map