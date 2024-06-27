import { WebSocketServer } from 'ws'
import app from './app'
import config from './config'
import { client as redisClient } from './services/redisService'
import { initSensors, tickSensors } from './services/sensorService'

const PORT = config.port

const server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
const wss = new WebSocketServer({ server })

const startServer = async () => {
	try {
		await redisClient.connect()
		let sensors = await initSensors()
		setInterval(() => {
			tickSensors(sensors, config.safeAreaSize)
			wss.clients.forEach(client => {
				client.send(JSON.stringify(sensors))
			})
		}, config.tickInterval)
	} catch (err) {
		console.error('Error starting server:', err)
	}
}

startServer()

const gracefulShutdown = () => {
	console.log('Shutting down gracefully...')
	redisClient.quit()
	redisClient.on('end', () => {
		console.log('Redis client closed.')
		process.exit(0)
	})
}

process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)
