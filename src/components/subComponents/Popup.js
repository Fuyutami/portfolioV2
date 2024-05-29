import React, { useEffect, useRef } from "react"
import styled, { keyframes } from "styled-components"

import { fadeIn, fadeOut } from "../../other/animations"
import VideoViewer from "./VideoViewer"

const PopupAnimation = keyframes`
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }

  to {
    opacity: 1;
    backdrop-filter: blur(3px);
  }
`

const Container = styled.div`
  background-color: transparent;
  position: absolute;
  z-index: 10000;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  opacity: 0;
  animation: ${PopupAnimation} 0.5s;
  transition: opacity 0.5s;
`

const Popup = (props) => {
  useEffect(() => {
    const popup = document.querySelector(".popup")
    popup.style.opacity = 1
  }, [])

  const closePopup = () => {
    const popup = document.querySelector(".popup")
    console.log(popup)
    popup.style.opacity = 0
    setTimeout(() => {
      props.setPopup({ active: false, to: null })
    }, 500)
  }
  return (
    <>
      {props.popup.to && (
        <Container className="popup">
          {(() => {
            switch (props.popup.to) {
              case "project-3d":
                return (
                  <VideoViewer
                    // dark={false}
                    source="/videos/3d_animation.mp4"
                    setPopup={props.setPopup}
                    closePopup={closePopup}
                    description="This project is a complete recreation of a clip from Pixar Animation Studios' short film 'BURN-E.' All modeling, lighting, and animation were done using Blender, while texturing was completed using Quixel Mixer."
                  />
                )
              default:
                return <p>{props.popup.to}</p>
            }
          })()}
        </Container>
      )}
    </>
  )
}

export default Popup
