export const randomID = () => {
	return Math.floor(Math.random() * 1000000)
}

export const degrees_to_radians = (deg) => {
	return deg * (Math.PI / 180)
}

export const euclideanDistance = (a, b) => {
	return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
}
