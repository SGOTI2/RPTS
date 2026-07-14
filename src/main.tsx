import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import NavbarWrapper from './NavbarWrapper';
import Home from './Home';
import PanelAggregator from './PanelAggregator';
import './font.ts';
import { UnifiedStaticStateProvider } from './lib/unifiedStaticState.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UnifiedStaticStateProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<NavbarWrapper />}>
            <Route path="/" element={<Home />}/>
          </Route>
          <Route path="/livefeed" element={<PanelAggregator />}/>
        </Routes>
      </BrowserRouter>
    </UnifiedStaticStateProvider>
  </StrictMode>
)
