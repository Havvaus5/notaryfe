import './App.css'
import React from 'react'
import {Routes, Route } from 'react-router-dom'
import {useNavigate } from 'react-router-dom'
import CampaignPage from './components/CampaignPage'
import { Container, Menu } from 'semantic-ui-react'
import Home from './components/Home'
import NotFound from './components/NotFound'

import AdminHome from './components/admin/AdminHome'

function App() {
  let navigate = useNavigate()
  return (
    <Container>
      <Menu secondary>
        <Menu.Item
          name='home'
          onClick={() => navigate('/')}
        />
      </Menu>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/campaigns/:address' element={<CampaignPage />} />
        <Route path='/admin/:adressName' element={<AdminHome/>} />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>      
    </Container>
  )
}

export default App
