import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactFlowProvider } from '@xyflow/react';
import HeroPage from './pages/HeroPage';
import HomePage from './pages/HomePage';
import Layout from './templates/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            index
            element={<HomePage />}
          />
          <Route
            path="/:id"
            element={
              <ReactFlowProvider>
                <HeroPage />
              </ReactFlowProvider>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
