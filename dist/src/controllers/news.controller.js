"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImportantNews = exports.deleteNews = exports.updateNews = exports.getNewsById = exports.getAllNews = exports.createNews = void 0;
const news_model_1 = __importDefault(require("../models/news.model")); // Adjust the path as necessary
// Create a new news item
const createNews = async (req, res) => {
    try {
        const news = new news_model_1.default(req.body);
        await news.save();
        res.status(201).send(news);
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.createNews = createNews;
// Get all news items
const getAllNews = async (req, res) => {
    try {
        const news = await news_model_1.default.find();
        res.status(200).send(news);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.getAllNews = getAllNews;
// Get a single news item by ID
const getNewsById = async (req, res) => {
    try {
        const news = await news_model_1.default.findById(req.params.id);
        if (!news) {
            res.status(404).send();
            return;
        }
        res.status(200).send(news);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.getNewsById = getNewsById;
// Update a news item by ID
const updateNews = async (req, res) => {
    try {
        const news = await news_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!news) {
            res.status(404).send();
            return;
        }
        res.status(200).send(news);
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.updateNews = updateNews;
// Delete a news item by ID
const deleteNews = async (req, res) => {
    try {
        const news = await news_model_1.default.findByIdAndDelete(req.params.id);
        if (!news) {
            res.status(404).send();
            return;
        }
        res.status(200).send(news);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.deleteNews = deleteNews;
// Get all important news items
const getImportantNews = async (req, res) => {
    try {
        const importantNews = await news_model_1.default.find({ isImportant: true });
        res.status(200).send(importantNews);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.getImportantNews = getImportantNews;
//# sourceMappingURL=news.controller.js.map