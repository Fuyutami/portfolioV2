import React from "react"
import styled from "styled-components"

import { fadeIn } from "../../other/animations"

const Container = styled.div`
  background-color: #fff;
  position: absolute;
  z-index: 10000;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  animation: ${fadeIn} 1s forwards;
`

const Popup = (props) => {
  const handleClick = (e) => {
    e.stopPropagation()
    props.setPopup({ active: false, to: "" })
  }
  return (
    <>
      {props.popup.to && (
        <Container onClick={handleClick}>{props.popup.to}</Container>
      )}
    </>
  )
}

export default Popup
