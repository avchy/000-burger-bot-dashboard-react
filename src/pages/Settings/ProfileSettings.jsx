import React, { useState } from 'react'
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TextField,
} from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'
import NavbarSettings from '../../components/Navbar/NavbarSettings'

export function ProfileSettings() {
  const { user } = useAuth0()
  const [link, setLink] = useState('')

  const handleLinkChange = (e) => {
    setLink(e.target.value)
  }
  const handlePhotoUpload = () => {
    // Ваш код для загрузки фото здесь
  }
  return (
    <>
      <NavbarSettings />

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Profile Photo</TableCell>
              <TableCell>Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handlePhotoUpload}
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={link}
                  onChange={handleLinkChange}
                  label='Link'
                  variant='outlined'
                  fullWidth
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </>
  )
}
