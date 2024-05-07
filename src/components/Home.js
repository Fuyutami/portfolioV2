import React, { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"

import useWindowSize from "../hooks/useWindowSize"
import Theme from "../other/Theme"
import { TextFirstName, TextLastName } from "../other/Vectors"
import TypedText from "./subComponents/TypedText"

const Container = styled.div`
  position: absolute;
  z-index: -100;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  margin-top: 20px;
  transform: rotate(3.5deg);
`
const FirstName = styled(TextFirstName)`
  position: absolute;
  opacity: ${(props) => (props.number === 0 ? 1 : 0.1)};
  transition: all 1s;
  transition-delay: ${(props) => props.number * 0.01 + props.initialdelay}s;

  ${({ state }) => {
    switch (state) {
      case "entering":
        return "transform: translateX(-500%);"
      case "entered":
        return "transform: translateX(0%);"
      case "exiting":
        return "transform: translateX(-500%);"
      case "exited":
        return "transform: translateX(-500%);"
    }
  }};
`
const FirstNameWrap = styled.div`
  position: relative;
  width: ${(props) => props.unit * 6.95}px;
  height: ${(props) => props.unit}px;
  margin-bottom: ${(props) => Math.round(props.unit / 4)}px;
  margin-left: 2rem;
`

const LastName = styled(TextLastName)`
  position: absolute;
  opacity: ${(props) => (props.number === 0 ? 1 : 0.1)};
  max-width: 1000px;
  transition: all 1s;
  transition-delay: ${(props) => props.number * 0.01 + props.initialdelay}s;

  ${({ state }) => {
    switch (state) {
      case "entering":
        return "transform: translateX(500%);"
      case "entered":
        return "transform: translateX(0%);"
      case "exiting":
        return "transform: translateX(500%);"
      case "exited":
        return "transform: translateX(500%);"
    }
  }};
`

const LastNameWrap = styled.div`
  position: relative;
  width: ${(props) => props.unit * 6.95}px;
  height: ${(props) => props.unit}px;
`

const Home = (props) => {
  const [width, height] = useWindowSize()
  const unit = (width * 0.5) / (width > 900 ? 6.95 : 5.5)
  const blurSamples = 15
  const initialDelay = props.firstLoad ? 0 : 0

  return (
    <Container>
      <Wrapper>
        <FirstNameWrap unit={unit}>
          {[...Array(blurSamples)].map((_, i) => {
            return (
              <FirstName
                key={i}
                number={i}
                fill={Theme.text}
                state={props.state}
                initialdelay={initialDelay}
              />
            )
          })}
        </FirstNameWrap>
        <LastNameWrap unit={unit}>
          {[...Array(blurSamples)].map((_, i) => {
            return (
              <LastName
                key={i}
                number={i}
                fill={Theme.text2}
                state={props.state}
                initialdelay={initialDelay}
              />
            )
          })}
        </LastNameWrap>

        <TypedText
          state={props.state}
          initialDelay={initialDelay}
          unit={unit}
          content={["programming / design", "clean code", "original ideas"]}
        />
      </Wrapper>
    </Container>
  )
}

export default Home
