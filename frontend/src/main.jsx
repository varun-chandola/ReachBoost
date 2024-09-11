import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Login from "./component/Login.jsx"
import Signup from "./component/Signup.jsx"
import './index.css'
import { BrowserRouter , Routes , Route} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/app' element={<App />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
