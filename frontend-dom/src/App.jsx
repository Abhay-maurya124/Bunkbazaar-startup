import './App.css'
import Footer from './component/Footer'
import Home from './Pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Order from './Pages/Order'
import Navbar from './component/Navbar'
import Career from './Pages/Career'
import Bussiness from './Pages/Bussiness'
import Register from './Authentication/Register'
import Login from './Authentication/Login'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/bussiness" element={<Bussiness />} />
        <Route path="/career" element={<Career />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />

      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
