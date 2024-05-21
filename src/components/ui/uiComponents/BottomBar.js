import React, { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import useMousePosition from "../../../hooks/useMousePosition"
import useWindowSize from "../../../hooks/useWindowSize"
import Theme from "../../../other/Theme"

import { GraphicsLR } from "../../../other/Vectors"

const appear = keyframes`
	to {
		transform: scale(1);
	}
`

const Container = styled.div`
  position: absolute;
  bottom: 17px;
  left: 50%;
  transform: translateX(-50%);
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 60px;
  height: 20px;
  transform: scale(0);
  animation: ${appear} 0.5s cubic-bezier(0.17, 0.67, 0.37, 1.81) forwards;
  animation-delay: ${(props) => (props.firstLoad ? "2s" : 0)};
`

const LeftContainer = styled.div`
  display: flex;
  position: absolute;
  transform: translateX(-100%);
  left: 0;
`
const RightContainer = styled.div`
  display: flex;
  position: absolute;
  transform: translateX(100%);
  right: 0;
`

const Square = styled.div`
  width: 4px;
  height: 4px;
  background-color: ${Theme.text};
  margin: 0 3px;
`

const BottomBar = (props) => {
  const [mounted, setMounted] = useState(false)
  const [width, height] = useWindowSize()
  const { x, y } = useMousePosition()
  const rects = calcRects(width, x, 7, mounted)

  useEffect(() => {
    console.log(height)
  }, [height])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {width >= 600 && height >= 400 && (
        <Container>
          <Wrapper firstLoad={props.firstLoad}>
            <LeftContainer>
              {[...Array(rects[0] ? rects[0] : 0)].map((_, id) => (
                <Square key={id} />
              ))}
            </LeftContainer>
            <GraphicsLR width="60" height="20" fill={Theme.text} />
            <RightContainer>
              {[...Array(rects[1] ? rects[1] : 0)].map((_, id) => (
                <Square key={id} />
              ))}
            </RightContainer>
          </Wrapper>
        </Container>
      )}
    </>
  )
}

const calcRects = (width, x, squaresCount, mounted) => {
  if (!mounted) return []
  let countL = 0
  let countR = 0

  if (x < width / 2) {
    countL = squaresCount - Math.round((x / (width / 2)) * squaresCount)
  } else {
    countR = Math.round(((x - width / 2) / (width / 2)) * squaresCount)
  }
  return [countL, countR]
}

export default BottomBar
