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
const randomToken = require('random-token');
const express = require('express');
const router = express.Router();
const prisma = new client_1.PrismaClient();
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const player = yield prisma.player.findUnique({
        where: {
            access_token: req.body.access_token,
        },
        select: {
            id: true,
            name: true,
            score: true,
        }
    });
    if (!player) {
        return res.json({});
    }
    res.json(player);
}));
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const player = yield prisma.player.create({
        data: {
            name: req.body.name,
            score: 0,
            access_token: randomToken(128),
        },
    });
    if (!player) {
        return res.json({});
    }
    res.json(player);
}));
router.post('/score', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const player = yield prisma.player.findUnique({
        where: {
            access_token: req.body.access_token,
        },
        select: {
            score: true,
        }
    });
    if (!player) {
        return res.json({});
    }
    const score = parseInt(req.body.score);
    if (score > player.score) {
        yield prisma.player.update({
            where: {
                access_token: req.body.access_token,
            },
            data: {
                score: score
            },
        });
    }
    res.json({});
}));
module.exports = router;
