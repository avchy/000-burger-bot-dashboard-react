// components/Navbar/index.js

import React from 'react'
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './navbarElements'

import { useAuth0 } from '@auth0/auth0-react'

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

  return (
    <>
      <Nav>
        <Bars />
        {isAuthenticated && (
          <NavMenu>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/profile'>Profile</NavLink>
            <NavLink to='/settings'  >
              Settings
            </NavLink>
            <NavLink to='/statistics'  >
              Statistics{' '}
            </NavLink>
            <NavLink to='/orders'  >
              Orders
            </NavLink>
          </NavMenu>
        )}
        
        {/* Second Nav */}

        <NavBtn>
          {!isAuthenticated && (
            <NavBtnLink to='/' onClick={() => loginWithRedirect()}  >
              login
            </NavBtnLink>
          )}

          {isAuthenticated && (
            <NavBtnLink onClick={() => logout()} to='/'  >
              logout
            </NavBtnLink>
          )}
        </NavBtn>
      </Nav>
    </>
  )
}

export default Navbar
