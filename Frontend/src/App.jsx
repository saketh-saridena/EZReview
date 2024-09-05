import './App.css'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage.jsx'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import NavBar from './NavBar.jsx'
import AboutUs from './pages/AboutUs.jsx'
function App() {


  return (
    <>
    <Router>
      <NavBar/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/about' element={<AboutUs/>}/>
          <Route path='/contact' element={<ContactPage/>}/>
         
        </Routes>
    
    </Router>
      
    </>
  )
}

export default App
