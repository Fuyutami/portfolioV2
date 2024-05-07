import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

import useWindowSize from '../../../hooks/useWindowSize'

import Theme from '../../../other/Theme'

const move = keyframes`
0% {
	bottom:0;
	transform: translateY(0);
}
50% {
	bottom: 100%;
	transform: translateY(100%);
}
100% {
	bottom: 0;
	transform: translateY(0);
}
`

const appear = keyframes`
from {
	opacity: 0;
}
	to {
		opacity: 1;
	}
`

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 4px;
	position: absolute;
	right: 30px;
	top: ${(props) => 55 + props.stSpace * 0.1}px;
`
const Square = styled.div`
	background-color: ${Theme.text};
	height: 4px;
	width: 4px;
	margin-bottom: ${(props) => (props.number === props.total ? 0 : 3)}px;
	opacity: ${(props) => (props.mounted ? 1 : 0)};
	animation: ${(props) => (!props.mounted ? appear : null)} 1s
		${(props) => (props.total - props.number) / 50 + 0.3}s step-start forwards;
`

const Rect = styled.div`
	background-color: ${Theme.text};
	height: 4px;
	width: 12px;
	position: absolute;
	bottom: 0;
	animation: ${move} ${(props) => Math.ceil(props.total / 20) * 2}s ease-in-out
		infinite;
`
let mounted = false

const RightBar = (props) => {
	const squaresCount = generateSquares(props.stretchSpace) // [[width, heigth],..]

	const [] = useWindowSize()

	useEffect(() => {
		const timer = setTimeout(() => {
			mounted = true
		}, 4000)
		return () => clearTimeout(timer)
	}, [])

	return (
		<>
			<Container stSpace={props.stretchSpace}>
				{[...Array(squaresCount)].map((_, id) => {
					return (
						<Square
							number={id}
							total={squaresCount}
							key={id}
							mounted={mounted}
						></Square>
					)
				})}
				<Rect total={squaresCount} />
			</Container>
		</>
	)
}

const generateSquares = (space) => {
	let count = 0
	// height(4) + margin(3) = 7
	for (let i = 0; i < Math.floor((space / 7) * 0.8); i++) {
		count++
	}
	return count
}

export default RightBar
