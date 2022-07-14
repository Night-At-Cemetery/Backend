import {Request, Response, NextFunction} from 'express';
import {PrismaClient} from '@prisma/client'

const express = require('express');
const router = express.Router();

const prisma = new PrismaClient()

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const players = await prisma.player.findMany({
        take: 100,
        select: {
            id: true,
            name: true,
            score: true,
        },
        orderBy: {
            score: 'desc',
        }
    })

    res.json(players)
});

module.exports = router;
