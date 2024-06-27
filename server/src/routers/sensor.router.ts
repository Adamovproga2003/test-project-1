import { Router } from 'express'
import { validationAdjustThrusters } from '../middlewares/validationAdjustThrusters'
import SensorService from './../controllers/sensor.controller'

const sensorRouter = Router()
sensorRouter.post(
	'/:name/thruster',
	validationAdjustThrusters,
	SensorService.setThrusters
)

export { sensorRouter }
