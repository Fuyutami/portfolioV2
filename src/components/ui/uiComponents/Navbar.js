import React, { useReducer, useState } from "react"
import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Transition, TransitionGroup } from "react-transition-group"
import styled, { keyframes } from "styled-components"

import Theme from "../../../other/Theme"
import { randomID } from "../../../other/utils"
import {
  IconHome,
  IconSkills,
  IconProjects,
  IconContact,
  TextHome,
  TextSkills,
  TextProjects,
  TextContact,
  GraphicsArrow2,
} from "../../../other/Vectors"

const pages = [
  { id: 0, url: "/", icon: IconHome, title: TextHome },
  { id: 1, url: "/skills", icon: IconSkills, title: TextSkills },
  { id: 2, url: "/contact", icon: IconContact, title: TextContact },
]

// Animations
const arrowsAnimation = keyframes`
	17% {
		clip-path: polygon(0 0, 0 0, 0 0, 0 0);
	}
	34% {
		clip-path: polygon(66% 0, 100% 0, 100% 100%, 66% 100%);
	}
	51% {
		clip-path: polygon(33% 0, 100% 0, 100% 100%, 33% 100%);
	}
	68% {
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
	}
	85% {
		clip-path: polygon(0 0, 66% 0, 66% 100%, 0 100%);
	}
	100% {
		clip-path: polygon(0 0, 33% 0, 33% 100%, 0 100%);
	}
`
const iconAppear = keyframes`
	to {
		width: 32px;
		height: 32px;
	}
`
const blink = keyframes`
	0%{
		opacity: 0;
	}
	20% {
		opacity: 1;
	}
	40% {
		opacity: 0;
	}
	60% {
		opacity: 1;
	}
	80% {
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
`

// Styles
const Nav = styled.nav`
  position: absolute;
  z-index: 1000;
  right: 7px;
  bottom: 95px;
  width: 40px;
  height: 150px;

  @media (max-height: 400px) {
    height: 130px;
    transform: scale(0.8);
    bottom: 55px;
  }
`
const List = styled.ul`
  list-style: none;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0px;
  height: 0px;
  animation: ${iconAppear} 0.5s ${(props) => props.number * 0.2}s
    cubic-bezier(0.17, 0.67, 0.37, 1.81) forwards;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s;
  }

  &:active {
    transform: scale(0.9);
    transition: transform 0.2s;
  }
`
const Indicator = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 1000;
  bottom: 30px;
  right: 160px;
  height: 10px;
  width: 100px;
  transform: translateX(100%);
  animation: ${blink} 0.2s step-start forwards;
`
const ArrowsContainer = styled.div`
  display: flex;
  height: 10px;
  width: 26px;
  margin-right: 1rem;
  animation: ${arrowsAnimation} 1s step-start infinite;
`

const initialiseState = () => {
  const path = window.location.pathname
  const state = {
    current: undefined,
    hover: null,
  }
  switch (path) {
    case "/":
      state.current = pages[0]
      break
    case "/skills":
      state.current = pages[1]
      break
    case "/contact":
      state.current = pages[2]
      break
  }
  return state
}

let initialState = initialiseState()

const reducer = (state, { event, el }) => {
  if (event === "click")
    return {
      ...state,
      current: pages[el],
    }
  if (event === "hover")
    return {
      ...state,
      hover: el,
    }
  if (event === "set") {
    return {
      ...initialState,
    }
  }
}

//Component
const Navbar = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const location = useLocation()

  useEffect(() => {
    initialState = initialiseState()
    dispatch({ event: "set", el: null })
  }, [location])

  return (
    <>
      <Nav>
        <List>
          <TransitionGroup component={null}>
            {pages.map((page) => {
              return (
                <Transition timeout={0} appear>
                  <ListItem>
                    <NavLink
                      key={page.id}
                      to={page.url}
                      // onClick={() => {
                      //   dispatch({ event: "click", el: page.id })
                      // }}
                      // onMouseEnter={() => {
                      //   dispatch({ event: "hover", el: page.id })
                      // }}
                      // onMouseLeave={() => {
                      //   dispatch({ event: "hover", el: null })
                      // }}
                      number={page.id}
                    >
                      {<page.icon fill={Theme.text} />}
                    </NavLink>
                  </ListItem>
                </Transition>
              )
            })}
          </TransitionGroup>
        </List>
      </Nav>

      <Indicator>
        <ArrowsContainer>
          {[...Array(3)].map((_, idx) => {
            return <GraphicsArrow2 fill={Theme.text} number={idx} />
          })}
        </ArrowsContainer>

        <state.current.title key={randomID()} fill={Theme.text} />
      </Indicator>
    </>
  )
}

export default Navbar
