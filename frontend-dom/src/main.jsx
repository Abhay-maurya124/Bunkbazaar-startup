import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NewContext } from './NewContext/NewContext.jsx'
import { Cartcontextdata } from './NewContext/Cartcontext.jsx'
createRoot(document.getElementById('root')).render(
  <NewContext>
    <Cartcontextdata>
      <StrictMode>
        <App />
      </StrictMode>
    </Cartcontextdata>
  </NewContext>

)
