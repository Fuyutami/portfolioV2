import React from "react"
import styled, { keyframes } from "styled-components"
import { blinkEnter1, blinkEnter2, blinkExit } from "../../other/animations"
import Theme from "../../other/Theme"

import { GraphicsElbowLeft, GraphicsElbowRight } from "../../other/Vectors"

const Container = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.side === "left" ? "flex-end" : "flex-start"};
  position: relative;
  align-self: flex-end;
  width: 35vw;
  height: 12vw;
  animation: ${({ sectionState }) => {
      switch (sectionState) {
        case "entering":
          return null
        case "entered":
          return null
        case "exiting":
          return blinkExit
        case "exited":
          return null
      }
    }}
    0.3s step-end forwards;
`
const GraphicsWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 68%;
  bottom: 0;

  svg {
    width: 100%;
    height: 100%;
    path {
      stroke-dasharray: 10000;
      stroke-dashoffset: 1000;
      stroke-dashoffset: -1000;
      transition: all 0.5s ease-in-out;

      ${({ state }) => {
        switch (state) {
          case "entering":
            return
          case "entered":
            return "stroke-dashoffset: 0; transition: all .5s ease-in-out;"
          case "exiting":
            return "stroke-dashoffset: -1000; transition: all .5s ease-in-out;"
          case "exited":
            return "stroke-dashoffset: -1000;  transition: all .5s ease-in-out;"
        }
      }};
    }
  }
`

const Point = styled.div`
  position: absolute;
  bottom: 0;
  left: ${(props) => (props.side === "left" ? 0 : 100)}%;
  transform: translate(-50%, 0%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${Theme.text};
  transition: opacity 0.1s steps(4, end);
  ${({ state }) => {
    switch (state) {
      case "entering":
        return "opacity:0;"
      case "entered":
        return "opacity:1;"
      case "exiting":
        return "opacity:1;"
      case "exited":
        return "opacity:0;"
    }
  }};
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  z-index: 2000;
  height: 100%;
  width: 80%;
`

const TitleWrapper = styled.div`
  opacity: 0;
  height: 32%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  animation: ${({ state }) => {
      switch (state) {
        case "entering":
          return null
        case "entered":
          return blinkEnter1
        case "exiting":
          return blinkExit
        case "exited":
          return null
      }
    }}
    0.5s 0.5s step-end forwards;
  transform: scale(0.7) translateX(-20%) skew(-12deg, 0deg);
`
const Title = styled.img``

const Description = styled.p`
  opacity: 0;
  color: ${Theme.text};
  font-family: "Gruppo", sans-serif;
  font-size: 1.8rem;
  height: 68%;
  padding: 2rem 1rem;
  text-align: justify;
  word-spacing: -2px;
  animation: ${({ state }) => {
      switch (state) {
        case "entering":
          return null
        case "entered":
          return blinkEnter2
        case "exiting":
          return blinkExit
        case "exited":
          return null
      }
    }}
    0.5s 0.5s step-end forwards;
`

const Btn = styled.button`
  display: block;
  font-weight: 700;
  margin-top: 1rem;
  background-color: ${Theme.inactiveSkill};
  color: ${Theme.text};
  font-family: "Gruppo", sans-serif;
  font-size: 1.8rem;
  margin-top: 2rem;
  padding: 1rem;
  border: none;
  cursor: pointer;
`

const Annotation = (props) => {
  return (
    <Container
      side={props.side}
      state={props.state}
      sectionState={props.sectionState}
    >
      <Content>
        <TitleWrapper state={props.state}>
          <Title src={props.title} />
        </TitleWrapper>
        <Description state={props.state}>
          {props.description}

          <Btn>view latest</Btn>
        </Description>
      </Content>
      <GraphicsWrapper state={props.state}>
        {props.side === "right" ? (
          <GraphicsElbowLeft fill={Theme.text} />
        ) : (
          <GraphicsElbowRight fill={Theme.text} />
        )}
      </GraphicsWrapper>
      <Point side={props.side} state={props.state} />
    </Container>
  )
}

export default Annotation
