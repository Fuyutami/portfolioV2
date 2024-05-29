import React, { useEffect, useRef, useState } from "react"
import styled, { keyframes, css } from "styled-components"
import {
  IconClose,
  IconForward,
  IconPause,
  IconPlay,
  IconRewind,
  StripesGraphics,
  VideoTimeGraphics,
} from "../../other/Vectors"
import Theme from "../../other/Theme"
import useWindowSize from "../../hooks/useWindowSize"

const indicatorFadeInOut = keyframes`
  from {
    opacity: 0;
  }
  50% {
    opacity: 0.5;}
  to {
    opacity: 0;
  }
`

const CornersAnimation = keyframes`
  from {
    transform: scale(1);
  }


  50% {
    transform: scale(1.01);
  }

  to {
    transform: scale(1);
  }

`

const StripesAnimation = keyframes`
  from{
      background-position: 0 0;
  }
  to{
    background-position: 88px 0;
  }

`

const Container = styled.div`
  background-color: ${(props) =>
    props.dark ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)"};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 5rem;
  backdrop-filter: blur(3px);

  @media (max-width: 700px) {
    padding: 2rem;
  }

  @media (max-height: 400px) and (orientation: landscape) {
    padding: 0;
  }
`

const Wrapper = styled.div`
  background-color: transparent;
  @media (orientation: portrait) {
    width: 100%;
  }

  @media (orientation: landscape) {
    width: 100vh;
  }

  @media (max-height: 400px) and (orientation: landscape) {
    height: 100%;
    width: 100%;
    display: flex;
    background-color: #000;
  }
`

const VideoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  position: relative;

  transition: transform 0.5s;
  transform: scale(0);
  transform: scale(1);
`

const Frame = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  animation: ${CornersAnimation} 1.5s ease-in-out infinite;
`

const Corners = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const TLCorner = styled.div`
  position: absolute;
  width: 25px;
  height: 2px;
  top: 0;
  left: 0;
  background-color: ${(props) =>
    props.dark ? Theme.videoFrameColor1 : Theme.videoFrameColor2};

  &::before {
    content: "";
    position: absolute;
    width: 2px;
    height: 25px;
    top: 0;
    left: 0;
    background-color: ${(props) =>
      props.dark ? Theme.videoFrameColor1 : Theme.videoFrameColor2};
  }
`

const TRCorner = styled.div`
  position: absolute;
  width: 25px;
  height: 2px;
  top: 0;
  right: 0;
  background-color: ${(props) =>
    props.dark ? Theme.videoFrameColor1 : Theme.videoFrameColor2};

  &::before {
    content: "";
    position: absolute;
    width: 2px;
    height: 25px;
    top: 0;
    right: 0;
    background-color: ${(props) =>
      props.dark ? Theme.videoFrameColor1 : Theme.videoFrameColor2};
  }
`

const BLCorner = styled.div`
  position: absolute;
  width: 25px;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: ${(props) =>
    props.dark ? Theme.videoFrameColor1 : Theme.videoFrameColor2};

  &::before {
    content: "";
    position: absolute;
    width: 2px;
    height: 25px;
    bottom: 0;
    left: 0;
    background-color: ${(props) =>
      props.dark ? Theme.videoFrameColor1 : Theme.videoFrameColor2};
  }
`

const BRCorner = styled.div`
  position: absolute;
  width: 25px;
  height: 2px;
  bottom: 0;
  right: 0;
  background-color: ${(props) =>
    props.dark ? Theme.videoFrameColor1 : Theme.videoFrameColor2};

  &::before {
    content: "";
    position: absolute;
    width: 2px;
    height: 25px;
    bottom: 0;
    right: 0;
    background-color: ${(props) =>
      props.dark ? Theme.videoFrameColor1 : Theme.videoFrameColor2};
  }
`

const TimeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`

const Time = styled.p`
  color: ${(props) =>
    props.dark ? Theme.videoFrameColor1 : Theme.videoFrameColor2};
  font-family: "Gruppo", sans-serif;
  font-size: 2.5rem;
  @media (max-height: 400px) {
    font-size: 2rem;
  }
`

const Stripes = styled.div`
  width: 88px;
  height: 15px;
  background: url("images/stripes-graphics.svg");
  background-size: cover;
  background-repeat: repeat-x;
  transform: translateY(-50%);

  ${(props) =>
    props.videoState === "playing" &&
    css`
      animation: ${StripesAnimation} 5s infinite linear;
      -webkit-animation: ${StripesAnimation} 5s infinite linear;
    `}
`

const TimeGraphicsContainer = styled.div`
  width: 50px;
  position: relative;
  width: 80%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`
const TimeGraphicsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: absolute;
  /* width: 80%; */
`

const TimeGraphics = styled(VideoTimeGraphics)`
  /* position: absolute; */
`

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`

const DescriptionGraphics = styled.div`
  width: 80%;
  height: 2px;
  background-color: ${(props) =>
    props.dark ? Theme.videoFrameColor1 : Theme.videoFrameColor2};
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 2px;
    height: 30px;
    top: 0;
    left: 0;
    background-color: ${(props) =>
      props.dark ? Theme.videoFrameColor1 : Theme.videoFrameColor2};
    transform: rotate(45deg) translate(-10px, 5px);
  }

  &::after {
    content: "";
    position: absolute;
    width: 2px;
    height: 30px;
    top: 0;
    right: 0;
    background-color: ${(props) =>
      props.dark ? Theme.videoFrameColor1 : Theme.videoFrameColor2};
    transform: rotate(-45deg) translate(10px, 5px);
  }
