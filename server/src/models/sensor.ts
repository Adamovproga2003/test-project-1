export interface Sensor {
	name: string
	position: { x: number; y: number; z: number }
	waterSpeed: { x: number; y: number; z: number }
	thrustersSpeed: { x: number; y: number; z: number }
	temperature: number
	isLost: boolean
	timeInSafeArea: number
}
