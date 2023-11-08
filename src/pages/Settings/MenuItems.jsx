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
import NavbarSettings from '../../components/NavbarSettings'
import axios from 'axios'
import Tags from './Tags'

export function MenuItems() {
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

  const getMenu = async () => {
    // const url = 'https://localhost/'
    const url = 'https://burgerim.ru/'
    // const url = 'https://burgerim.ru/menu'
    try {
      const response = await axios.get('https://burgerim.ru/menu')

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
  }, [])

  return (
    <>
      <NavbarSettings />

      <h1>Выбор нескольких элементов</h1>
      <Tags />

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>toppings</TableCell>
              <TableCell>image</TableCell>{' '}
              {/* Добавлено поле "image" в заголовок таблицы */}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{JSON.stringify(item.toppings)}</TableCell>
                <TableCell>{item.image}</TableCell>
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
