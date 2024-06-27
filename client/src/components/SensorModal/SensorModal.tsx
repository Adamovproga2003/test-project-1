import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { AxiosError } from 'axios'
import React, { useState } from 'react'
import { axiosInstance } from '../../axios'
import { Sensor } from '../../types'

interface SensorModalProps {
	sensor: Sensor
	onClose: () => void
	modalStyle: any
}

const SensorModal: React.FC<SensorModalProps> = ({
	sensor,
	onClose,
	modalStyle,
}) => {
	const [errorState, setErrorState] = useState({
		x: '',
		y: '',
		z: '',
	})

	const handleThrusterChange = (axis: 'x' | 'y' | 'z', value: number) => {
		console.log('value', value)
		!isNaN(value) &&
			axiosInstance
				.post(`/sensor/${sensor.name}/thruster`, {
					[axis]: value,
				})
				.then(() => {
					setErrorState({
						...errorState,
						[axis]: '',
					})
				})
				.catch(e => {
					if (e instanceof AxiosError) {
						const message = e.response?.data
						setErrorState({
							...errorState,
							[axis]: message,
						})
					} else console.error(e)
				})
	}

	return (
		<Modal open={true} onClose={onClose} sx={{ zIndex: 99999999 }}>
			<Box sx={modalStyle} component='div'>
				<Typography variant='h6'>{sensor.name}</Typography>
				<Typography variant='body2'>
					Temperature: {sensor.temperature.toFixed(2)}
				</Typography>
				<Typography variant='body2'>
					Water Speed:{' '}
					{`x: ${sensor.waterSpeed.x.toFixed(
						2
					)}, y: ${sensor.waterSpeed.y.toFixed(
						2
					)}, z: ${sensor.waterSpeed.z.toFixed(2)}`}
				</Typography>
				<Typography variant='body2'>
					Thrusters Speed:{' '}
					{`x: ${sensor.thrustersSpeed.x.toFixed(
						2
					)}, y: ${sensor.thrustersSpeed.y.toFixed(
						2
					)}, z: ${sensor.thrustersSpeed.z.toFixed(2)}`}
				</Typography>
				<Box
					component='div'
					sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
				>
					<Typography variant='body2'>Adjust Thrusters:</Typography>
					<TextField
						label='X-axis'
						type='number'
						onChange={e =>
							handleThrusterChange('x', parseFloat(e.target.value))
						}
						sx={{ width: '100%' }}
						error={!!errorState.x}
						helperText={errorState.x}
					/>
					<TextField
						label='Y-axis'
						type='number'
						onChange={e =>
							handleThrusterChange('y', parseFloat(e.target.value))
						}
						sx={{ width: '100%' }}
						error={!!errorState.y}
						helperText={errorState.y}
					/>
					<TextField
						label='Z-axis'
						type='number'
						onChange={e =>
							handleThrusterChange('z', parseFloat(e.target.value))
						}
						sx={{ width: '100%' }}
						error={!!errorState.z}
						helperText={errorState.z}
					/>
				</Box>
				<Box component='div' sx={{ display: 'flex', justifyContent: 'center' }}>
					<Button onClick={onClose}>Close</Button>
				</Box>
			</Box>
		</Modal>
	)
}

export default SensorModal
