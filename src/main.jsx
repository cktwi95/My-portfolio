import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import PentestWebAWS from './pages/PentestWebAWS.jsx'
import PentestAD from './pages/PentestAD.jsx'
import SiemWazuh from './pages/SiemWazuh.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projets/pentest-web-aws" element={<PentestWebAWS />} />
        <Route path="/projets/pentest-ad" element={<PentestAD />} />
        <Route path="/projets/siem-wazuh" element={<SiemWazuh />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)