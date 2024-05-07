import React, { useEffect, useState, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import Carousel from './subComponents/Carousel'

import skills from '../other/skills'
import Theme from '../other/Theme'
import {
	skillsFlyIn,
	skillsFlyOut,
	skillsJumpRight,
	skillsJumpLeft,
} from '../other/animations'
import useWindowSize from '../hooks/useWindowSize'
import Annotation from './subComponents/Annotation'
import { randomID } from '../other/utils'
import { Transition } from 'react-transition-group'

const Container = styled.div`
	position: absolute;
	z-index: 10;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 80%;
`

const CarouselsContainer = styled.div`
	display: flex;
	transform: rotate(7deg);
	width: 50%;
`
const CarouselContainer2 = styled.div`
	width: 100%;
	display: flex;
	transform: translateX(-500%);
	animation: ${({ state }) => {
			switch (state) {
				case 'entering':
					return null
				case 'entered':
					return skillsFlyIn
				case 'exiting':
					return skillsFlyOut
				case 'exited':
					return null
			}
		}}
		1.5s linear forwards;
`

const CarouselContainer3 = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	animation: ${(props) =>
			props.side === 'right'
				? skillsJumpRight
				: props.side === 'left'
				? skillsJumpLeft
				: null}
		1s linear forwards;

	cursor: pointer;
`

const CarouselWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`
const AnnotationContainer = styled.div`
	display: flex;
	justify-content: ${(props) =>
		props.side === 'left' ? 'flex-start' : 'flex-end'};
	width: 50%;
	transform: translateX(${(props) => (props.side === 'right' ? -100 : 0)}%);
	transition: transform 1s step-start;
`

const Skills = (props) => {
	const [width, height] = useWindowSize()
	const [size, setSize] = useState(180)
	const [side, setSide] = useState('left')
	const [skill, setSkill] = useState(undefined)
	const [annotation, setAnnotation] = useState({
		skillToDisplay: 0,
		sideToRender: 'right',
		render: false,
		stateID: 0,
	})
	const carouselLeftRef = useRef()
	const carouselRightRef = useRef()

	useEffect(() => {
		setSize(width / 10)
	}, [width])

	// select item in one of the carousels
	useEffect(() => {
		const timer = setTimeout(() => {
			carouselRightRef.current.selectItem(3)
		}, 1000)
		return () => clearTimeout(timer)
	}, [])

	//mount annotation
	useEffect(() => {
		setAnnotation((prevAnnotation) => {
			return {
				...prevAnnotation,
				render: false,
				stateID: randomID,
			}
		})
		if (!skill) return
		const timer = setTimeout(() => {
			setAnnotation({
				skillToDisplay: skill,
				sideToRender: side,
				render: true,
				stateID: randomID,
			})
		}, 1000)
		return () => clearTimeout(timer)
	}, [skill, side])

	return (
		<>
			<Container>
				<Wrapper>
					<CarouselsContainer>
						<CarouselContainer2 state={props.state}>
							<CarouselContainer3 side={side}>
								<CarouselWrapper>
									<Carousel
										images={skills.map((skill) => skill.imageURL)}
										width={size}
										angle={7}
										speed={2}
										colors={{
											active: Theme.activeSkill,
											inactive: Theme.inactiveSkill,
											background: Theme.background,
										}}
										vertical
										callback={(selectedID) => {
											if (selectedID === null) {
												setSkill(undefined)
												return
											}
											setSkill(skills[selectedID])
											setSide('right')
											carouselRightRef.current.releaseCarousel()
										}}
										ref={carouselLeftRef}
									/>
								</CarouselWrapper>
								<CarouselWrapper>
									<Carousel
										images={skills.map((skill) => skill.imageURL)}
										width={size}
										angle={7}
										speed={-2}
										colors={{
											active: Theme.activeSkill,
											inactive: Theme.inactiveSkill,
											background: Theme.background,
										}}
										vertical
										callback={(selectedID) => {
											if (selectedID === null) {
												setSkill(undefined)
												return
											}
											setSkill(skills[selectedID])
											setSide('left')
											carouselLeftRef.current.releaseCarousel()
										}}
										ref={carouselRightRef}
									/>
								</CarouselWrapper>
							</CarouselContainer3>
						</CarouselContainer2>
					</CarouselsContainer>
					<AnnotationContainer side={annotation.sideToRender}>
						<Transition
							in={annotation.render}
							timeout={{
								appear: 0,
								enter: 100,
								exit: 300,
							}}
							appear
						>
							{(state) => (
								<Annotation
									title={annotation.skillToDisplay.title}
									description={annotation.skillToDisplay.description}
									side={annotation.sideToRender}
									state={state}
									sectionState={props.state}
								/>
							)}
						</Transition>
					</AnnotationContainer>
				</Wrapper>
			</Container>
		</>
	)
}

export default Skills
