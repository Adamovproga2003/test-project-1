import CellTowerIcon from '@mui/icons-material/CellTower'
import LanguageIcon from '@mui/icons-material/Language'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import useWebSocket from '../../hooks/useWebSocket'
import { Sensor } from '../../types'
import SensorCard from '../SensorCard/SensorCard'
import SensorModal from '../SensorModal/SensorModal'
import ThreeDScene from '../ThreeDScene/ThreeDScene'
const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	display: 'flex',
	flexDirection: 'column',
	gap: 1,
}

const Dashboard: React.FC = () => {
	const [sensors, setSensors] = useState<Sensor[]>([])
	const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null)
	const [is3dSceneShow, set3dSceneShow] = useState(false)

	useWebSocket('ws://localhost:3000', (data: Sensor[]) => setSensors(data))

	useEffect(() => {
		if (selectedSensor) {
			setSelectedSensor(
				sensors.find(s => s.name === selectedSensor.name) || null
			)
		}
	}, [selectedSensor, sensors])

	const handleOpen = (sensor: Sensor) => setSelectedSensor(sensor)
	const handleClose = () => setSelectedSensor(null)

	return (
		<Box component='div' sx={{ height: '100vh' }}>
			<AnimatePresence mode='wait'>
				{is3dSceneShow ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						style={{
							width: '100%',
							height: '100%',
						}}
					>
						<Box component='div' sx={{ height: '100%' }}>
							<ThreeDScene sensors={sensors} />
						</Box>
					</motion.div>
				) : (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<Container
							sx={{ height: '100vh', alignItems: 'center', display: 'flex' }}
						>
							<Grid container spacing={2}>
								{sensors.map(sensor => (
									<Grid item xs={3} key={sensor.name}>
										<SensorCard
											sensor={sensor}
											onClick={() => handleOpen(sensor)}
										/>
									</Grid>
								))}
							</Grid>
						</Container>
					</motion.div>
				)}
			</AnimatePresence>

			{selectedSensor && (
				<SensorModal
					sensor={selectedSensor}
					onClose={handleClose}
					modalStyle={modalStyle}
				/>
			)}
			<Button
				aria-label='3d scene'
				sx={{
					position: 'absolute',
					top: 0,
					right: 0,
					margin: 3,
					display: 'flex',
					gap: 1,
					alignItems: 'center',
				}}
				onClick={() => set3dSceneShow(prev => !prev)}
			>
				{!is3dSceneShow ? (
					<>
						<LanguageIcon />
						<Typography>Visualize in 3d scene</Typography>
					</>
				) : (
					<>
						<CellTowerIcon />
						<Typography>Back to signals</Typography>
					</>
				)}
			</Button>
		</Box>
	)
}

export default Dashboard
