import * as dotenv from 'dotenv'

dotenv.config()

// EXPRESS CONSTANTS
export const PORTSERVER: number = Number(process.env.PORT)
export const HOSTSERVER: string = process.env.HOST


// RETHINKDB CONSTANTS
export const HOSTRETHINKDB: string = process.env.HOSTRETHINK
export const DBRETHINKDB: string = process.env.DBRETHINK
export const PORTRETHINKDB: number = Number(process.env.PORTRETHINK)
