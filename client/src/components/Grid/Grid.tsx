import { Plane, Sphere, Text } from '@react-three/drei'

interface ISize {
	size: number
}

const XZPlane = ({ size }: ISize) => (
	<Plane
		args={[size, size, size, size]}
		rotation={[1.5 * Math.PI, 0, 0]}
		position={[0, 0, 0]}
	>
		<meshStandardMaterial attach='material' color='#f9c74f' wireframe />
	</Plane>
)

const XYPlane = ({ size }: ISize) => (
	<Plane
		args={[size, size, size, size]}
		rotation={[0, 0, 0]}
		position={[0, 0, 0]}
	>
		<meshStandardMaterial attach='material' color='pink' wireframe />
	</Plane>
)

const YZPlane = ({ size }: ISize) => (
	<Plane
		args={[size, size, size, size]}
		rotation={[0, Math.PI / 2, 0]}
		position={[0, 0, 0]}
	>
		<meshStandardMaterial attach='material' color='#80ffdb' wireframe />
	</Plane>
)

const GridSphere = () => (
	<Sphere args={[10, 25, 25]}>
		<meshStandardMaterial attach='material' color='#ff00ff' wireframe />
	</Sphere>
)

export default function Grid({ size }: ISize) {
	return (
		<group>
			<Text
				color='white' // default
				anchorX='center' // default
				anchorY='middle' // default
				position={[size / 2 + 1, 0, 0]}
				scale={[1, 1, 1]}
			>
				X+
			</Text>
			<Text
				color='white' // default
				anchorX='center' // default
				anchorY='middle' // default
				position={[-size / 2 - 1, 0, 0]}
				scale={[1, 1, 1]}
			>
				X-
			</Text>
			<Text
				color='white' // default
				anchorX='center' // default
				anchorY='middle' // default
				position={[0, size / 2 + 1, 0]}
				scale={[1, 1, 1]}
			>
				Y+
			</Text>
			<Text
				color='white' // default
				anchorX='center' // default
				anchorY='middle' // default
				position={[0, -size / 2 - 1, 0]}
				scale={[1, 1, 1]}
			>
				Y-
			</Text>
			<Text
				color='white' // default
				anchorX='center' // default
				anchorY='middle' // default
				position={[0, 0, size / 2 + 1]}
				scale={[1, 1, 1]}
			>
				Z+
			</Text>
			<Text
				color='white' // default
				anchorX='center' // default
				anchorY='middle' // default
				position={[0, 0, -size / 2 - 1]}
				scale={[1, 1, 1]}
			>
				Z-
			</Text>
			<XZPlane size={size} />
			<XYPlane size={size} />
			<YZPlane size={size} />
			<GridSphere />
		</group>
	)
}
