// components/Navbar/index.js

import React from "react";
import {
	Nav,
	NavLink,
	Bars,
	NavMenu,
	NavBtn,
	NavBtnLink,
	NavBtnLinkLogIn,
} from "styles/navbarElements";
 
import { Typography } from "@mui/material";

import { useAuth0 } from "@auth0/auth0-react";
import { IoSettingsSharp } from "react-icons/io5";

const Navbar = () => {
	const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

	// const { loginWithRedirect, logout } = useAuth0();
	// const isAuthenticated = true;

	// const user = {
	// 	nickname: "cafecafe",
	// 	picture: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
	// };

	return (
		<>

			<Nav>
  				{isAuthenticated && (
					<NavMenu>
						<NavBtnLink to="/">Home</NavBtnLink>
						<NavBtnLink to="/profile">Profile</NavBtnLink>
						<NavBtnLink to="/toppings">Toppings</NavBtnLink>
						<NavBtnLink to="/dishes">Dishes</NavBtnLink>
						{/* <NavBtnLink to="/statistics">Statistics </NavBtnLink> */}
						<NavBtnLink to="/orders">Orders</NavBtnLink>
					</NavMenu>
				)}

				{/* Second Nav */}
				<NavBtn>
					{user?.picture && (
						<img
							className="avatar_img"
							style={{ width: "50px", margin: "10px 10px 10px 40px" }}
							src={user?.picture}
							alt={user?.nickname}
						/>
					)}

					{isAuthenticated ? (
						<Typography sx={{ p: 1 }}>hello {user?.nickname} </Typography>
					) : (
						<Typography sx={{ p: 1 }}>hello guest, please log in </Typography>
					)}

					{!isAuthenticated && (
						<NavBtnLinkLogIn to="/" onClick={() => loginWithRedirect()}>
							login
						</NavBtnLinkLogIn>
					)}

					{isAuthenticated && (
						<NavBtnLinkLogIn to="/" onClick={() => logout()}>
							logout
						</NavBtnLinkLogIn>
					)}
					{isAuthenticated && (
						<NavBtnLinkLogIn to="/settings">
							<IoSettingsSharp
								style={{ color: "black", fontSize: "20px", marginTop: "5px" }}
							/>
						</NavBtnLinkLogIn>
					)}
				</NavBtn>
			</Nav>
		</>
	);
};

export default Navbar;
