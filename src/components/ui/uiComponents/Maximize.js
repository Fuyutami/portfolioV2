import React from "react"
import styled from "styled-components"

const Container = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  transform: rotate(45deg) translateY(-10px);
  z-index: 1000;
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`

const Maximize = () => {
  const handleClick = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }
  }
  return <Container onClick={handleClick}></Container>
}

export default Maximize
