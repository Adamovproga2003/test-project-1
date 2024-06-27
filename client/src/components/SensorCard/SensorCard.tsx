import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import { Sensor } from '../../types'

interface SensorCardProps {
	sensor: Sensor
	onClick: () => void
}

const SensorCard: React.FC<SensorCardProps> = ({ sensor, onClick }) => {
	const cardColor =
		sensor.timeInSafeArea < 5
			? 'red'
			: sensor.timeInSafeArea >= 5 && sensor.timeInSafeArea < 10
			? 'yellow'
			: 'green'
	const borderColor =
		sensor.timeInSafeArea < 5
			? 'red'
			: sensor.timeInSafeArea >= 5 && sensor.timeInSafeArea < 10
			? 'yellow'
			: 'green'

	return (
		<Card
			onClick={onClick}
			style={{
				backgroundColor: cardColor,
				borderColor: borderColor,
				borderWidth: 2,
				borderStyle: 'solid',
				cursor: 'pointer',
			}}
		>
			<CardContent>
				<Typography variant='h5'>{sensor.name}</Typography>
				<Typography variant='body2'>
					Temperature: {sensor.temperature.toFixed(2)}
				</Typography>
				<Typography variant='body2'>
					Status: {sensor.isLost ? 'Lost' : 'Operational'}
				</Typography>
				<Typography variant='body2'>
					Time in safe area: {sensor.timeInSafeArea}s
				</Typography>
			</CardContent>
		</Card>
	)
}

export default SensorCard
