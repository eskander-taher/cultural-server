"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware to verify JWT and attach user payload to the request
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'Unauthorized' });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.currentUser = payload;
        next();
    }
    catch (err) {
        return res.status(401).send({ error: 'Unauthorized' });
    }
};
// Middleware to check if the user is an admin
const requireAdmin = (req, res, next) => {
    if (!req.currentUser || req.currentUser.role !== 'admin') {
        return res.status(403).send({ error: 'Forbidden' });
    }
    next();
};
// Combined middleware to use in routes
const adminAuthMiddleware = [verifyToken, requireAdmin];
exports.default = adminAuthMiddleware;
//# sourceMappingURL=auth.js.map