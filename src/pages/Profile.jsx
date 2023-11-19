import { useAuth0 } from "@auth0/auth0-react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const Profile = () => {
	const { user, isAuthenticated } = useAuth0();

	return (
		isAuthenticated && (
			<>
				<Grid container spacing={2}>
					<Grid item xs={12} md={4}>
						{user?.picture && (
							<Avatar
								sx={{ width: 100, height: 100 }}
								src={user.picture}
								alt={user?.name}
							/>
						)}
					</Grid>
					<Grid item xs={12} md={8}>
						<Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
							<Box>
								<Typography variant="h5">{user?.name}</Typography>
								<List>
									{Object.keys(user).map((objKey, i) => (
										<ListItem key={i}>
											<ListItemText primary={objKey} secondary={user[objKey]} />
										</ListItem>
									))}
								</List>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</>
		)
	);
};

export default Profile;
