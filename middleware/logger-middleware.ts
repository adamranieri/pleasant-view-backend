
// Middleware is an Express term for a function that transforms/uses youre req/res objects before passes it along to more middleware

import { Request, Response } from "express";
import winston, { format } from 'winston'

const logger = winston.createLogger({
    level:"info",
    format:winston.format.combine(winston.format.json()),
    defaultMeta: {service:"pleasent-view-backend"},

    transports:[
        new winston.transports.File({filename:"RequestLogs.log"})
    ]
})

export default function logMiddleware(req:Request, res: Response, next:Function){
    const url = req.url
    const verb = req.method;
    logger.info(`A  ${verb} request was made to ${url}`)
    next()
}