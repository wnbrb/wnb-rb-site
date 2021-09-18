import React from 'react'
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'

import 'stylesheets/layout'

const SharedLayout = ({children}) => (
  <div className='layout'>
    <Header />
    <div className='body'>
      {children}
    </div>
    <Footer />
  </div>
)

export default SharedLayout;
