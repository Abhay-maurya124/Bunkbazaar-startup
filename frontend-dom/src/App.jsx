import './App.css'
import Home from './Pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Order from './Pages/Order'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/order" element={<Order />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
