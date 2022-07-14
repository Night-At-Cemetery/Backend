import {Request, Response, NextFunction} from 'express';
import {PrismaClient} from '@prisma/client'

const randomToken = require('random-token');
const express = require('express');
const router = express.Router();

const prisma = new PrismaClient()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const player = await prisma.player.findUnique({
        where: {
            access_token: req.body.access_token,
        },
        select: {
            id: true,
            name: true,
            score: true,
        }
    })

    if (!player) {
        return res.json({});
    }

    res.json(player)
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const player = await prisma.player.create({
        data: {
            name: req.body.name,
            score: 0,
            access_token: randomToken(128),
        },
    })

    if (!player) {
        return res.json({});
    }

    res.json(player)
});

router.post('/score', async (req: Request, res: Response, next: NextFunction) => {

    const player = await prisma.player.findUnique({
        where: {
            access_token: req.body.access_token,
        },
        select: {
            score: true,
        }
    })

    if (!player) {
        return res.json({});
    }

    const score = parseInt(req.body.score);

    if (score > player.score) {
        await prisma.player.update({
            where: {
                access_token: req.body.access_token,
            },
            data: {
                score: score
            },
        })
    }

    res.json({})
});

module.exports = router;
