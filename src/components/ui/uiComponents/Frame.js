import React, { useEffect } from "react"
import styled, { keyframes } from "styled-components"

import useWindowSize from "../../../hooks/useWindowSize"

import Theme from "../../../other/Theme"
import { GraphicsArrow1, GraphicsSquares } from "../../../other/Vectors"
import BottomBar from "./BottomBar"
import LeftBar from "./LeftBar"
import RightBar from "./RightBar"
import Logo from "./Logo"

const arrowAppear = keyframes`
to{
	transform: scale(1);
}
`
const squaresAppear = keyframes`
	to {
		clip-path: inset(0 0 0 0);
	}
`

const fillLine = keyframes`
	to {
    stroke-dashoffset: 0;
  }
`

const Container = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`
const Line = styled.svg`
  position: absolute;
  pointer-events: none;
`

const Path = styled.path`
  stroke-dasharray: 10000;
  stroke-dashoffset: 10000;
  animation: ${fillLine} 7s linear forwards;
`
const Arrow = styled(GraphicsArrow1)`
  transform: scale(0);
  animation: ${arrowAppear} 0.5s 0.5s cubic-bezier(0.17, 0.67, 0.37, 1.81)
    forwards;
`

const Squares = styled(GraphicsSquares)`
  clip-path: inset(0 0 100% 0);
  animation: ${squaresAppear} 0.5s 1.5s ease-out forwards;
`

const Frame = (props) => {
  const [width, height] = useWindowSize()
  const points = []
  const diagonal1 = Math.sqrt(Math.pow(25, 2) / 2)
  const diagonal2 = Math.sqrt(Math.pow(55, 2) / 2)

  const [navbarSpace, setNavbarSpace] = React.useState(0)

  useEffect(() => {
    console.log(height)
    if (height < 400) {
      setNavbarSpace(90)
    } else {
      setNavbarSpace(188)
    }
  }, [height])
  ;(() => {
    points.push([width - 160, height - 17])
    points.push([width - 34, height - 17])
    points.push([points[1][0] + diagonal1, points[1][1] - diagonal1])
    points.push([points[2][0] - diagonal2, points[2][1] - diagonal2])
    points.push([points[3][0], points[3][1] - navbarSpace])
    points.push([points[4][0] + diagonal2, points[4][1] - diagonal2])
    points.push([points[5][0], 17 + diagonal2])
    points.push([points[6][0] - diagonal2, points[6][1] - diagonal2])
    points.push([17 + diagonal1, points[7][1]])
    points.push([points[8][0] - diagonal1, points[8][1] + diagonal1])
  })()
  const stretchSpace = points[5][1] - points[6][1]

  return (
    <>
      <Container>
        <Arrow
          width={diagonal2 - 10}
          height={diagonal2 - 10}
          fill={Theme.text}
          style={{
            position: "absolute",
            top: 17 + 5 - 4,
            left: width - 17 - diagonal2 + 5 + 4,
          }}
        />
        <Squares
          width={60}
          height={60}
          fill={Theme.text}
          style={{
            position: "absolute",
            top: 30,
            left: 7,
          }}
        />
        <Line width="100%" height="100%" preserveAspectRatio="none">
          <Path
            stroke={Theme.text}
            strokeWidth="2"
            fill="none"
            d={drawPath(points)}
            shape-rendering="crispEdges"
          />
        </Line>
        <LeftBar />
        <RightBar stretchSpace={stretchSpace} />
        <BottomBar firstLoad={props.firstLoad} />
      </Container>
    </>
  )
}

const drawPath = (pnts) => {
  let d = `M ${pnts[0][0]} ${pnts[0][1]}`
  for (let i = 1; i < pnts.length; i++) {
    d += ` L ${pnts[i][0]} ${pnts[i][1]}`
  }
  return d
}

export default Frame
