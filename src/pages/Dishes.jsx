import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { ImagePreview } from "styles/styledComponents";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export function Dishes() {
  const { user } = useAuth0();
  // const user = {
  // 	nickname: "cafecafe",
  // 	picture: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
  // };
  const [productImg, setProductImg] = useState("");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [newSelectedToppings, setNewSelectedToppings] = useState([]);

  const [selectedExtras, setSelectedExtras] = useState([]);
  const [newSelectedExtras, setNewSelectedExtras] = useState([]);
  const [successAlert, setSuccessAlert] = useState(false);

  const [dishes, setDishes] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [extras, setExtras] = useState([]);
  const [menuItem, setMenuItem] = useState({
    title: "",
    description: "",
    price: "",
    toppings: [],
    extras: [],
    image: "",
  });

  const handleEditChange = (e, index, field) => {
    const { value } = e.target;
    // Проверяем, что вводимое значение содержит только цифры
    if (!/^\d*$/.test(value) && field === "price") {
      return; // Прерываем выполнение функции, если ввод не является числом
    }

    const updatedDishes = [...dishes];
    updatedDishes[index][field] = e.target.value;
    setDishes(updatedDishes);
  };

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    TransformFileData(file);
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleMenuItemChange = (e) => {
    const { name, value } = e.target;

    // Проверяем, что вводимое значение содержит только цифры
    if (!/^\d*$/.test(value) && name === "price") {
      return; // Прерываем выполнение функции, если ввод не является числом
    }

    setMenuItem({ ...menuItem, [name]: value });
  };

  const getMenu = async () => {
    // const restaurant = user.nickname
    const restaurant_id = 2;

    try {
      const response = await axios.get(
        "https://burgerim.ru/dishes/" + restaurant_id
      );

      console.log("getMenu_response.data", response.data);
      setDishes(response.data);

      console.log('Запрос "getMenu" успешно выполнен');
    } catch (error) {
      console.error('Ошибка при выполнении запроса "getMenu":', error);
      return;
    }
  };

  const getToppings = async () => {
    // const restaurant = user.nickname
    const restaurant_id = 2;

    try {
      const response = await axios.get(
        "https://burgerim.ru/toppings/" + restaurant_id
      );

      console.log("getToppings_response.data", response.data);
      setToppings(response.data);

      console.log('Запрос "getMenu" успешно выполнен');
    } catch (error) {
      console.error('Ошибка при выполнении запроса "getMenu":', error);
      return;
    }
  };
  const getExtras = async () => {
    // const restaurant = user.nickname
    const restaurant_id = 2;

    try {
      const response = await axios.get(
        "https://burgerim.ru/extras/" + restaurant_id
      );

      console.log("getExtras.data", response.data);
      setExtras(response.data);

      console.log('Запрос "getExtras" успешно выполнен');
    } catch (error) {
      console.error('Ошибка при выполнении запроса "getExtras":', error);
      return;
    }
  };

  const addMenuItem = async () => {
    console.log("menuItem :>> ", menuItem);
    const restaurant_id = 2;

    console.log("newSelectedToppings", newSelectedToppings);

    const newDish = {
      ...menuItem,
      image: productImg,
      restaurant_id: restaurant_id,
      toppings: newSelectedToppings, // Добавление выбранных топингов в объект menuItem
      extras: newSelectedExtras, // Добавление выбранных Extras в объект menuItem
    };

    console.log("newDish :>> ", newDish);

    try {
      const response = await axios.post("https://burgerim.ru/dishes", newDish);
      console.log('Запрос "addMenuItem" успешно выполнен');
      setSuccessAlert(true);
      setProductImg(null);
      setTimeout(() => {
        setSuccessAlert(false);
      }, 2000);
    } catch (error) {
      console.error('Ошибка при выполнении запроса "addMenuItem":', error);
      return;
    }
    setDishes([...dishes, newDish]);

    setMenuItem({
      title: "",
      description: "",
      price: "",
      toppings: [],
      image: "",
    });
  };

  const updateMenuItem = async (index) => {
    const updatedItem = dishes[index];

    const updatedDish = {
      ...updatedItem,
      toppings: selectedToppings,
      extras: selectedExtras,
      restaurant_id: 2, // Укажите соответствующий restaurant_id
    };

    console.log("selectedToppings", selectedToppings);
    console.log("selectedExtras", selectedExtras);

    try {
      const response = await axios.put(
        `https://burgerim.ru/dishes/${updatedItem.id}`,
        updatedDish
      );
      // const response = await axios.put(`https://burgerim.ru/dishes/${updatedItem.id}`, updatedDish);
      console.log('Запрос "updateMenuItem" успешно выполнен');
      const updatedDishes = [...dishes];
      updatedDishes[index] = updatedDish;

      setDishes(updatedDishes);

      setSelectedToppings([]);
      setSelectedExtras([]);

      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
      }, 2000);
    } catch (error) {
      console.error('Ошибка при выполнении запроса "updateMenuItem":', error);
    }
  };

  const deleteMenuItem = async (index) => {
    try {
      const dishIdToDelete = dishes[index].id; // Получаем ID блюда для удаления
      const response = await axios.delete(
        `https://burgerim.ru/dishes/${dishIdToDelete}`
      );

      console.log('Запрос "deleteMenuItem" успешно выполнен');

      const updatedDishes = [...dishes];
      updatedDishes.splice(index, 1); // Удаляем элемент из массива
      setDishes(updatedDishes);

      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
      }, 2000);
    } catch (error) {
      console.error('Ошибка при выполнении запроса "deleteMenuItem":', error);
    }
  };

  useEffect(() => {
    getMenu();
    getToppings();
    getExtras();
  }, [user.nickname]);

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
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "lightBlue" }}>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>image</TableCell>
                <TableCell>Toppings</TableCell>
                <TableCell>Extras</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {console.log("dishes111", dishes)}{" "}
              {dishes.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.id}</TableCell>

                  <TableCell>
                    <TextField
                      sx={{ minWidth: "100px" }}
                      value={item.title}
                      onChange={(e) => handleEditChange(e, index, "title")}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      sx={{ minWidth: "150px" }}
                      value={item.description}
                      onChange={(e) =>
                        handleEditChange(e, index, "description")
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={item.price}
                      onChange={(e) => handleEditChange(e, index, "price")}
                    />
                  </TableCell>

                  <TableCell>
                    <Box>
                      <ImagePreview>
                        {item.image ? (
                          <>
                            <img src={item.image} alt="no_image!" />
                          </>
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
                          const updatedList = [...dishes];
                          const file = e.target.files[0];
                          const reader = new FileReader();

                          if (file) {
                            reader.readAsDataURL(file);
                            reader.onloadend = () => {
                              // setLogoImage(reader.result);
                              console.log("index", index);
                              updatedList[index].image = reader.result;
                              console.log("updatedList", updatedList);

                              setDishes(updatedList);
                            };
                          } else {
                            setDishes([...dishes]);
                          }
                        }}
                        required
                      />
                    </Box>
                  </TableCell>

                  {/* list of toppings in dish ================================================ */}
                  {console.log("item.toppings ", item.toppings)}

                  <TableCell>
                    {item.toppings && (
                      <Stack spacing={3}>
                        <Autocomplete
                          multiple
                          id="tags-outlined"
                          options={toppings.filter(
                            (topping) =>
                              !item.toppings.some(
                                (selected) => selected.id === topping.id
                              )
                          )}
                          getOptionLabel={(option) => option.title}
                          defaultValue={[...item.toppings]}
                          filterSelectedOptions
                          onChange={(event, newValue) => {
                            setSelectedToppings(newValue);
                          }}
                          // isOptionEqualToValue={(option, value) => option.id === value.id} // Добавьте это свойство

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
                  </TableCell>

                  {/* list of extras in dish ================================================ */}
                  {console.log("item.extras ", item.extras)}

                  <TableCell>
                    {item.extras && (
                      <Stack spacing={3}>
                        <Autocomplete
                          multiple
                          id="tags-outlined"
                          options={extras.filter(
                            (topping) =>
                              !item.extras.some(
                                (selected) => selected.id === topping.id
                              )
                          )}
                          getOptionLabel={(option) => option.title}
                          defaultValue={[...item.extras]}
                          filterSelectedOptions
                          onChange={(event, newValue) => {
                            setSelectedExtras(newValue);
                          }}
                          // isOptionEqualToValue={(option, value) => option.id === value.id} // Добавьте это свойство

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
                  </TableCell>

                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))}
              {/* table for adding  new dish ================================================ */}
              <TableRow sx={{ backgroundColor: "lightBlue" }}>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>image</TableCell>
                <TableCell>Toppings</TableCell>
                <TableCell>Extras</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
              {/* creating a new dish ================================================ */}
              <TableRow sx={{ backgroundColor: "lightBlue" }}>
                <TableCell>
                  {/* <TextField name='id'   variant='outlined' /> */}
                </TableCell>
                <TableCell>
                  <TextField
                    name="title"
                    value={menuItem.title}
                    onChange={handleMenuItemChange}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="description"
                    value={menuItem.description}
                    onChange={handleMenuItemChange}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="price"
                    value={menuItem.price}
                    onChange={handleMenuItemChange}
                    variant="outlined"
                  />
                </TableCell>

                <TableCell>
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
                </TableCell>

                {/* choose toppings in new dish================ */}

                <TableCell>
                  {toppings && (
                    <Stack spacing={3}>
                      <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={toppings}
                        getOptionLabel={(option) => option.title}
                        defaultValue={[...toppings]}
                        filterSelectedOptions
                        onChange={(event, newValue) => {
                          setNewSelectedToppings(newValue);
                        }}
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
                </TableCell>

                {/* choose extras in new dish================ */}

                <TableCell>
                  {extras && (
                    <Stack spacing={3}>
                      <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={extras}
                        getOptionLabel={(option) => option.title}
                        defaultValue={[...extras]}
                        filterSelectedOptions
                        onChange={(event, newValue) => {
                          setNewSelectedExtras(newValue);
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
                </TableCell>

                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={addMenuItem}
                  >
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* </TableBody> */}
          {/* </Table> */}
        </Paper>
      )}
    </>
  );
}
