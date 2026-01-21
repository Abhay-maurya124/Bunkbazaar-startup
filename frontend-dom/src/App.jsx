import './App.css'
import Pagination from './mini-component/Pagination'
import Home from './Pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {

  return (
    <>
              <Pagination />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
