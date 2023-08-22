
import systemInfo	from 'systeminformation'
import * as dotenv from 'dotenv'
dotenv.config()
import './serverExpress'
import { bytesToGB, mHzToGHz }	from './global'
import { readRethink }			from './database'

let memoryDescription = systemInfo.memLayout().then((data) => (
		data.map(o => {
			return {
				size: bytesToGB(o.size),
				bank: `${o.bank} GB`,
				type: `${o.type} GB`,
				clockSpeed: mHzToGHz(o.clockSpeed),
				manufacturer: `${o.manufacturer} GB`,
			}
		})
	)),
	memoryParams = systemInfo.mem().then(async(data) => {
		return {
			free: bytesToGB(data.free),
			used: bytesToGB(data.used),
			total: bytesToGB(data.total),
			active: bytesToGB(data.active),
			available: bytesToGB(data.available),
			advanceMemory: await memoryDescription,
		}
	}),
	partitionDisk = systemInfo.fsSize().then(async(data) => (
		data.map(o => {
			return {
				fs: o.fs,
				type: o.type,
				use: `${o.use} %`,
				size: bytesToGB(o.size),
				available: bytesToGB(o.available),
			}
		})
	)),
	diskParams = systemInfo.diskLayout().then(async(data) => {
		return data.map(async(o) => {
			return {
				nameDisk: o.name,
				typeDisk: o.type,
				sizeDisk: bytesToGB(o.size),
				partitionDisk: await partitionDisk,
			}
		})
	}),
	cpuInformation = systemInfo.get({
		cpu: '*',
		osInfo: '*',
	}).then(data => (
		{
			manufacturer: data.cpu.manufacturer,
			brand: data.cpu.brand,
			speedMin: data.cpu.speedMin,
			speedMax: data.cpu.speedMax,
			cores: data.cpu.cores,
			physicalCores: data.cpu.physicalCores,
			performanceCores: data.cpu.performanceCores,
			efficiencyCores: data.cpu.efficiencyCores,
			processors: data.cpu.processors,

			platform: data.osInfo.platform,
			distro: data.osInfo.distro,
			release: data.osInfo.release,
			arch: data.osInfo.arch,
			hostname: data.osInfo.hostname,
			fqdn: data.osInfo.fqdn,
		}
	));

(async() => {
	// console.log(process.env.PORT)
	// console.log(await memoryParams)
	console.log(await diskParams)
	// console.log(await cpuInformation)
	// console.log(await readRethink({dbName: 'notifyTime', orderBy: { order: 'desc', column: 'create_notifyTime' }}))
})()