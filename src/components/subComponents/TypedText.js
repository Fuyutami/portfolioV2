import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Theme from '../../other/Theme'

const blink = keyframes`
	50% {
		opacity: 0;
	}
`
const Text = styled.h2`
	font-family: 'Orbitron', sans-serif;
	color: ${Theme.accentColor};
	font-size: ${(props) => Math.round(props.unit / 3)}px;
	margin-top: ${(props) => Math.round((props.unit * 2) / 5)}px;
	margin-left: 2rem;
	opacity: ${({ state }) => (state !== 'exiting' ? 1 : 0)};
	transition: opacity 0.5s;

	&::selection {
		color: ${Theme.background};
		background: ${Theme.accentColor};
	}

	&::after {
		content: '.';
		background-color: ${Theme.accentColor};
		opacity: ${(props) => (props.phase ? 1 : 0)};
		animation: ${(props) => (props.phase === 'idle' ? blink : null)} 1s
			step-start infinite;
	}
`
const TypedText = (props) => {
	const content = props.content

	const [line, setLine] = useState(0)
	const [phase, setPhase] = useState(undefined)
	const [typed, setTyped] = useState('')

	useEffect(() => {
		const timeout = setTimeout(() => {
			setPhase('typing')
		}, 1500 + props.initialDelay * 1000)
		return () => {
			clearTimeout(timeout)
		}
	}, [])

	useEffect(() => {
		switch (phase) {
			case 'idle':
				const timeout1 = setTimeout(() => {
					setPhase('deleting')
				}, 3000)
				return () => clearTimeout(timeout1)
			case 'typing':
				const timeout2 = setTimeout(() => {
					setTyped(content[line].slice(0, typed.length + 1))
					if (typed === content[line]) {
						setPhase('idle')
					}
				}, 150)
				return () => clearTimeout(timeout2)
			case 'deleting':
				const timeout3 = setTimeout(() => {
					if (typed === '') {
						let lineNumber = line + 1
						if (lineNumber >= content.length) lineNumber = 0
						setLine(lineNumber)
						setPhase('typing')
						return () => clearTimeout(timeout3)
					}
					setTyped(content[line].slice(0, typed.length - 1))
				}, 40)
		}
	}, [typed, phase])

	return (
		<Text phase={phase} unit={props.unit} state={props.state}>
			{typed}
		</Text>
	)
}

export default TypedText
