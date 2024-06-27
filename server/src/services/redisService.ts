import redis from 'redis'
import { SENSOR_NAMES } from '../constants/sensor.names'
import { Sensor } from '../models/sensor'

const url = process.env.REDIS_URL || 'redis://redis:6379'

const client = redis.createClient({
	url,
})

client.on('connect', () => {
	console.log('Redis client connected')
})
client.on('error', err => console.error('Redis client error', err))

const saveSensorState = async (sensors: Sensor[]): Promise<void> => {
	for (const sensor of sensors) {
		try {
			await client.set(sensor.name, JSON.stringify(sensor))
		} catch (err) {
			console.error(`Error loading sensor data for ${sensor.name}:`, err)
		}
	}
}

const loadSensorState = async (): Promise<Sensor[]> => {
	const sensors: Sensor[] = []

	for (const name of SENSOR_NAMES) {
		try {
			const sensorData = await client.get(name)
			if (sensorData) {
				sensors.push(JSON.parse(sensorData))
			}
		} catch (err) {
			console.error(`Error loading sensor data for ${name}:`, err)
		}
	}
	return sensors
}

export { client, loadSensorState, saveSensorState }
