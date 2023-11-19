import { useAuth0 } from "@auth0/auth0-react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import { FlexColumnContainer } from "components/AllHelpComponents";

const Profile = () => {
	const { user, isAuthenticated } = useAuth0();

	return (
		isAuthenticated && (
			<FlexColumnContainer sx={{ m: 3 }}>
				{user?.picture && (
					<Avatar
						sx={{ width: 100, height: 100, margin: "auto" }}
						src={user.picture}
						alt={user?.name}
					/>
				)}
				<Typography variant="h4">{user?.name}</Typography>

				{Object.keys(user).map((objKey, i) => (
					<Box key={i}>
						<Typography sx={{mt:2}} variant="h5">{objKey}</Typography>
						<Typography noWrap >{user[objKey]}</Typography>
					</Box>
				))}
			</FlexColumnContainer>
		)
	);
};

export default Profile;
