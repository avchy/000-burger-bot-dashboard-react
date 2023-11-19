import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";

export default function MobileMenu() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const Bars = styled(FaBars)`
		display: none;
		color: #808080;
		@media screen and (max-width: 768px) {
			display: block;
			position: absolute;
			top: 0;
			right: 0;
			transform: translate(-100%, 75%);
			font-size: 1.8rem;
			cursor: pointer;
		}
	`;

	return (
		<div>
			<Bars
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
			>
				Dashboard
			</Bars>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				<MenuItem onClick={handleClose}>Profile</MenuItem>
				<MenuItem onClick={handleClose}>My account</MenuItem>
				<MenuItem onClick={handleClose}>Logout</MenuItem>
			</Menu>
		</div>
	);
}
