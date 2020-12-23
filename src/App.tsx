import React from 'react';
import { MemoryRouter } from 'react-router';
import Router from './routers';

function App() {
  return (
    <MemoryRouter>
      <Router />
    </MemoryRouter>
  );
}

export default App;
