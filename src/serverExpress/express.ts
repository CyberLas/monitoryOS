import express from 'express'

const	app = express(),
		port = 3000

app.get('/', (_: any, res: any) => {
	res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

export const server = app