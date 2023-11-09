import React, { useState, useEffect } from 'react'
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
  TextField,
} from '@mui/material'

import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'
import Stack from '@mui/material/Stack'

import NavbarSettings from '../../components/Navbar/NavbarSettings'
import axios from 'axios'

import { useAuth0 } from '@auth0/auth0-react'

export function MenuItems() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()

  const [menuItems, setMenuItems] = useState([])
  const [menuItem, setMenuItem] = useState({
    title: '',
    description: '',
    price: '',
    toppings: '',
    image: '', // Добавлено поле "image"
  })

  const handleMenuItemChange = (e) => {
    const { name, value } = e.target
    setMenuItem({ ...menuItem, [name]: value })
  }

  const addMenuItem = () => {
    setMenuItems([...menuItems, menuItem])
    setMenuItem({
      title: '',
      description: '',
      price: '',
      toppings: '',
      image: '',
    })
  }

  const deleteMenuItem = (index) => {
    const updatedMenuItems = [...menuItems]
    updatedMenuItems.splice(index, 1)
    setMenuItems(updatedMenuItems)
  }

  // const getMenu = async () => {
  //   // const url = 'https://localhost/'
  //   const url = 'https://burgerim.ru/'
  //   // const url = 'https://burgerim.ru/menu'
  //   try {
  //     const response = await axios.get('https://burgerim.ru/menu')

  //     console.log('response.data', response.data)
  //     setMenuItems(response.data)

  //     console.log('Запрос "getMenu" успешно выполнен')
  //   } catch (error) {
  //     console.error('Ошибка при выполнении запроса "getMenu":', error)
  //     return
  //   }
  // }

  const getMenu = async () => {
    const url = 'https://burgerim.ru/menu/'
    const restaurant = user?.nickname || 'cafecafe'
    // const restaurant = 'cafecafe'

    try {
      // const response = await axios.get("https://burgerim.ru/menu/cafecafe")
      const response = await axios.get(url + restaurant)

      console.log('response.data', response.data)
      setMenuItems(response.data)

      console.log('Запрос "getMenu" успешно выполнен')
    } catch (error) {
      console.error('Ошибка при выполнении запроса "getMenu":', error)
      return
    }
  }

  useEffect(() => {
    getMenu()
  }, [user?.nickname])

  return (
    <>
      <NavbarSettings />

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>image</TableCell>
              <TableCell>Toppings</TableCell>

              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.image}</TableCell>

                <TableCell>
                  {item.toppings && (
                    <Stack spacing={3} sx={{ width: 500 }}>
                      <Autocomplete
                        multiple
                        id='tags-outlined'
                        options={item.toppings}
                        getOptionLabel={(option) => option.title}
                        defaultValue={[...item.toppings]}
                        filterSelectedOptions
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label='toppings for this dish'
                            placeholder='...'
                          />
                        )}
                      />
                    </Stack>
                  )}
                </TableCell>

                {/* <TableCell>{JSON.stringify(item.toppings)}</TableCell> */}

                <TableCell>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => deleteMenuItem(index)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <TextField
                  name='title'
                  value={menuItem.title}
                  onChange={handleMenuItemChange}
                  variant='outlined'
                />
              </TableCell>
              <TableCell>
                <TextField
                  name='description'
                  value={menuItem.description}
                  onChange={handleMenuItemChange}
                  variant='outlined'
                />
              </TableCell>
              <TableCell>
                <TextField
                  name='price'
                  value={menuItem.price}
                  onChange={handleMenuItemChange}
                  variant='outlined'
                />
              </TableCell>
              <TableCell>
                <TextField
                  name='toppings'
                  value={menuItem.toppings}
                  onChange={handleMenuItemChange}
                  variant='outlined'
                />
              </TableCell>
              <TableCell>
                <TextField
                  name='image' // Добавлено поле "image"
                  value={menuItem.image}
                  onChange={handleMenuItemChange}
                  variant='outlined'
                />
              </TableCell>
              <TableCell>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={addMenuItem}
                >
                  Add
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </>
  )
}
