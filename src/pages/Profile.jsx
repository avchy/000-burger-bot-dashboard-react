import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
	const { isAuthenticated } = useAuth0();
	// const { user, isAuthenticated } = useAuth0();

	const user = {
		nickname: "cafecafe",
		picture: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
	};

	return (
		// isAuthenticated && (
		<article className="column">
			{user?.picture && (
				<img style={{ width: "100px" }} src={user.picture} alt={user?.name} />
			)}
			<h2>{user?.name}</h2>
			<ul>
				{Object.keys(user).map((objKey, i) => (
					<li key={i}>
						{objKey}: {user[objKey]}{" "}
					</li>
				))}
			</ul>
		</article>
		// )
	);
};

export default Profile;
