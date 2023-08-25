import os		from 'os'
import ping		from 'ping'
import osUtils	from 'os-utils'

export	const cpuStatus = () : Promise<{ usedCPU: string; freeCPU: string }> => new Promise((resolve) => {
		osUtils.cpuUsage((value: any) => {
			resolve({
				usedCPU: `${(value * 100).toFixed(2)}%`,
				freeCPU: `${(100 - Number(value * 100)).toFixed(2)}%`
			})
		});
	})

export	const memoryStatus = () => {
		const	totalMemory = os.totalmem(),
				freeMemory = os.freemem(),
				usedMemory = totalMemory - freeMemory,
				ramUsagePercentage = (usedMemory / totalMemory) * 100;

		return {
			usedRAM: `${ramUsagePercentage.toFixed(2)}%`,
			freeRAM: `${100 - Number(ramUsagePercentage.toFixed(2))}%`
		}
	}

export	const networkStatus = () : Promise<{ urlRED: string; statusRED: number, msRED: string}> => new Promise((resolve) => {
		ping.promise.probe('google.com')
			.then((result: any) => {
				resolve({
					urlRED: result.host,
					statusRED: 200,
					msRED: `${result.time} ms`,
				})
			})
			.catch(() => {
				resolve({
					urlRED: 'google.com',
					statusRED: 400,
					msRED: `0 ms`,
				})
			})
	})
