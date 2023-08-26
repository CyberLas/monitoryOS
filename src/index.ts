import './serverExpress'

import { table } from 'rethinkdb'

import { cpuStatus, memoryStatus, networkStatus } from './monitory'
import { dbRenthink } from './database/rethinkdb'

(async() => {	
	setInterval(async() => {
		const formatNumberWithLeadingZero = (number) => {
			return number < 10 ? `0${number}` : `${number}`;
		}
		
		const now = new Date();
		const day = formatNumberWithLeadingZero(now.getDate());
		const month = formatNumberWithLeadingZero(now.getMonth() + 1);
		const year = now.getFullYear();
		const hours = formatNumberWithLeadingZero(now.getHours());
		const minutes = formatNumberWithLeadingZero(now.getMinutes());
		const seconds = formatNumberWithLeadingZero(now.getSeconds());
	
		table('workstationTime')
		.insert(
			{
				...await cpuStatus(),
				...memoryStatus(),
				...await networkStatus(),
				currentTime: `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
			},
			{ returnChanges: true }
		)
		.run(await dbRenthink, (err, result: any) => {
			if (err) console.log(err)
			console.log(result.changes[0].new_val)
		})
	}, 5000)
})()