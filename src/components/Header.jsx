import React from "react"
import { Typography, Box } from "@mui/material"
import { useLocation } from "react-router-dom"
import theme from "styles/theme"
import { useAuth0 } from "@auth0/auth0-react"

export const Header = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()

  const location = useLocation()

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <>
      {isAuthenticated && (
        <Box
          sx={{
            width: "100%",
            backgroundColor: theme.blue2,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" p="10px">
            {capitalizeFirstLetter(location.pathname.slice(1))}
          </Typography>
        </Box>
      )}
    </>
  )
}
