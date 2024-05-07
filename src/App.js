import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { TransitionGroup, Transition } from 'react-transition-group'

import './App.css'
import UI from './components/ui/UI'
import Home from './components/Home'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'

function App() {
	const location = useLocation()
	const [firstLoad, setFirstLoad] = useState(true)

	return (
		<>
			<UI firstLoad={firstLoad} setFirstLoad={setFirstLoad} />
			<TransitionGroup component={null}>
				<Transition
					key={location.key}
					timeout={{
						appear: 300,
						enter: 300,
						exit: 1500,
					}}
					appear
				>
					{(state) => (
						<Routes location={location}>
							<Route
								exact
								path="/"
								element={<Home state={state} firstLoad={firstLoad} />}
							/>
							<Route
								exact
								path="/skills"
								element={<Skills state={state} firstLoad={firstLoad} />}
							/>
							<Route
								exact
								path="/projects"
								element={<Projects state={state} firstLoad={firstLoad} />}
							/>
							<Route
								exact
								path="/contact"
								element={<Contact state={state} firstLoad={firstLoad} />}
							/>
						</Routes>
					)}
				</Transition>
			</TransitionGroup>
		</>
	)
}

export default App
