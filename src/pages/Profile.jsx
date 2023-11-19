import { useAuth0 } from "@auth0/auth0-react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <Box maxWidth="800px" margin="auto" sx={{ overflow: "hidden", p: 3 }}>
                {user?.picture && (
                    <Avatar
                        sx={{ width: 100, height: 100, margin: "auto" }}
                        src={user.picture}
                        alt={user?.name}
                    />
                )}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
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
        )
    );
};

export default Profile;
