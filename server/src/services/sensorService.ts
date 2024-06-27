import config from '../config'
import { SENSOR_NAMES } from '../constants/sensor.names'
import { Sensor } from '../models/sensor'
import { getRandomValue } from '../utils/random'
import { saveSensorState } from './redisService'

// Assume sensors are stored in a variable `sensors`
let sensors: Sensor[] = []

const initSensors = async (): Promise<Sensor[]> => {
	// sensors = await loadSensorState()
	sensors = []
	if (sensors.length === 0) {
		const {
			sensorPositionMin,
			sensorPositionMax,
			waterSpeedMin,
			waterSpeedMax,
			waterTemperatureMin,
			waterTemperatureMax,
		} = config

		const waterSpeedX = getRandomValue(waterSpeedMin, waterSpeedMax)
		const waterSpeedY = getRandomValue(waterSpeedMin, waterSpeedMax)
		const waterSpeedZ = getRandomValue(waterSpeedMin, waterSpeedMax)

		sensors = SENSOR_NAMES.map(name => ({
			name,
			position: {
				x: getRandomValue(sensorPositionMin, sensorPositionMax),
				y: getRandomValue(sensorPositionMin, sensorPositionMax),
				z: getRandomValue(sensorPositionMin, sensorPositionMax),
			},
			waterSpeed: {
				x: waterSpeedX,
				y: waterSpeedY,
				z: waterSpeedZ,
			},
			thrustersSpeed: {
				x: -waterSpeedX,
				y: -waterSpeedY,
				z: -waterSpeedZ,
			},
			temperature: getRandomValue(waterTemperatureMin, waterTemperatureMax),
			isLost: false,
			timeInSafeArea: 0,
		}))
		saveSensorState(sensors)
	}
	return sensors
}

const tickSensors = (sensors: Sensor[], safeAreaSize: number): void => {
	sensors.forEach(sensor => {
		if (!sensor.isLost) {
			sensor.position.x = sensor.waterSpeed.x + sensor.thrustersSpeed.x
			sensor.position.y = sensor.waterSpeed.y + sensor.thrustersSpeed.y
			sensor.position.z = sensor.waterSpeed.z + sensor.thrustersSpeed.z

			// Update water speed and temperature with small random increments

			const {
				waterSpeedMin,
				waterSpeedMax,
				waterTemperatureMin,
				waterTemperatureMax,
			} = config

			sensor.waterSpeed.x += getRandomValue(waterSpeedMin, waterSpeedMax)
			sensor.waterSpeed.y += getRandomValue(waterSpeedMin, waterSpeedMax)
			sensor.waterSpeed.z += getRandomValue(waterSpeedMin, waterSpeedMax)
			sensor.temperature += getRandomValue(
				waterTemperatureMin,
				waterTemperatureMax
			)

			sensor.timeInSafeArea += 1

			const distanceSquared =
				Math.pow(Math.abs(sensor.position.x), 2) +
				Math.pow(Math.abs(sensor.position.y), 2) +
				Math.pow(Math.abs(sensor.position.z), 2)

			if (distanceSquared > Math.pow(safeAreaSize, 2)) {
				sensor.isLost = true
			}

			// Save updated state to Redis
			saveSensorState([sensor])
		}
	})
}

const adjustThrusters = async (
	name: string,
	thrusterAdjustments: Partial<{ x: number; y: number; z: number }>
): Promise<void> => {
	// Find the sensor by name
	const sensor = sensors.find(s => s.name === name)
	if (!sensor) {
		throw new Error(`Sensor with name ${name} not found`)
	}

	// Adjust the thrusters' speed
	if (thrusterAdjustments.x !== undefined) {
		sensor.thrustersSpeed.x += thrusterAdjustments.x
	}
	if (thrusterAdjustments.y !== undefined) {
		sensor.thrustersSpeed.y += thrusterAdjustments.y
	}
	if (thrusterAdjustments.z !== undefined) {
		sensor.thrustersSpeed.z += thrusterAdjustments.z
	}

	// Save the updated sensor state to Redis
	await saveSensorState([sensor])
}

export { adjustThrusters, initSensors, tickSensors }
