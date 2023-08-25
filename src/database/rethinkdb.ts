import * as rethinkdb from 'rethinkdb'
import { DBRETHINKDB, HOSTRETHINKDB, PORTRETHINKDB } from '../global'
import { readRenthinkDB } from '@typeData'

const	configRethinkdb = {
			host: HOSTRETHINKDB,
			port: PORTRETHINKDB,
			db	: DBRETHINKDB,
		}

export const dbRenthink = rethinkdb.connect(configRethinkdb)

export const readRethink = ({
	dbName = '',
	filter = {},
	orderBy = null,
}: readRenthinkDB) => new Promise(async(resolve, reject) => {
	rethinkdb.table(dbName)
		.filter(filter)
		.orderBy(orderBy && (orderBy.order === 'asc' ? rethinkdb.asc(orderBy.column) : rethinkdb.desc(orderBy.column) ) )
		.run(await dbRenthink, (err, cursor) => {
			if (err) reject(err)
			cursor.toArray((err, result) => {
				if (err) reject(err)
				resolve(result)
			})
		})
})
