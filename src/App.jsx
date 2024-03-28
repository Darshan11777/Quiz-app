import React from 'react'
import { BrowserRouter as Router, Routes,Route, NavLink } from 'react-router-dom'
import Openpage from './componant/Openpage'
import Try from './componant/Try.jsx'
import  "./App.css"
// import  "./index.css"
import AllQuetions from './componant/AllQuetions'
import bluebob from "./assets/images/blobs-blue.png"
import yellowbob from "./assets/images/blobs-yellow.png"

function App() {
  return (
    <div className='main' >
      <img src={yellowbob} alt="yellowbob"  className="blobs-yellow"/>
     
      <Router>
      <Routes>
        <Route path='/' element={<Openpage/>}/>
        <Route path='/home' element={<AllQuetions/>}/>
        <Route path='/h' element={<Try/>}/>
      </Routes>
      
    </Router>
      <img src={bluebob} alt="bluebob"  className='blobs-blue'/>
    
    </div>
  )
}

export default App
