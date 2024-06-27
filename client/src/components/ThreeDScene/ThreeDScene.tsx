import { Html, OrbitControls, Sphere } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { Sensor } from '../../types'
import Grid from '../Grid/Grid'

interface SensorProps {
	sensor: Sensor
}

const SensorSphere: React.FC<SensorProps> = ({ sensor }) => {
	const sphereRef = useRef(null)

	const color =
		sensor.timeInSafeArea < 5
			? 'red'
			: sensor.timeInSafeArea >= 5 && sensor.timeInSafeArea < 10
			? 'yellow'
			: 'green'

	useEffect(() => {
		if (sphereRef.current) {
			;(sphereRef.current as any).position.set(
				sensor.position.x,
				sensor.position.y,
				sensor.position.z
			)
		}
	}, [sensor.position])

	return (
		<Sphere ref={sphereRef} args={[0.1, 25, 25]}>
			<meshStandardMaterial color={color} />
			<Html position={[0, 0, 0]}>
				<div style={{ color: 'black' }}>{sensor.name}</div>
			</Html>
		</Sphere>
	)
}

const ThreeDScene: React.FC<{ sensors: Sensor[] }> = ({ sensors }) => {
	return (
		<Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [5, 5, 5] }}>
			<ambientLight intensity={Math.PI / 2} />
			<Grid size={20} />
			<pointLight position={[10, 10, 10]} />
			{sensors.map(sensor => (
				<SensorSphere key={sensor.name} sensor={sensor} />
			))}
			<OrbitControls />
		</Canvas>
	)
}

export default ThreeDScene
