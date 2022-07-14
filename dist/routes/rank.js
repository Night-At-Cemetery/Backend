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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express = require('express');
const router = express.Router();
const prisma = new client_1.PrismaClient();
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const players = yield prisma.player.findMany({
        take: 100,
        select: {
            id: true,
            name: true,
            score: true,
        },
        orderBy: {
            score: 'desc',
        }
    });
    res.json(players);
}));
module.exports = router;
