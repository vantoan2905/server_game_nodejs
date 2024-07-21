import React from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

const AppContainer = styled.div`
  display: flex;
`;

function App() {
  return (
    <AppContainer>
      <Sidebar />
      <Dashboard />
    </AppContainer>
  );
}

export default App;
