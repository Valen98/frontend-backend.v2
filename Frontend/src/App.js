import React from 'react'
import './Shared/Global/Styles/Style.css'
import Router from './Routes/Routing'
import NavBar from './Component/NavBar/NavBar'
import UserProvider from './Shared/Global/Provider/UserProvider'

function App() {
  return (
    <UserProvider>
    <main>
      <Router>
        <NavBar />
      </Router>
    </main>
    </UserProvider>
  );
}

export default App;
