import React, { useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

import { blinkEnter1, blinkExit } from '../other/animations'
import Theme from '../other/Theme'
import {
	GraphicsDoubleArrow,
	TextAbout,
	TextCoded,
	TextDesigned,
	TextFiles,
	TextLines,
	TextProject,
	TextQueries,
	TextViewCode,
	TextViewLiveSite,
} from '../other/Vectors'
import projectsData from '../other/projectsData'
import useWindowSize from '../hooks/useWindowSize'

const Blink = keyframes`
	0% {
		opacity: 0;
	}
	50% {
		opacity: 100%;
	}
	100% {
		opacity: 0;
	}
`
const Rotate = keyframes`
	0% {
		transform: rotate(0);
	}
	50% {
		transform: rotate(360deg);
	}
	100% {
		transform: rotate(0);
	}
`

const Container = styled.div`
	opacity: 0;
	position: absolute;
	z-index: -100;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem;

	animation: ${({ state }) => {
			switch (state) {
				case 'entering':
					return
				case 'entered':
					return blinkEnter1
				case 'exiting':
					return blinkExit
				case 'exited':
					return
			}
		}}
		0.3s step-end forwards;
	${({ state }) => {
		switch (state) {
			case 'entering':
				return
			case 'entered':
				return 'animation-delay: .5s'
			case 'exiting':
				return
			case 'exited':
				return
		}
	}};
`
const Wrapper = styled.div`
	width: 70%;
	height: 80%;
	display: flex;
	flex-direction: column;
	align-items: center;
`
const TitleWrapper = styled.div`
	width: 100%;
	height: 30px;
	display: flex;
	justify-content: center;
	margin-bottom: 2rem;
`
const Title = styled(TextProject)`
	max-width: 300px;
	width: 100%;
	height: 30px;
`
//navigator
const Navigator = styled.div`
	max-width: 300px;
	display: flex;
	justify-content: space-between;
	margin-bottom: 2rem;
`
const ProjectTitle = styled.img`
	margin: 0 2rem;
`
const Arrow = styled(GraphicsDoubleArrow)`
	transform: rotate(${(props) => (props.side === 'left' ? 180 : 0)}deg);
	width: 2rem;
`
const NavigationBtn = styled.button`
	border: none;
	background-color: transparent;
	cursor: pointer;
`
const ProjectDataWrapper = styled.div`
	height: 100%;
	width: 100%;
	display: grid;

	${(props) =>
		props.screenSize > 800
			? css`
					grid-template-columns: 33%;
			  `
			: css`
					grid-template-columns: 100%;
			  `}
`
const DataBox = styled.div`
	//shared styles
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	//separate styles
	${(props) =>
		props.id === 'info'
			? css``
			: props.id === 'image'
			? css`
					justify-content: center;
			  `
			: css``}
	//position
	${(props) =>
		props.screenSize > 800
			? css`
					grid-column-start: ${props.id === 'info'
						? 1
						: props.id === 'image'
						? 2
						: 3};
					grid-column-end: span;
					grid-row-start: 1;
					grid-row-end: span;
			  `
			: css`
					grid-column-start: 1;
					grid-column-end: span;
					grid-row-start: ${props.id === 'image'
						? 1
						: props.id === 'info'
						? 2
						: 3};
					grid-row-end: span;
					align-items: ${props.id === 'actions' ? 'flex-start' : 'center'};
			  `}
`
const Image = styled.img`
	width: 100%;
	max-width: 500px;
	height: auto;
	padding: 3rem;
`
//about
const About = styled.div`
	width: 100%;
`
const AboutTitle = styled(TextAbout)`
	height: 10px;
`
const AboutHandle = styled.div`
	background-color: ${Theme.text};
	width: 100%;
	height: 2px;
	position: relative;

	&::after {
		content: '';
		position: absolute;
		right: 0;
		top: 0;
		height: 2px;
		width: 50px;
		background-color: ${Theme.text};
		transform-origin: top left;
		transform: translateX(100%) rotate(45deg);
	}
	&::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		width: 5px;
		height: 5px;
		background-color: ${Theme.text};
		border-radius: 50%;
		transform: translate(
				${Math.sin(0.785398) * 50}px,
				${Math.sin(0.785398) * 50}px
			)
			translateY(-50%);
	}
`
const AboutText = styled.p`
	color: ${Theme.text};
	font-family: 'Gruppo', sans-serif;
	font-size: 1.8rem;
	max-width: 350px;
	display: flex;
	text-align: justify;
	margin-bottom: 3rem;
`
//coded designed
const CodedDesigned = styled.div`
	display: flex;
	height: 30px;
	width: 100%;
`
const Coded = styled(TextCoded)`
	padding: 1rem;
	height: 100%;
	background-color: ${Theme.inactiveSkill};
	opacity: ${(props) => (props.selected ? 1 : 0.4)};
`
const Designed = styled(TextDesigned)`
	padding: 1rem;
	height: 100%;
	background-color: ${Theme.inactiveSkill};
	opacity: ${(props) => (props.selected ? 1 : 0.4)};
`
//extra
const Extra = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`
const ExtraHandle = styled.div`
	height: 2px;
	width: 100%;
	background-color: ${Theme.text};
	position: relative;

	&::after {
		content: '';
		position: absolute;
		right: 0;
		top: 0;
		height: 2px;
		width: 50px;
		background-color: ${Theme.text};
		transform-origin: top left;
		transform: translateX(100%) rotate(-45deg);
	}
	&::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		width: 5px;
		height: 5px;
		background-color: ${Theme.text};
		border-radius: 50%;
		transform: translate(
				${Math.sin(0.785398) * 50}px,
				${-Math.sin(0.785398) * 50}px
			)
			translate(50%);
	}
