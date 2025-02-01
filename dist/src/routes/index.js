"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("./user.route");
const news_routes_1 = __importDefault(require("./news.routes"));
const apiRouter = express_1.default.Router();
apiRouter.get("/", (_, res) => {
    res.send("Welcome to moulhaqia server");
});
apiRouter.use("/news", news_routes_1.default);
apiRouter.use("/admin", user_route_1.adminRouter);
exports.default = apiRouter;
//# sourceMappingURL=index.js.map