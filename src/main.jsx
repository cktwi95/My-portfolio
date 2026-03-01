import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import App from './App.jsx'
import PentestWebAWS from './pages/PentestWebAWS.jsx'
import PentestAD from './pages/PentestAD.jsx'
import SiemWazuh from './pages/SiemWazuh.jsx'
import SoarTheHive from './pages/SoarTheHive.jsx'
import CspmQualys from './pages/CspmQualys.jsx'
import OpenLdap from './pages/OpenLdap.jsx'
import './index.css'

function RedirectToProjets() {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate('/');
    setTimeout(() => {
      document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  }, []);
  return null;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projets" element={<RedirectToProjets />} />
        <Route path="/projets/" element={<RedirectToProjets />} />
        <Route path="/projets/pentest-web-aws" element={<PentestWebAWS />} />
        <Route path="/projets/pentest-ad" element={<PentestAD />} />
        <Route path="/projets/siem-wazuh" element={<SiemWazuh />} />
        <Route path="/projets/soar-thehive" element={<SoarTheHive />} />
        <Route path="/projets/cspm-qualys" element={<CspmQualys />} />
        <Route path="/projets/openldap" element={<OpenLdap />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
