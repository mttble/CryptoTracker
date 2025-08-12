import React from 'react'
import Header from '../components/Common/Header'
import MainComponent from '../components/LandingPage'
import MarketOverviewBar from '../components/Common/MarketOverviewBar'
import Footer from '../components/Common/Footer'

function HomePage() {
  return (
    <div>
      <Header />
      <div style={{ padding: '0 16px' }}>
        <MarketOverviewBar />
      </div>
      <MainComponent />
      <Footer />
    </div>
  )
}

export default HomePage
