import { NextFunction, Request, Response } from 'express'
import config from '../config'

export const validationAdjustThrusters = function (
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { x, y, z } = req.body
	const { thrusterSpeedMin, thrusterSpeedMax } = config
	if (x !== undefined && (x > thrusterSpeedMax || x < thrusterSpeedMin)) {
		return res
			.status(400)
			.send(
				`Thruster x speed must be between ${thrusterSpeedMin} and ${thrusterSpeedMax}`
			)
	}
	if (y !== undefined && (y > thrusterSpeedMax || y < thrusterSpeedMin)) {
		return res
			.status(400)
			.send(
				`Thruster y speed must be between ${thrusterSpeedMin} and ${thrusterSpeedMax}`
			)
	}
	if (z !== undefined && (z > thrusterSpeedMax || z < thrusterSpeedMin)) {
		return res
			.status(400)
			.send(
				`Thruster z speed must be between ${thrusterSpeedMin} and ${thrusterSpeedMax}`
			)
	}
	next()
}
