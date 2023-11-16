import React from 'react'
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './navbarElements'

const NavbarSettings = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavBtn>
          <NavBtnLink to='/profile_settings'>Profile Settings</NavBtnLink>
          <NavBtnLink to='/dishes'>Menu Items</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  )
}

export default NavbarSettings
