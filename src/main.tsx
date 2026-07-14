import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import NavbarWrapper from './NavbarWrapper';
import Home from './Home';
import PanelAggregator from './PanelAggregator';
import './font.ts';
import { UnifiedStaticStateProvider } from './lib/unifiedStaticState.tsx';
import { isValidated } from './lib/networking/firebase.ts';
import { FeedManagerProvider } from './lib/feedManager.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isValidated ? (
      <UnifiedStaticStateProvider>
        <FeedManagerProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<NavbarWrapper />}>
                <Route path="/" element={<Home />}/>
              </Route>
              <Route path="/livefeed" element={<PanelAggregator />}/>
            </Routes>
          </BrowserRouter>
        </FeedManagerProvider>
      </UnifiedStaticStateProvider>
    ) : (
      <h1 className="m-auto text-3xl p-32 leading-8">
        You need to setup firebase to use this project<br/>
        Contact SGOTI2 on 1511 for more details<br/>
        <small className="text-base">Sorry, I don't want everybody using up my free quota :(</small><br/>
        <small className="text-xs text-gray-600">Remember to reload the vite server</small></h1>
    )}
  </StrictMode>
)
