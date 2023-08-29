import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Player from './Player'
import { ROUTES } from './resources/routes-constants'
import Pledges from './Pledges'

const RoutesComponent = () => {
    return (
        <Router basename='/OmahaWarriors'>
            <Routes>
                {/* <Route path={ROUTES.INTRO_ROUTE} element={<Intro />} /> */}
                <Route path={ROUTES.MAINPAGE_ROUTE} element={<Home />} />
                <Route path={ROUTES.PLAYER_ROUTE} element={<Player />} />
                <Route path={ROUTES.PLEDGES} element={<Pledges />} />
            </Routes>
        </Router>
    )
}

export default RoutesComponent