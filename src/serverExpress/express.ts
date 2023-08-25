import express from 'express'

import { PORTSERVER } from '../global'

const	app = express()

app.get('/', (_: any, res: any) => {
	res.send('Hello World!')
})

app.listen(PORTSERVER, () => {
    console.log(`Example app listening on port ${PORTSERVER}`)
})

export const server = app