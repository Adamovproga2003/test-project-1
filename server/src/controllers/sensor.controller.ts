import { Request, Response } from 'express'
import { adjustThrusters } from '../services/sensorService'

class SensorService {
	public async setThrusters(req: Request, res: Response) {
		const { name } = req.params
		const { x, y, z } = req.body
		await adjustThrusters(name, { x, y, z })
		res.status(200).send('Thrusters updated')
	}
}

export default new SensorService()
