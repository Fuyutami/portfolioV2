import React, { useEffect } from "react"
import styled from "styled-components"
import useWindowSize from "../../hooks/useWindowSize"
import Theme from "../../other/Theme"

const Container = styled.div`
  height: 10px;
`

const Line = styled.svg``

const Path = styled.path``

const VDGraphics = () => {
  const [width, height] = useWindowSize()
  const points = []
  const diagonal1 = Math.sqrt(Math.pow(25, 2) / 2)
  const diagonal2 = Math.sqrt(Math.pow(55, 2) / 2)

  ;(() => {
    points.push([0, 0])
    points.push([width * 0.8, 0])
  })()

  return (
    <Container>
      <Line width="100%" height="100%" preserveAspectRatio="none">
        <Path
          stroke={Theme.videoFrameColor1}
          strokeWidth="4"
          fill="none"
          d={drawPath(points)}
          shape-rendering="crispEdges"
        />
      </Line>
    </Container>
  )
}

const drawPath = (pnts) => {
  let d = `M ${pnts[0][0]} ${pnts[0][1]}`
  for (let i = 1; i < pnts.length; i++) {
    d += ` L ${pnts[i][0]} ${pnts[i][1]}`
  }
  return d
}

export default VDGraphics
