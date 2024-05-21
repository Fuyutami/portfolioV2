import React, { useEffect } from "react"

import Frame from "./uiComponents/Frame"
import SocialLinks from "./uiComponents/SocialLinks"
import Navbar from "./uiComponents/Navbar"
import Logo from "./uiComponents/Logo"
import Maximize from "./uiComponents/Maximize"

const UI = (props) => {
  useEffect(() => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`)
    const handleResize = () => {
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      props.setFirstLoad(false)
    }, 4000)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      <Navbar backToHome={props.backToHome} />
      <SocialLinks />
      <Maximize />
      <Frame firstLoad={props.firstLoad} />
      <Logo />
    </>
  )
}

export default UI
