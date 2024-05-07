import React from 'react'
import styled, { keyframes } from 'styled-components'

import Theme from '../../../other/Theme'

const stretch = keyframes`
0% {
    height: 5%;
}
50% {
    height: 95%;
}
    100% {
        height: 5%;
    }
`
const appear = keyframes`
    0% {
        height: 0px;
    }
    100% {
        height: 50%;
    }
`

const Container = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	left: 17px;
	top: 50%;
	width: 2px;
	transform: translateY(-50%);
	animation: ${appear} 0.8s 1.5s ease-in-out forwards;
	overflow: hidden;
`
const El1 = styled.div`
	width: 100%;
	height: 10%;
	background-color: ${Theme.text};
	animation: ${stretch} 12s cubic-bezier(0.52, 1.14, 0.51, -0.99) infinite;
`

const El2 = styled.div`
	width: 100%;
	height: 4px;
	margin: 6px 0;
	background-color: ${Theme.text};
`

const El3 = styled.div`
	width: 100%;
	flex: 1;
	background-color: ${Theme.text};
`

const LeftBar = () => {
	return (
		<>
			<Container>
				<El1 />
				<El2 />
				<El3 />
			</Container>
		</>
	)
}

export default LeftBar
