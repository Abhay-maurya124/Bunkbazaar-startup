import './App.css'
import Footer from './component/Footer'
import Home from './Pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Order from './Pages/Order'
function App() {

  return (
    <>
   <div>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/order" element={<Order />} /> */}
        </Routes>
      </BrowserRouter>
   </div>
   <Footer/>
    </>
  )
}

export default App
