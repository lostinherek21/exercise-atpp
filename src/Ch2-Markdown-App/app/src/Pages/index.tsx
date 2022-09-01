import React from 'react'
import MDView from '../components/MDView'
import MDWrite from '../components/MDWrite'

import "./style.scss"

const Page = () => {
  return (
    <div className='main-container'>
      <main>
        <MDWrite />
        <MDView />
      </main>
    </div>
  )
}

export default Page