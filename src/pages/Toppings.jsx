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
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { ImagePreview } from "styles/styledComponents";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { FlexRowContainer, StyledButton } from "components/AllHelpComponents";

export function Toppings() {
  const { user } = useAuth0();
  const [toppingsList, setToppingsList] = useState([]);
  const [newTopping, setNewTopping] = useState({
    title: "",
    price: "",
    image: "",
  });
  const [logoImage, setLogoImage] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);

  const getToppings = async () => {
    const restaurant_id = 2;
    try {
      const response = await axios.get(
        "https://burgerim.ru/toppings/" + restaurant_id
      );
      setToppingsList(response.data);
    } catch (error) {
      console.error('Ошибка при выполнении запроса "getToppings":', error);
    }
  };

  const addTopping = async () => {
    const restaurant_id = 2;

    const data = {
      title: newTopping.title,
      price: newTopping.price,
      image: logoImage,
      restaurant_id: restaurant_id,
    };

    console.log("newDish :>> ", data);

    try {
      const response = await axios.post(
        "https://burgerim.ru/toppings/" + restaurant_id,
        data
      );
      console.log('Запрос "addMenuItem" успешно выполнен');

      setNewTopping({
        title: "",
        price: "",
        image: "",
      });

      getToppings();
      setSuccessAlert(true);

      setTimeout(() => {
        setSuccessAlert(false);
      }, 3000);
    } catch (error) {
      console.error('Ошибка при выполнении запроса "addMenuItem":', error);
      return;
    }
  };

  const updateTopping = async (index) => {
    const updatedTopping = toppingsList[index];
    try {
      await axios.put(
        `https://burgerim.ru/toppings/${updatedTopping.id}`,
        updatedTopping
      );
      setSuccessAlert(true);

      setTimeout(() => {
        setSuccessAlert(false);
      }, 3000);
      console.log("Топпинг успешно обновлен");
      getToppings();
    } catch (error) {
      console.error("Ошибка при обновлении топпинга:", error);
    }
  };

  const deleteTopping = async (index) => {
    try {
      const toppingIdToDelete = toppingsList[index].id;
      await axios.delete(`https://burgerim.ru/toppings/${toppingIdToDelete}`);

      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
      }, 3000);
      console.log("Топпинг успешно удален");
      getToppings();
    } catch (error) {
      console.error("Ошибка при удалении топпинга:", error);
    }
  };

  useEffect(() => {
    getToppings();
  }, [user.nickname]);

  const handleProductImageUpload = (e) => {
    // const file = e.target.files[0];
    const file = e.currentTarget.files[0];

    TransformFileData(file);
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setLogoImage(reader.result);
      };
    } else {
      setLogoImage("");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Проверяем, что вводимое значение содержит только цифры
    if (name === "price" && !/^\d+$/.test(value)) {
      return; // Прерываем выполнение функции, если ввод не является числом
    }

    setNewTopping({
      ...newTopping,
      [name]: value,
    });
  };

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

      {toppingsList.length === 0 && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}

      {toppingsList.length > 0 && (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {toppingsList.map((topping, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      value={topping.title}
                      onChange={(e) => {
                        const updatedList = [...toppingsList];
                        updatedList[index].title = e.target.value;
                        setToppingsList(updatedList);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={topping.price}
                      onChange={(e) => {
                        const { value } = e.target;
                        // Проверяем, что вводимое значение содержит только цифры
                        if (!/^\d*$/.test(value)) {
                          return; // Прерываем выполнение функции, если ввод не является числом
                        }
                        const updatedList = [...toppingsList];
                        updatedList[index].price = value;
                        setToppingsList(updatedList);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box>
                      <ImagePreview>
                        {topping.image ? (
                          <>
                            <img src={topping.image} alt="no_image!" />
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
                        id={`imgUpload-${index}`} // Убедитесь, что у каждого input уникальный id
                        type="file"
                        inputProps={{
                          accept: "image/*",
                          style: { display: "none" },
                        }}
                        onChange={(e) => {
                          const updatedList = [...toppingsList];
                          // updatedList[index].image = e.target.files[0];
                          // console.log('updatedList', updatedList)
                          // setToppingsList(updatedList);

                          const file = e.target.files[0];

                          const reader = new FileReader();

                          if (file) {
                            reader.readAsDataURL(file);
                            reader.onloadend = () => {
                              // setLogoImage(reader.result);
                              console.log("index", index);
                              updatedList[index].image = reader.result;
                              console.log("updatedList", updatedList);

                              setToppingsList(updatedList);
                            };
                          } else {
                            setToppingsList([...toppingsList]);
                          }
                        }} // onChange={handleProductImageUpload}
                        required
                      />

                      {/* <input
												id="imgUpload"
												type="file"
												accept="image/*"
												style={{ display: "none" }}
												onChange={(e) => handleProductImageUpload(e)}
												required
											/> */}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <StyledButton
                      variant="contained"
                      color="primary"
                      onClick={() => updateTopping(index)}
                    >
                      Update
                    </StyledButton>
                    <StyledButton
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteTopping(index)}
                    >
                      Delete
                    </StyledButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* // Add new Topping================================================ */}

      <FlexRowContainer sx={{ marginTop: "20px", padding: "20px" }}>
        <Typography variant="h6">Add New Topping</Typography>
        <TextField
          label="Title"
          name="title"
          value={newTopping.title}
          onChange={handleInputChange}
          sx={{ m: "10px" }}
        />
        <TextField
          label="Price"
          name="price"
          value={newTopping.price}
          onChange={handleInputChange}
          sx={{ m: "10px" }}
        />

        <Box>
          <ImagePreview>
            {logoImage ? (
              <>
                <img src={logoImage} alt="error!" />
              </>
            ) : (
              <Typography> Image Preview </Typography>
            )}
          </ImagePreview>

          <label htmlFor="imgUpload">
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
            id="imgUpload"
            type="file"
            inputProps={{
              accept: "image/*",
              style: { display: "none" },
            }}
            onChange={handleProductImageUpload}
            required
          />
        </Box>
        {console.log("newTopping", newTopping)}
        <StyledButton variant="contained" color="primary" onClick={addTopping}>
          Add Topping
        </StyledButton>
      </FlexRowContainer>
    </>
  );
}
