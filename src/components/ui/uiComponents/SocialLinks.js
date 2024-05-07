import React from 'react'
import styled, { keyframes } from 'styled-components'
import { bouncyAppear } from '../../../other/animations'
import Theme from '../../../other/Theme'

import { IconLinkedIn, IconGit, IconCV } from '../../../other/Vectors'

const linkAppear = keyframes`
	to {
		width: 25px;
		height: 25px;
	}
`

const LinksList = styled.ul`
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: absolute;
	z-index: 1000;
	top: 20px;
	right: 70px;
	width: 112px;
	height: 40px;
`
const LinkLi = styled.li`
	display: flex;
	align-items: center;
	justify-content: center;
	list-style: none;
	width: 30px;
	height: 30px;
`
const Link = styled.a`
	display: inline-block;
	cursor: pointer;
	display: flex;
	width: 25px;
	height: 25px;
	transform: scale(0);
	animation: ${bouncyAppear} 1s ${(props) => props.number * 0.2 + 0.5}s linear
		forwards;
`

function SocialLinks() {
	return (
		<LinksList>
			<LinkLi>
				<Link
					href="https://www.linkedin.com/in/lukas-ap%C5%A1ega-a9159a229/"
					target="_blank"
					number={3}
				>
					<IconLinkedIn fill={Theme.text} />
				</Link>
			</LinkLi>
			<LinkLi>
				<Link href="https://github.com/Fuyutami" target="_blank" number={2}>
					<IconGit fill={Theme.text} />
				</Link>
			</LinkLi>
			<LinkLi>
				<Link href="./cv.pdf" target="_blank" number={1}>
					<IconCV fill={Theme.text} />
				</Link>
			</LinkLi>
		</LinksList>
	)
}

export default SocialLinks
