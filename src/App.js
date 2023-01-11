import './App.css'
import React from 'react'
import {Routes, Route } from 'react-router-dom'
import {useNavigate } from 'react-router-dom'
import CampaignPage from './components/CampaignPage'
import { Menu } from 'semantic-ui-react'
import Home from './components/Home'
import NotFound from './components/NotFound'

import IlanBilgileri from './components/user/IlanBilgileri'
import NotaryHome from './components/NotaryHome'

function App() {
  let navigate = useNavigate()
  return (
    <React.Fragment>
      <Menu secondary>
        <Menu.Item
          name='home'
          onClick={() => navigate('/')}
        />
      </Menu>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/campaigns/:address' element={<CampaignPage />} />
        <Route path='/notary/:adressName' element={<NotaryHome/>} />
        <Route path='/notary/user-ilan/:ilanId' element={<IlanBilgileri/>}/>
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>      
    </React.Fragment>
  )
}

export default App