`
const ExtraDeskription = styled.img`
	height: 10px;
	margin-bottom: 5px;
`
//live btn
const Live = styled.div`
	width: 100%;
	margin-bottom: 1rem;
`
const LiveBtn = styled.button`
	border: none;
	background-color: ${Theme.text};
	width: 150px;
	height: 25px;
	cursor: pointer;
	transform: skew(-45deg) translateX(10px);
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;

	&::after {
		content: '';
		background-color: ${Theme.text};
		position: absolute;
		right: 0;
		top: 0;
		width: 5px;
		height: 25px;
		opacity: 0;
		transform: translateX(200%);
		animation: ${Blink} 1s step-start infinite;
	}

	&::before {
		content: '';
		background-color: ${Theme.text};
		position: absolute;
		right: 0;
		top: 0;
		width: 5px;
		height: 25px;
		opacity: 0;
		transform: translateX(400%);
		animation: ${Blink} 2s 1s step-start infinite;
	}
`
const LiveText = styled(TextViewLiveSite)`
	transform: skew(45deg);
	height: 10px;
`
const LiveHandle = styled.div`
	width: 100%;

	position: relative;

	&::after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		height: 2px;
		width: 50px;
		background-color: ${Theme.text};
		transform-origin: top left;
		transform: rotate(135deg);
	}
	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 5px;
		height: 5px;
		background-color: ${Theme.text};
		border-radius: 50%;
		transform: translate(
				${-Math.sin(0.785398) * 50}px,
				${Math.sin(0.785398) * 50}px
			)
			translate(-100%, -50%);
	}
`
//stats
const Stats = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 180px;
	width: 150px;
	transform: translateX(${(props) => (props.size > 800 ? 30 : 0)}%);
`
const StatWrapper = styled.div`
	display: flex;
	align-items: center;
`
const Ball = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border: 1.5px solid ${Theme.text};
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	margin-right: 2rem;

	&::after {
		content: '';
		position: absolute;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		border: 1px dashed ${Theme.text};
		animation: ${Rotate} 10s infinite;
	}
`
const Number = styled.p`
	${(props) =>
		props.type === 'lines'
			? css`
					font-size: 1.2rem;
			  `
			: css`
					font-size: 1.8rem;
			  `}
`
const Text1 = styled(TextLines)`
	height: 8px;
`
const Text2 = styled(TextFiles)`
	height: 8px;
`
const Text3 = styled(TextQueries)`
	height: 8px;
`
//code btn
const Code = styled.div`
	width: 100%;
`
const CodeBtn = styled.button`
	border: none;
	background-color: ${Theme.text};
	width: 150px;
	height: 25px;
	cursor: pointer;
	transform: skew(45deg) translateX(12px);
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;

	&::after {
		content: '';
		background-color: ${Theme.text};
		position: absolute;
		right: 0;
		top: 0;
		width: 5px;
		height: 25px;
		opacity: 0;
		transform: translateX(200%);
		animation: ${Blink} 1s step-start infinite;
	}

	&::before {
		content: '';
		background-color: ${Theme.text};
		position: absolute;
		right: 0;
		top: 0;
		width: 5px;
		height: 25px;
		opacity: 0;
		transform: translateX(400%);
		animation: ${Blink} 2s 1s step-start infinite;
	}
