import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { sensorRouter } from './routers/sensor.router'

var corsOptions = {
	origin: 'http://localhost:3001',
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors(corsOptions))
app.use('/sensor', sensorRouter)

export default app
