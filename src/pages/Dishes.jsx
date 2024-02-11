import React, { useState, useEffect } from "react"
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
  Input,
} from "@mui/material"

import Autocomplete from "@mui/material/Autocomplete"
import Stack from "@mui/material/Stack"
import axios from "axios"
import { useAuth0 } from "@auth0/auth0-react"
import {
  ImagePreview,
  StyledTableCell,
  FlexColumnContainer,
} from "styles/styledComponents"
import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { baseURL } from "constants/api"
import { LoadingOverlay } from "components/LoadingOverlay"

export function Dishes() {
  const { user } = useAuth0()
  // const user = {
  // 	nickname: "cafecafe",
  // 	picture: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
  // };
  const [productImg, setProductImg] = useState("")

  const [selectedToppings, setSelectedToppings] = useState([])
  const [newSelectedToppings, setNewSelectedToppings] = useState([])

  const [selectedExtras, setSelectedExtras] = useState([])
  const [newSelectedExtras, setNewSelectedExtras] = useState([])

  const [successAlert, setSuccessAlert] = useState(false)

  const [dishes, setDishes] = useState([])
  const [originalDishes, setOriginalDishes] = useState([])
  const [toppings, setToppings] = useState([])
  const [extras, setExtras] = useState([])
  const [newDish, setNewDish] = useState({
    title: "",
    description: "",
    price: "",
    toppings: [],
    extras: [],
    image: "",
  })
  const [loading, setLoading] = useState(false)
  // const [selectedDish, setSelectedDish] = useState({})

  const handleEditChange = (e, index, field) => {
    const { value } = e.target
    // Проверяем, что вводимое значение содержит только цифры
    if (field === "price" && !/^\d*$/.test(value)) {
      return // Прерываем выполнение функции, если ввод не является числом
    }

    const updatedDishes = [...dishes]
    updatedDishes[index][field] = e.target.value
    setDishes(updatedDishes)
  }

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
      setProductImg("")
    }
  }

  const handleNewDishChange = (e) => {
    const { name, value } = e.target

    // Проверяем, что вводимое значение содержит только цифры
    if (!/^\d*$/.test(value) && name === "price") {
      return // Прерываем выполнение функции, если ввод не является числом
    }

    setNewDish({ ...newDish, [name]: value })
  }

  const getMenu = async () => {
    // const restaurant = user.nickname
    const restaurant_id = 2
    setLoading(true)

    try {
      const response = await axios.get(`${baseURL}/dishes/` + restaurant_id)
      setLoading(false)
      console.log("getMenu_response.data", response.data)

      setDishes(response.data)
      setOriginalDishes(response.data) // Обновление originalDishes
      console.log('Запрос "getMenu" успешно выполнен')

      //   const receivedDishes = response.data;
      //   setDishes(receivedDishes);
      //   setOriginalDishes([...receivedDishes]); // Создаем копию полученных блюд и сохраняем в originalDishes
      //   console.log('Запрос "getMenu" успешно выполнен');
    } catch (error) {
      setLoading(false)
      console.error('Ошибка при выполнении запроса "getMenu":', error)
      return
    }
  }

  const getToppings = async () => {
    // const restaurant = user.nickname
    const restaurant_id = 2

    try {
      const response = await axios.get(`${baseURL}/toppings/${restaurant_id}`)

      console.log("getToppings_response.data", response.data)
      setToppings(response.data)

      console.log('Запрос "getToppings" успешно выполнен')
    } catch (error) {
      console.error('Ошибка при выполнении запроса "getToppings":', error)
      return
    }
  }
  const getExtras = async () => {
    // const restaurant = user.nickname
    const restaurant_id = 2

    try {
      const response = await axios.get(`${baseURL}/extras/${restaurant_id}`)

      console.log("getExtras.data", response.data)
      setExtras(response.data)

      console.log('Запрос "getExtras" успешно выполнен')
    } catch (error) {
      console.error('Ошибка при выполнении запроса "getExtras":', error)
      return
    }
  }

  const addNewDish = async (index) => {
    const restaurant_id = 2

    const dishToAdd = {
      ...newDish,
      image: productImg,
      restaurant_id: restaurant_id,
      toppings: newSelectedToppings,
      extras: newSelectedExtras,
    }

    setLoading(true)

    try {
      const response = await axios.post(`${baseURL}/dishes/`, dishToAdd)
      setLoading(false)

      console.log('Запрос "addNewDish" успешно выполнен')
      setSuccessAlert(true)
      setProductImg(null)
      setTimeout(() => {
        setSuccessAlert(false)
      }, 2000)
    } catch (error) {
      setLoading(false)
      console.error('Ошибка при выполнении запроса "addNewDish":', error)
      return
    }
    setDishes([...dishes, dishToAdd])

    setNewDish({
      title: "",
      description: "",
      price: "",
      toppings: [],
      image: "",
    })
  }

  const updateMenuItem = async (index) => {
    const updatedItem = dishes[index]

    const updatedDish = {
      ...updatedItem,
      toppings: dishes[index].toppings, // Добавление выбранных топингов в объект newDish
      extras: dishes[index].extras, // Добавление выбранных Extras в объект newDish

      restaurant_id: 2,
    }
    // console.log("updatedItem.id", updatedItem.id);
    // console.log("selectedToppings222", selectedToppings);
    // console.log("selectedExtras222", selectedExtras);
    console.log("updatedDish333", updatedDish)
    setLoading(true)

    try {
      const response = await axios.put(
        `${baseURL}/dishes/${updatedItem.id}`,
        updatedDish
      )
      setLoading(false)

      console.log('Запрос "updateMenuItem" успешно выполнен')
      const updatedDishes = [...dishes]
      updatedDishes[index] = updatedDish

      setDishes(updatedDishes)

      setSuccessAlert(true)
      setTimeout(() => {
        setSuccessAlert(false)
      }, 2000)
    } catch (error) {
      setLoading(false)

      console.error('Ошибка при выполнении запроса "updateMenuItem":', error)
    }
  }

  const deleteMenuItem = async (index) => {
    setLoading(true)

    try {
      const dishIdToDelete = dishes[index].id // Получаем ID блюда для удаления
      const response = await axios.delete(`${baseURL}/dishes/${dishIdToDelete}`)
      setLoading(false)

      console.log('Запрос "deleteMenuItem" успешно выполнен')

      const updatedDishes = [...dishes]
      updatedDishes.splice(index, 1) // Удаляем элемент из массива
      setDishes(updatedDishes)

      setSuccessAlert(true)
      setTimeout(() => {
        setSuccessAlert(false)
      }, 2000)
    } catch (error) {
      setLoading(false)

      console.error('Ошибка при выполнении запроса "deleteMenuItem":', error)
    }
  }

  const updateAllDishes = async () => {
    console.log("dishes", dishes)
    console.log("originalDishes", originalDishes)
    // Функция для сравнения объектов
    const isEqual = (obj1, obj2) => {
      return JSON.stringify(obj1) === JSON.stringify(obj2)
    }
    setLoading(true)
    try {
      const promises = dishes.map(async (dish) => {
        const originalDish = originalDishes.find((d) => d.id === dish.id)

        // console.log("originalDish111", originalDish)

        if (!isEqual(originalDish, dish)) {
          console.log("isEqual5555", originalDish)

          //   const response = await axios.put(`${baseURL}/dishes/${dish.id}`, dish);
          console.log(`Блюдо с ID ${dish.id} успешно обновлено`)
          console.log(`Блюдо с title ${dish.title} успешно обновлено`)
        }
      })

      await Promise.all(promises)

      setLoading(false)
      setSuccessAlert(true)
      setTimeout(() => {
        setSuccessAlert(false)
      }, 2000)
    } catch (error) {
      setLoading(false)
      console.error('Ошибка при выполнении запроса "updateAllDishes":', error)
    }
  }

  // function isEqual(obj1, obj2) {
  // 	function isObject(obj) {
  // 		return obj !== null && typeof obj === "object"
  // 	}
  // 	const keys1 = Object.keys(obj1)
  // 	const keys2 = Object.keys(obj2)

  // 	if (keys1.length !== keys2.length) {
  // 		return false
  // 	}

  // 	for (let key of keys1) {
  // 		const val1 = obj1[key]
  // 		const val2 = obj2[key]

  // 		const areObjects = isObject(val1) && isObject(val2)
  // 		if (
  // 			(areObjects && !isEqual(val1, val2)) ||
  // 			(!areObjects && val1 !== val2)
  // 		) {
  // 			return false
  // 		}
  // 	}

  // 	return true
  // }

  useEffect(() => {
    getMenu()
    getToppings()
    getExtras()
  }, [])
  //   }, [user.nickname])

  return (
    <>
      {successAlert && (
        <Box className="notification">
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            The operation was a — <strong>success!</strong>
          </Alert>
        </Box>
      )}

      {dishes.length == 0 && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}

      {dishes.length > 0 && (
        <Paper>
          <Box sx={{ textAlign: "right" }}>
            <Button
              sx={{ m: "5px " }}
              variant="contained"
              color="primary"
              onClick={() => updateAllDishes()}
              disabled={true}
            >
              Save All
            </Button>
          </Box>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "lightBlue" }}>
                <StyledTableCell width="5%">ID</StyledTableCell>
                <StyledTableCell width="20%">Title</StyledTableCell>
                <StyledTableCell width="20%">Description</StyledTableCell>
                <StyledTableCell width="10%">Price</StyledTableCell>
                
                <StyledTableCell width="20%">image</StyledTableCell>
                <StyledTableCell width="10%">Toppings</StyledTableCell>
                <StyledTableCell width="10%">Extras</StyledTableCell>
                <StyledTableCell width="5%">Actions</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* {console.log("dishes111", dishes)}{" "} */}
              {dishes.map((item, index) => (
                <TableRow key={index}>
                  <StyledTableCell>{item.id}</StyledTableCell>

                  <StyledTableCell>
                    <TextField
                      // sx={{ minWidth: "100px" }}
                      value={item.title}
                      onChange={(e) => handleEditChange(e, index, "title")}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <textarea
                      value={item.description}
                      style={{
                        width: "100%",
                        minHeight: "8em",
                      }}
                      onChange={(e) =>
                        handleEditChange(e, index, "description")
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      value={item.price}
                      onChange={(e) => handleEditChange(e, index, "price")}
                    />
                  </StyledTableCell>

                  <StyledTableCell>
                    <Box>
                      <ImagePreview>
                        {item.image ? (
                          <img src={item.image} alt="no_image!" />
                        ) : (
                          <Typography> Image Preview </Typography>
                        )}
                      </ImagePreview>

                      <label htmlFor={`imgUpload-${index}`}>
                        <Button
                          variant="contained"
                          component="span"
                          startIcon={<CloudUploadIcon />}
                          sx={{
                            "borderRadius": 8,
                            "backgroundColor": "#2196f3",
                            "color": "#fff",
                            "&:hover": { backgroundColor: "#1976d2" },
                          }}
                        >
                          Upload image
                        </Button>
                      </label>

                      <Input
                        id={`imgUpload-${index}`}
                        type="file"
                        inputProps={{
                          accept: "image/*",
                          style: { display: "none" },
                        }}
                        onChange={(e) => {
                          const updatedList = [...dishes]
                          const file = e.target.files[0]
                          const reader = new FileReader()

                          if (file) {
                            reader.readAsDataURL(file)
                            reader.onloadend = () => {
                              // setLogoImage(reader.result);
                              console.log("index", index)
                              updatedList[index].image = reader.result
                              console.log("updatedList", updatedList)

                              setDishes(updatedList)
                            }
                          }
                          //    else {
                          //     setDishes([...dishes])
                          //   }
                        }}
                        required
                      />
                    </Box>
                  </StyledTableCell>

                  {/* list of toppings in dish ================================================ */}
                  {/* {console.log("item.toppings ", item.toppings)} */}

                  <StyledTableCell>
                    {item.toppings && (
                      <Stack >
                      {/* <Stack spacing={3}> */}
                        <Autocomplete
                          multiple
                          options={toppings}
                          getOptionLabel={(option) => option.title}
                          value={item.toppings}
                          defaultValue={item.toppings}
                          filterSelectedOptions
                          onChange={(event, newValue) => {
                            handleEditChange(
                              { target: { value: newValue } }, // Создаем фейковое событие для передачи в handleEditChange
                              index,
                              "toppings"
                            )
                          }}
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                          } // Добавьте это свойство
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="toppings for this dish"
                              placeholder="..."
                            />
                          )}
                        />
                      </Stack>
                    )}
                  </StyledTableCell>

                  {/* list of extras in dish ================================================ */}

                  <StyledTableCell>
                    {item.extras && (
                      <Stack spacing={3}>
                        <Autocomplete
                          multiple
                          getOptionLabel={(option) => option.title}
                          defaultValue={item.extras}
                          options={extras}
                          value={item.extras}
                          onChange={(event, newValue) => {
                            handleEditChange(
                              { target: { value: newValue } }, // Создаем фейковое событие для передачи в handleEditChange
                              index,
                              "extras"
                            )
                          }}
                          filterSelectedOptions
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                          } // Добавьте это свойство
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="extras for this dish"
                              placeholder="..."
                            />
                          )}
                        />
                      </Stack>
                    )}
                  </StyledTableCell>

                  <StyledTableCell>
                    <Button
                      sx={{ m: "5px 0px" }}
                      variant="contained"
                      color="primary"
                      onClick={() => updateMenuItem(index)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteMenuItem(index)}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </TableRow>
              ))}
              {/* table for adding  new dish ================================================ */}
              {/*  ================================================ */}
              {/*   ================================================ */}
              <TableRow sx={{ backgroundColor: "lightBlue" }}>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
                <StyledTableCell>image</StyledTableCell>
                <StyledTableCell>Toppings</StyledTableCell>
                <StyledTableCell>Extras</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
              {/* creating a new dish ================================================ */}
              <TableRow sx={{ backgroundColor: "lightBlue" }}>
                <StyledTableCell>
                  {/* <TextField name='id'   variant='outlined' /> */}
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    name="title"
                    value={newDish.title}
                    onChange={handleNewDishChange}
                    variant="outlined"
                  />
                </StyledTableCell>
                <StyledTableCell>
                  {/* <TextField
                    name="description"
                    value={newDish.description}
                    onChange={handleNewDishChange}
                    variant="outlined"
                  /> */}

                  <textarea
                    name="description"
                    value={newDish.description}
                    style={{
                      width: "100%",
                      minHeight: "8em",
                    }}
                    onChange={handleNewDishChange}
                  />
                </StyledTableCell>
                <StyledTableCell sx={{ width: 100 }}>
                  <TextField
                    name="price"
                    value={newDish.price}
                    onChange={handleNewDishChange}
                    variant="outlined"
                  />
                </StyledTableCell>

                <StyledTableCell>
                  <ImagePreview>
                    {productImg ? (
                      <>
                        <img src={productImg} alt="error!" />
                      </>
                    ) : (
                      <p> Image Preview </p>
                    )}
                  </ImagePreview>
                  <label htmlFor={`imgUpload`}>
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<CloudUploadIcon />}
                      sx={{
                        "borderRadius": 8,
                        "backgroundColor": "#2196f3",
                        "color": "#fff",
                        "&:hover": { backgroundColor: "#1976d2" },
                      }}
                    >
                      Upload image
                    </Button>
                  </label>
                  <Input
                    id={`imgUpload`}
                    type="file"
                    inputProps={{
                      accept: "image/*",
                      style: { display: "none" },
                    }}
                    onChange={handleProductImageUpload}
                    required
                  />{" "}
                </StyledTableCell>

                {/* choose toppings in new dish================ */}

                <StyledTableCell>
                  {toppings && (
                    <Stack spacing={3}>
                      <Autocomplete
                        multiple
                        options={toppings}
                        getOptionLabel={(option) => option.title}
                        defaultValue={[...toppings]}
                        filterSelectedOptions
                        onChange={(event, newValue) => {
                          setNewSelectedToppings(newValue)
                        }}
                        // onChange={(e) => handleEditChange(e, index, "title")}

                        value={newSelectedToppings} // Установка выбранных значений из состояния
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="toppings for this dish"
                            placeholder="..."
                          />
                        )}
                      />
                    </Stack>
                  )}
                </StyledTableCell>

                {/* choose extras in new dish================ */}

                <StyledTableCell>
                  {extras && (
                    <Stack spacing={3}>
                      <Autocomplete
                        multiple
                        options={extras}
                        getOptionLabel={(option) => option.title}
                        defaultValue={[...extras]}
                        filterSelectedOptions
                        onChange={(event, newValue) => {
                          setNewSelectedExtras(newValue)
                        }}
                        value={newSelectedExtras} // Установка выбранных значений из состояния
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="extras for this dish"
                            placeholder="..."
                          />
                        )}
                      />
                    </Stack>
                  )}
                </StyledTableCell>

                <StyledTableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={addNewDish}
                  >
                    Add
                  </Button>
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* </TableBody> */}
          {/* </Table> */}
        </Paper>
      )}

      {loading && (
        <Box sx={{ width: "100%" }}>
          <LoadingOverlay />
        </Box>
      )}
    </>
  )
}
