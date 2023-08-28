import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Player from './Player'
import { ROUTES } from './resources/routes-constants'

const RoutesComponent = () => {
    return (
        <Router basename='/OmahaWarriors'>
            <Routes>
                {/* <Route path={ROUTES.INTRO_ROUTE} element={<Intro />} /> */}
                <Route path={ROUTES.MAINPAGE_ROUTE} element={<Home />} />
                <Route path={ROUTES.PLAYER_ROUTE} element={<Player />} />
            </Routes>
        </Router>
    )
}

export default RoutesComponent