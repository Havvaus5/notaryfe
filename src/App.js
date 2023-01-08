import './App.css'
import React from 'react'
import {Routes, Route } from 'react-router-dom'
import {useNavigate } from 'react-router-dom'
import CampaignPage from './components/CampaignPage'
import { Container, Menu } from 'semantic-ui-react'
import Home from './components/Home'
import NotFound from './components/NotFound'


import RealEstateSalePage from './components/realestate/RealEstateSalePage'
import RealEstateEkle from './components/admin/RealEstateEkle'
import RealEstateHissedarEkle from './components/admin/RealEstateHissedarEkle'

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
        <Route path='real-estates' element={<RealEstateSalePage/>}/>
        <Route path='/ekle' element={<RealEstateEkle/>}/>
        <Route path='/hissedar-ekle' element={<RealEstateHissedarEkle/>} />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>      
    </Container>
  )
}

export default App
