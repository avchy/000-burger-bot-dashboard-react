//styledComponents.jsx

import {
	Table,
	TableContainer,
	TableRow,
	TableCell,
	Box,
	styled,
	Button,
	TextField,
} from "@mui/material"

import theme from "styles/theme" // Импортируйте тему из нового файла

export const FlexRowContainer = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	// border: '1px solid blue',
}))

export const FlexColumnContainer = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	justifyContent: "start",
	// gap: theme.spacing(2),

	// border: '1px solid green',
}))
export const CenterBox = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
}))

export const StyledTextField = styled(TextField)(({ theme }) => ({
	color: "white",
}))
export const StyledButton = styled(Button)(({ theme }) => ({
	margin: theme.spacing(1),
}))

export const Container = styled(Box)`
	display: flex;
	flex-direction: column;
	position: "absolute";
`

export const BlackBox = styled(Box)`
	width: 22px;
	height: 21px;
	background: #000000 0% 0% no-repeat padding-box;
	margin-bottom: 11px;
`

export const FiveBlackBoxes = () => {
	return (
		<Container>
			<BlackBox />
			<BlackBox />
			<BlackBox />
			<BlackBox />
			<BlackBox />
		</Container>
	)
}

export const StyledTableCell = styled(TableCell)`
	background-color: #f5f5f5;
	font-weight: bold;
	border: 1px solid #ddd;
	padding: 10px;
`

export const StyledTableContainer = styled(TableContainer)`
	margin-top: 20px;
`

export const StyledTable = styled(Table)`
	min-width: 650px;
	border-collapse: collapse;
`

export const StyledTableRow = styled(TableRow)`
	&:nth-of-type(odd) {
		background-color: #e0e0e0;
		border: 1px solid #ddd;
	}
`

export const ImagePreview = styled(Box)`
	margin: 10px 0;
	/* padding: 5px; */

	border: 1px solid rgb(183, 183, 183);
	max-width: 200px;
	/* width: 100%; */
	display: flex;
	align-items: center;
	justify-content: center;
	color: rgb(78, 78, 78);

	img {
		max-width: 100%;
	}
`
