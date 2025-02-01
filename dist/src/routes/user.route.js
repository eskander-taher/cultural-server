"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
exports.adminRouter = router;
router.post("/login", async (req, res) => {
    const { password } = req.body;
    // Check the password
    const isMatch = password == process.env.PASSWORD;
    if (!isMatch) {
        res.status(400).send({ error: "Invalid password" });
        return;
    }
    // Generate a JWT
    const token = jsonwebtoken_1.default.sign({ role: "admin" }, process.env.JWT_SECRET);
    res.send({ token });
});
//# sourceMappingURL=user.route.js.map