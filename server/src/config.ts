import dotenv from 'dotenv'

dotenv.config()

const config = {
	port: process.env.PORT || 3000,
	tickInterval: parseInt(process.env.TICK_INTERVAL || '1000', 10),
	safeAreaSize: parseInt(process.env.SAFE_AREA_SIZE || '100', 10),
	sensorPositionMin: parseFloat(process.env.SENSOR_POSITION_MIN || '-50'),
	sensorPositionMax: parseFloat(process.env.SENSOR_POSITION_MAX || '50'),
	waterSpeedMin: parseFloat(process.env.WATER_SPEED_MIN || '-1'),
	waterSpeedMax: parseFloat(process.env.WATER_SPEED_MAX || '1'),
	thrusterSpeedMin: parseFloat(process.env.THRUSTER_SPEED_MIN || '-2'),
	thrusterSpeedMax: parseFloat(process.env.THRUSTER_SPEED_MAX || '2'),
	waterTemperatureMin: parseFloat(process.env.WATER_TEMPERATURE_MIN || '0'),
	waterTemperatureMax: parseFloat(process.env.WATER_TEMPERATURE_MAX || '30'),
}

export default config
