import {
	Table,
	TableBody,
	TableContainer,
	TableRow,
	Paper,
	styled,
	Box,
	Button,
	CircularProgress,
	Typography,
	TableCell,
	TextField,
} from "@mui/material";
import theme from "../styles/theme"; // Импортируйте тему из нового файла

export const FlexRowContainer = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	// border: '1px solid blue',
}));

export const FlexColumnContainer = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	justifyContent: "start",
	// gap: theme.spacing(2),

	// border: '1px solid green',
}));
export const CenterBox = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
	color: "white",
}));
export const StyledButton = styled(Button)(({ theme }) => ({
	margin: theme.spacing(2),
}));

export const Container = styled(Box)`
	display: flex;
	flex-direction: column;
	position: "absolute";
`;

export const BlackBox = styled(Box)`
	width: 22px;
	height: 21px;
	background: #000000 0% 0% no-repeat padding-box;
	margin-bottom: 11px;
`;

export const FiveBlackBoxes = () => {
	return (
		<Container>
			<BlackBox />
			<BlackBox />
			<BlackBox />
			<BlackBox />
			<BlackBox />
		</Container>
	);
};