`
const CodeHandle = styled.div`
	width: 100%;
	/* height: 2px; */
	position: relative;

	&::after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		height: 2px;
		width: 50px;
		background-color: ${Theme.text};
		transform-origin: top left;
		transform: rotate(-135deg);
	}
	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 5px;
		height: 5px;
		background-color: ${Theme.text};
		border-radius: 50%;
		transform: translate(
				${-Math.sin(0.785398) * 50}px,
				${-Math.sin(0.785398) * 50}px
			)
			translate(0%, -50%);
	}
`
const CodeText = styled(TextViewCode)`
	transform: skew(-45deg);
	height: 10px;
`

const Projects = (props) => {
	const [width, height] = useWindowSize()
	const [project, setProject] = useState(1)
	const projectsCount = projectsData.length

	const handlePrev = () => {
		console.log('prev')
		if (project !== 0) {
			setProject((prevState) => prevState - 1)
		} else {
			setProject(projectsCount - 1)
		}
		console.log(project)
	}
	const handleNext = () => {
		console.log('next')
		if (project !== projectsCount - 1) {
			setProject((prevState) => prevState + 1)
		} else {
			setProject(0)
		}
		console.log(project)
	}

	return (
		<Container state={props.state}>
			<Wrapper>
				<TitleWrapper>
					<Title fill={Theme.text} />
				</TitleWrapper>
				<Navigator>
					<NavigationBtn onClick={handlePrev}>
						<Arrow side={'left'} fill={Theme.text} />
					</NavigationBtn>
					<ProjectTitle src={projectsData[project].title}></ProjectTitle>
					<NavigationBtn onClick={handleNext}>
						<Arrow side={'right'} fill={Theme.text} />
					</NavigationBtn>
				</Navigator>
				<ProjectDataWrapper screenSize={width}>
					<DataBox screenSize={width} id={'info'}>
						<About>
							<AboutTitle fill={Theme.text} />
							{width > 800 ? <AboutHandle /> : ''}
							<AboutText>{projectsData[project].description}</AboutText>
							{width > 800 ? (
								<CodedDesigned>
									<Designed
										selected={projectsData[project].designed}
										fill={Theme.text}
									/>
									<Coded
										selected={projectsData[project].coded}
										fill={Theme.text}
									/>
								</CodedDesigned>
							) : (
								''
							)}
						</About>
						{width > 800 ? (
							<Extra>
								<ExtraDeskription
									src={projectsData[project].tech}
								></ExtraDeskription>
								<ExtraHandle />
							</Extra>
						) : (
							''
						)}
					</DataBox>
					<DataBox screenSize={width} id={'image'}>
						<Image src={projectsData[project].imageURL} />
					</DataBox>
					<DataBox screenSize={width} id={'actions'}>
						<Live>
							<a
								href={projectsData[project].siteLink}
								target="_blank"
								rel="noreferrer"
							>
								<LiveBtn>
									<LiveText fill={Theme.background} />
								</LiveBtn>
							</a>
							{width > 800 ? <LiveHandle></LiveHandle> : ''}
						</Live>
						{width > 800 ? (
							<Stats size={width}>
								<StatWrapper>
									<Ball>
										<Number type={'lines'}>
											{projectsData[project].lines}
										</Number>
									</Ball>
									<Text1 fill={Theme.text} />
								</StatWrapper>
								<StatWrapper>
									<Ball>
										<Number>{projectsData[project].files}</Number>
									</Ball>
									<Text2 fill={Theme.text} />
								</StatWrapper>
								<StatWrapper>
									<Ball>
										<Number>{projectsData[project].queries}</Number>
									</Ball>
									<Text3 fill={Theme.text} />
								</StatWrapper>
							</Stats>
						) : (
							''
						)}
						<Code>
							{width > 800 ? <CodeHandle></CodeHandle> : ''}
							<a
								href={projectsData[project].codeLink}
								target="_blank"
								rel="noreferrer"
							>
								<CodeBtn href>
									<CodeText fill={Theme.background} />
								</CodeBtn>
							</a>
						</Code>
					</DataBox>
				</ProjectDataWrapper>
			</Wrapper>
		</Container>
	)
}

export default Projects