`

const DescriptionText = styled.p`
  width: 80%;
  color: ${(props) =>
    props.dark ? Theme.videoDescriptionColor1 : Theme.videoDescriptionColor2};
  font-family: "Roboto", sans-serif;
  font-size: 1.4rem;
  padding: 1.5rem;

  @media (max-height: 400px) {
    font-size: 1rem;
  }
  @media (max-width: 700px) {
    font-size: 1rem;
  }
`

const Video = styled.video`
  width: 100%;
  border-radius: 5px;
  z-index: 2000;
  box-shadow: ${(props) =>
    props.dark ? "0 0 5px rgba(0, 0, 0, 0.5)" : "none"};
`

const StateIndicator = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 10%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  animation: ${indicatorFadeInOut} 0.7s forwards;
  z-index: 3000;
`

const VideoViewer = ({
  source,
  closePopup,
  frameRate = 24,
  description,
  dark = true,
}) => {
  const [time, setTime] = useState("00:00")
  const [width, height] = useWindowSize()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startTime, setStartTime] = useState(0)
  const [videoState, setVideoState] = useState("playing")
  const [showIndicator, setShowIndicator] = useState(false)

  useEffect(() => {
    if (width && height && height < 400 && width > height) {
      setIsFullscreen(true)
    } else {
      setIsFullscreen(false)
    }
  }, [width, height])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", () => {
        if (!videoRef.current.currentTime) return
        setTime(formatTime(videoRef.current.currentTime))
      })
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("timeupdate", () => {
          if (!videoRef.current.currentTime) return
          setTime(formatTime(videoRef.current.currentTime))
        })
      }
    }
  }, [])

  useEffect(() => {
    if (!showIndicator) {
      setShowIndicator(true)
    }
  }, [videoState])

  useEffect(() => {
    if (showIndicator) {
      setTimeout(() => {
        setShowIndicator(false)
      }, 700)
    }
  }, [videoState, showIndicator])

  const handleClose = (e) => {
    closePopup()
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.clientX)
    setStartTime(videoRef.current.currentTime)
  }

  const handleMouseUp = (e) => {
    if (videoRef.current) {
      setIsDragging(false)

      if (e.clientX === startX) {
        if (videoRef.current.paused) {
          videoRef.current.play()
          setVideoState("playing")
        } else {
          videoRef.current.pause()
          setVideoState("paused")
        }
      } else {
        videoRef.current.pause()
        setVideoState("paused")
      }
    }
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging && videoRef.current) {
      const dx = e.clientX - startX
      const frameWidth = 10
      const timePerFrame = 1 / frameRate
      const timeChange = (dx / frameWidth) * timePerFrame
      const newTime = startTime + timeChange

      if (timeChange > 0) {
        if (videoState !== "forward") {
          setVideoState("forward")
        }
      } else {
        if (videoState !== "rewind") {
          setVideoState("rewind")
        }
      }

      if (newTime >= 0 && newTime <= videoRef.current.duration) {
        videoRef.current.currentTime = newTime
      }
    }
  }

  return (
    <Container dark={dark} onClick={handleClose}>
      <Wrapper>
        {!isFullscreen && (
          <TimeWrapper>
            <Time dark={dark}>{time}</Time>
            <TimeGraphicsContainer>
              <TimeGraphicsWrapper>
                <TimeGraphics
                  strokeColor={
                    dark ? Theme.videoFrameColor1 : Theme.videoFrameColor2
                  }
                />
              </TimeGraphicsWrapper>
            </TimeGraphicsContainer>

            <Stripes videoState={videoState} />
          </TimeWrapper>
        )}
        <VideoWrapper>
          <Video
            ref={videoRef}
            src={source}
            autoPlay
            loop
            preload="none"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => e.stopPropagation()}
          />
          {!isFullscreen && (
            <Frame>
              <Corners>
                <TLCorner dark={dark} />
                <TRCorner dark={dark} />
                <BLCorner dark={dark} />
                <BRCorner dark={dark} />
              </Corners>
            </Frame>
          )}

          {showIndicator && (
            <StateIndicator>
              {videoState === "playing" && <IconPlay size="100" fill="#fff" />}
              {videoState === "paused" && <IconPause size="100" fill="#fff" />}
              {videoState === "forward" && (
                <IconForward size="100" fill="#fff" />
              )}
              {videoState === "rewind" && <IconRewind size="100" fill="#fff" />}
            </StateIndicator>
          )}
        </VideoWrapper>

        {!isFullscreen && (
          <DescriptionWrapper>
            <DescriptionGraphics dark={dark} />
            <DescriptionText dark={dark}>{description}</DescriptionText>
          </DescriptionWrapper>
        )}
      </Wrapper>
    </Container>
  )
}

const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`
}

export default VideoViewer
