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
  LinearProgress,
  Box,
} from '@mui/material'

// import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'
import Stack from '@mui/material/Stack'

// import NavbarSettings from '../components/Navbar/NavbarSettings'
import axios from 'axios'

import { useAuth0 } from '@auth0/auth0-react'

import { v4 as uuidv4 } from 'uuid'

const folder = 'cafe_cafe_dishes'

export function Dishes() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()

  const [dishes, setDishes] = useState([])
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

  const deleteMenuItem = (index) => {
    const updatedDishes = [...dishes]
    updatedDishes.splice(index, 1)
    setDishes(updatedDishes)
  }

  const getMenu = async () => {
    const restaurant = user.nickname
    const restaurant_id = 2
    // const restaurant = 'cafecafe'

    try {
      // const response = await axios.get("https://burgerim.ru/dishes/cafecafe")
      // const response = await axios.get('https://burgerim.ru/dishes/' + restaurant)
      const response = await axios.get('https://burgerim.ru/dishes/' + restaurant_id)

      console.log('response.data', response.data)
      setDishes(response.data)

      console.log('Запрос "getMenu" успешно выполнен')
    } catch (error) {
      console.error('Ошибка при выполнении запроса "getMenu":', error)
      return
    }
  }

  useEffect(() => {
    getMenu()
  }, [user.nickname])

  // Add a function to handle image upload to Cloudinary
  // const uploadImageToCloudinary = async (file) => {
  //   try {
  //     // Upload the image to Cloudinary
  //     const result = await cloudinary.uploader.upload(file.path, {
  //       folder: folder, // Specify the folder in Cloudinary where you want to store the images
  //       public_id: uuidv4(), // Generate a unique public_id for each image using uuid
  //     })

  //     // Return the URL of the uploaded image
  //     return result.secure_url
  //   } catch (error) {
  //     console.error('Error uploading image to Cloudinary:', error)
  //     throw error
  //   }
  // }

  const addMenuItem = async () => {
    console.log('menuItem :>> ', menuItem)
    setDishes([...dishes, menuItem])

    const data = {
      ...menuItem,
      restaurant_name: user.nickname,
    }

    console.log('data :>> ', data)

    try {
      const response = await axios.post('https://burgerim.ru/dishes', data)
      console.log('Запрос "addMenuItem" успешно выполнен')
    } catch (error) {
      console.error('Ошибка при выполнении запроса "addMenuItem":', error)
      return
    }

    // const config = {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: 'https://burgerim.ru/dishes',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   data: data,
    // }

    // axios
    //   .request(config)
    //   .then((response) => {
    //      console.log('JSON.stringify(response.data) :>> ', JSON.stringify(response.data));
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })

    setMenuItem({
      title: '',
      description: '',
      price: '',
      toppings: '',
      image: '',
    })
  }

  // Update the addMenuItem function to handle image upload
  // const addMenuItem = async () => {
  //   try {
  //     // Check if an image file is provided
  //     if (menuItem.image) {
  //       // Upload the image to Cloudinary
  //       const imageUrl = await uploadImageToCloudinary(menuItem.image[0])
  //       // Update the menuItem object with the Cloudinary image URL
  //       setMenuItem({ ...menuItem, image: imageUrl })
  //     }

  //     // Add the updated menuItem to the dishes state
  //     setDishes([...dishes, menuItem])

  //     // Reset the menuItem state
  //     setMenuItem({
  //       title: '',
  //       description: '',
  //       price: '',
  //       toppings: '',
  //       image: '',
  //     })
  //   } catch (error) {
  //     console.error('Error adding menu item:', error)
  //   }
  // }

  return (
    <>
      {dishes.length == 0 && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      {dishes.length > 0 && (
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
              {dishes.map((item, index) => (
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
                            <TextField {...params} label='toppings for this dish' placeholder='...' />
                          )}
                        />
                      </Stack>
                    )}
                  </TableCell>

                  <TableCell>
                    <Button variant='contained' color='secondary' onClick={() => deleteMenuItem(index)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <TextField name='title' value={menuItem.title} onChange={handleMenuItemChange} variant='outlined' />
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
                  <TextField name='price' value={menuItem.price} onChange={handleMenuItemChange} variant='outlined' />
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
                  <TextField
                    name='toppings'
                    value={menuItem.toppings}
                    onChange={handleMenuItemChange}
                    variant='outlined'
                  />
                </TableCell>

                {/* <TableCell>
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
                            <TextField {...params} label='toppings for this dish' placeholder='...' />
                          )}
                        />
                      </Stack>
                    )}
                  </TableCell> */}

                <TableCell>
                  <Button variant='contained' color='primary' onClick={addMenuItem}>
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      )}
    </>
  )
}
