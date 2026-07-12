import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import NavbarWrapper from './NavbarWrapper';
import Home from './Home';
import PanelAggregator from './PanelAggregator';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<NavbarWrapper />}>
          <Route path="/" element={<Home />}/>
        </Route>
        <Route path="/livefeed" element={<PanelAggregator />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
