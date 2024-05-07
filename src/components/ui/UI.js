import React, { useEffect } from 'react'

import Frame from './uiComponents/Frame'
import SocialLinks from './uiComponents/SocialLinks'
import Navbar from './uiComponents/Navbar'

const UI = (props) => {
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
			<Frame firstLoad={props.firstLoad} />
		</>
	)
}

export default UI
