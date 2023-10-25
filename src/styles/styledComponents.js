import { styled } from '@mui/material/styles'
import { Table, TableContainer, TableRow, TableCell } from '@mui/material'

export const StyledTableContainer = styled(TableContainer)`
  margin-top: 20px;
`

export const StyledTable = styled(Table)`
  min-width: 650px;
  border-collapse: collapse;
`

export const StyledTableCell = styled(TableCell)`
  background-color: #f5f5f5;
  font-weight: bold;
  border: 1px solid #ddd;
  padding: 10px;
`

export const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #e0e0e0;
    border: 1px solid #ddd;
  }
`
