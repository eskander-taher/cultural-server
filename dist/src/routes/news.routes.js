"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const news_controller_1 = require("../controllers/news.controller");
const tempAuth_1 = __importDefault(require("../middleware/tempAuth"));
const router = express_1.default.Router();
router.get("/", news_controller_1.getAllNews);
router.get("/important", news_controller_1.getImportantNews); // New route for important news
router.get("/:id", news_controller_1.getNewsById);
router.post("/", tempAuth_1.default, news_controller_1.createNews);
router.put("/:id", tempAuth_1.default, news_controller_1.updateNews);
router.delete("/:id", tempAuth_1.default, news_controller_1.deleteNews);
exports.default = router;
//# sourceMappingURL=news.routes.js.map