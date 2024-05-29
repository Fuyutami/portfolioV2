export const randomID = () => {
  return Math.floor(Math.random() * 1000000)
}

export const degrees_to_radians = (deg) => {
  return deg * (Math.PI / 180)
}

export const euclideanDistance = (a, b) => {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
}

export const drawPath = (pnts) => {
  let d = `M ${pnts[0][0]} ${pnts[0][1]}`
  for (let i = 1; i < pnts.length; i++) {
    d += ` L ${pnts[i][0]} ${pnts[i][1]}`
  }
  return d
}
