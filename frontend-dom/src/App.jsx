import './App.css'
import Footer from './component/Footer'
import Home from './Pages/Home'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'
import Order from './Pages/Order'
import Navbar from './component/Navbar'
import Career from './Pages/Career'
import Bussiness from './Pages/Bussiness'
import Register from './Authentication/Register'
import Login from './Authentication/Login'
import Verify from './Authentication/Verify'
import Blog from './Pages/Blog'

// Layout with Navbar + Footer
function Layout() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth routes (no navbar/footer) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:token" element={<Verify />} />

        {/* Routes WITH Navbar/Footer */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="order" element={<Order />} />
          <Route path="bussiness" element={<Bussiness />} />
          <Route path="career" element={<Career />} />
          <Route path="blog" element={<Blog />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
