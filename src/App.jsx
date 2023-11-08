import './styles/App.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { TableOrders } from './pages/TableOrders'
import { Settings } from './pages/Settings/Settings'
import { Home } from './pages/Home'
import { Statistics } from './pages/Statistics'

// import LoginButton from './components/LoginButton'
// import LogoutButton from './components/LogoutButton'
import Profile from './pages/Profile'
import { useAuth0 } from '@auth0/auth0-react'

import Navbar from './components/Navbar'

import { MenuItems } from './pages/Settings/MenuItems'
import { ProfileSettings } from './pages/Settings/ProfileSettings'

function App() {
  const { isLoading, error } = useAuth0()

  return (
    <main className='column'>
      {/* <h1>Enter to your Dashboard Shop Panel</h1> */}

      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          {/* <LoginButton />
          <LogoutButton /> */}

          <Router>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/statistics' element={<Statistics />} />
              <Route path='/orders' element={<TableOrders />} />

              {/* <Route path='/login' element={<LoginButton />} /> 
              <Route path='/logout' element={<LogoutButton />} /> */}

              <Route path='/menu_items' element={<MenuItems />} />
              <Route path='/profile_settings' element={<ProfileSettings />} />
            </Routes>
          </Router>
        </>
      )}
    </main>
  )
}

export default App
