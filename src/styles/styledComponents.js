import { styled } from "@mui/material/styles";
import { Table, TableContainer, TableRow, TableCell, Box } from "@mui/material";

export const StyledTableContainer = styled(TableContainer)`
	margin-top: 20px;
`;

export const StyledTable = styled(Table)`
	min-width: 650px;
	border-collapse: collapse;
`;

export const StyledTableCell = styled(TableCell)`
	background-color: #f5f5f5;
	font-weight: bold;
	border: 1px solid #ddd;
	padding: 10px;
`;

export const StyledTableRow = styled(TableRow)`
	&:nth-of-type(odd) {
		background-color: #e0e0e0;
		border: 1px solid #ddd;
	}
`;

export const ImagePreview = styled(Box)`
	margin: 10px 0;
	padding: 5px;

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
`;
