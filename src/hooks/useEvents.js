import { useEffect } from 'react'

export const useEvents = (element, events, callbacks) => {
	console.log(element)
	console.log(events)
	console.log(callbacks)
	useEffect(() => {
		if (!element) return
		events.forEach((e, idx) => {
			element.addEventListener(e, callbacks[idx])
		})
		return events.forEach((e, idx) => {
			element.removeEventListener(e, callbacks[idx])
		})
	}, [])
}
