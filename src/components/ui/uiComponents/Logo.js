import React from 'react'
import styled, { keyframes } from 'styled-components'
import { bouncyAppear } from '../../../other/animations'

import Theme from '../../../other/Theme'
import { IconLogo } from '../../../other/Vectors'

const LogoContainer = styled.div`
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 30px;
	height: 30px;
	left: 17px;
	bottom: 17px;
`
const LogoIcn = styled(IconLogo)`
	width: 30px;
	height: 30px;
	fill: ${Theme.text};
	transform: scale(0);
	animation: ${bouncyAppear} 1s 2s linear forwards;
`

const Logo = () => {
	return (
		<>
			<LogoContainer>
				<LogoIcn />
			</LogoContainer>
		</>
	)
}

export default Logo
