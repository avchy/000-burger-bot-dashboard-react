import React, { useState, useEffect } from "react"
import axios from "axios"
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material"

import { useAuth0 } from "@auth0/auth0-react"
import { FlexRowContainer } from "styles/styledComponents"

export function Home() {
  const { isAuthenticated } = useAuth0()
  // const isAuthenticated = true;

  return (
    <>
      {isAuthenticated && (
        <FlexRowContainer>
          <Typography variant="h4" align="center" m={2}>
            Home page
          </Typography>
        </FlexRowContainer>
      )}
    </>
  )
}
