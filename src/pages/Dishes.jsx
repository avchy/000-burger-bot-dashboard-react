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
import Autocomplete from '@mui/material/Autocomplete'
import Stack from '@mui/material/Stack'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import { ImagePreview } from '../components/styledComponents'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

export function Dishes() {
  const { user } = useAuth0()
  const [productImg, setProductImg] = useState('')
  const [selectedToppings, setSelectedToppings] = useState([])
  const [newSelectedToppings, setNewSelectedToppings] = useState([])
  const [successAlert, setSuccessAlert] = useState(false)

  const [dishes, setDishes] = useState([])
  const [toppings, setToppings] = useState([])
  const [menuItem, setMenuItem] = useState({
    title: '',
    description: '',
    price: '',
    toppings: [],
    image: '',
  })

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0]

    TransformFileData(file)
  }

  const TransformFileData = (file) => {
    const reader = new FileReader()

    if (file) {
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setProductImg(reader.result)
      }
    } else {
      setProductImg('')
    }
  }

  const handleMenuItemChange = (e) => {
    const { name, value } = e.target
    setMenuItem({ ...menuItem, [name]: value })
  }

  // const deleteMenuItem = (index) => {
  //   const updatedDishes = [...dishes]
  //   updatedDishes.splice(index, 1)
  //   setDishes(updatedDishes)
  // }

  const deleteMenuItem = async (index) => {
    try {
      const dishIdToDelete = dishes[index].id // Получаем ID блюда для удаления
      const response = await axios.delete(`https://burgerim.ru/dishes/${dishIdToDelete}`)

      console.log('Запрос "deleteMenuItem" успешно выполнен')

      const updatedDishes = [...dishes]
      updatedDishes.splice(index, 1) // Удаляем элемент из массива
      setDishes(updatedDishes) // Обновляем состояние dishes без удаленного элемента
    } catch (error) {
      console.error('Ошибка при выполнении запроса "deleteMenuItem":', error)
    }
  }

  const getMenu = async () => {
    // const restaurant = user.nickname
    // const restaurant = 'cafecafe'
    const restaurant_id = 2

    try {
      // const response = await axios.get('https://burgerim.ru/dishes/' + restaurant)
      const response = await axios.get('https://burgerim.ru/dishes/' + restaurant_id)

      console.log('getMenu_response.data', response.data)
      setDishes(response.data)

      console.log('Запрос "getMenu" успешно выполнен')
    } catch (error) {
      console.error('Ошибка при выполнении запроса "getMenu":', error)
      return
    }
  }

  const getToppings = async () => {
    // const restaurant = user.nickname
    // const restaurant = 'cafecafe'
    const restaurant_id = 2

    try {
      // const response = await axios.get('https://burgerim.ru/dishes/' + restaurant)
      const response = await axios.get('https://burgerim.ru/toppings/' + restaurant_id)

      console.log('response.data', response.data)
      setToppings(response.data)

      console.log('Запрос "getMenu" успешно выполнен')
    } catch (error) {
      console.error('Ошибка при выполнении запроса "getMenu":', error)
      return
    }
  }

  useEffect(() => {
    getMenu()
    getToppings()
  }, [user.nickname])

  const addMenuItem = async () => {
    console.log('menuItem :>> ', menuItem)
    const restaurant_id = 2

    console.log('newSelectedToppings', newSelectedToppings)

    const newDish = {
      ...menuItem,
      image: productImg,
      restaurant_id: restaurant_id,
      toppings: newSelectedToppings, // Добавление выбранных топингов в объект menuItem
    }

    console.log('newDish :>> ', newDish)

    try {
      const response = await axios.post('https://burgerim.ru/dishes', newDish)
      console.log('Запрос "addMenuItem" успешно выполнен')
      setSuccessAlert(true)
      setTimeout(() => {
        setSuccessAlert(false)
      }, 2000)
    } catch (error) {
      console.error('Ошибка при выполнении запроса "addMenuItem":', error)
      return
    }
    setDishes([...dishes, newDish])

    setMenuItem({
      title: '',
      description: '',
      price: '',
      toppings: [],
      image: '',
    })
  }

  const updateMenuItem = async (index) => {
    const updatedItem = dishes[index]

    const updatedDish = {
      ...updatedItem,
      toppings: selectedToppings,
      restaurant_id: 2, // Укажите соответствующий restaurant_id
    }

    console.log('selectedToppings', selectedToppings)

    try {
      const response = await axios.put(`https://burgerim.ru/dishes/${updatedItem.id}`, updatedDish)
      // const response = await axios.put(`https://burgerim.ru/dishes/${updatedItem.id}`, updatedDish);
      console.log('Запрос "updateMenuItem" успешно выполнен')
      const updatedDishes = [...dishes]
      updatedDishes[index] = updatedDish
      setDishes(updatedDishes)
      setSelectedToppings([])
      setSuccessAlert(true)
      setTimeout(() => {
        setSuccessAlert(false)
      }, 2000)
    } catch (error) {
      console.error('Ошибка при выполнении запроса "updateMenuItem":', error)
    }
  }

  return (
    <>
      {successAlert && (
        <Box className='notification'>
          <Alert severity='success'>
            <AlertTitle>Success</AlertTitle>
            The operation was a — <strong>success!</strong>
          </Alert>
        </Box>
      )}

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
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>image</TableCell>
                <TableCell>Toppings</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {console.log('dishes111', dishes)}{' '}
              {dishes.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>
                    {item.image ? (
                      <img
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        src={item.image}
                        alt='dish_image'
                      />
                    ) : (
                      <p>Please upload an image</p>
                    )}
                  </TableCell>
                  {console.log('item.toppings ', item.toppings)}

                  {/* list of toppings in dish================ */}
                  <TableCell>
                    {item.toppings && (
                      <Stack spacing={3}>
                        <Autocomplete
                          multiple
                          id='tags-outlined'
                          options={toppings.filter(
                            (topping) => !item.toppings.some((selected) => selected.id === topping.id)
                          )}
                          getOptionLabel={(option) => option.title}
                          defaultValue={[...item.toppings]}
                          filterSelectedOptions
                          onChange={(event, newValue) => {
                            setSelectedToppings(newValue)
                          }}
                          // isOptionEqualToValue={(option, value) => option.id === value.id} // Добавьте это свойство

                          renderInput={(params) => (
                            <TextField {...params} label='toppings for this dish' placeholder='...' />
                          )}
                        />
                      </Stack>
                    )}
                  </TableCell>

                  <TableCell>
                    <Button
                      sx={{ m: '5px 0px' }}
                      variant='contained'
                      color='primary'
                      onClick={() => updateMenuItem(index)}
                    >
                      Update
                    </Button>
                    <Button variant='contained' color='secondary' onClick={() => deleteMenuItem(index)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {/* creating a new dish================ */}
              <TableRow sx={{ backgroundColor: 'lightBlue' }}>
                <TableCell>{/* <TextField name='id'   variant='outlined' /> */}</TableCell>
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
                  <input id='imgUpload' accept='image/*' type='file' onChange={handleProductImageUpload} required />
                  <ImagePreview>
                    {productImg ? (
                      <>
                        <img src={productImg} alt='error!' />
                      </>
                    ) : (
                      <p>Product image upload preview will appear here!</p>
                    )}
                  </ImagePreview>
                </TableCell>

                {/* choose toppings in new dish================ */}

                <TableCell>
                  {toppings && (
                    <Stack spacing={3}  >
                      <Autocomplete
                        multiple
                        id='tags-outlined'
                        options={toppings}
                        getOptionLabel={(option) => option.title}
                        defaultValue={[...toppings]}
                        filterSelectedOptions
                        onChange={(event, newValue) => {
                          setNewSelectedToppings(newValue)
                        }}
                        value={newSelectedToppings} // Установка выбранных значений из состояния
                        renderInput={(params) => (
                          <TextField {...params} label='toppings for this dish' placeholder='...' />
                        )}
                      />
                    </Stack>
                  )}
                </TableCell>

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
