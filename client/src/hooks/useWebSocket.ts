import { useEffect } from 'react'

const useWebSocket = (url: string, onMessage: (data: any) => void) => {
	useEffect(() => {
		const ws = new WebSocket(url)

		ws.onmessage = event => {
			try {
				const data = JSON.parse(event.data)
				onMessage(data)
			} catch (error) {
				console.error('Error parsing WebSocket message:', error)
			}
		}
		return () => {
			if (ws.readyState === 1) {
				ws.close()
			}
		}
	}, [url, onMessage])
}

export default useWebSocket
