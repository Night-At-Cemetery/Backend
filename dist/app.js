"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const bp = require('body-parser');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
const playerRoutes = require('./routes/player');
const rankRoutes = require('./routes/rank');
app.use('/player', playerRoutes);
app.use('/rank', rankRoutes);
module.exports = app;
