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
import { baseURL } from "constants/api";

export function Extras() {
  const { user } = useAuth0();
  const [extrasList, setExtrasList] = useState([]);
  const [newExtra, setNewExtra] = useState({
    title: "",
    image: null,
    type: "", // Добавлено новое поле types
  });
  const [logoImage, setLogoImage] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);

  const [typesList, setTypesList] = useState([
    { id: 1, type: "salad" },
    { id: 2, type: "bread" },
  ]);
  // const [typesList, setTypesList] = useState(["Type 1", "Type 2", "Type 3"]);

  const getExtras = async () => {
    const restaurant_id = 2;
    try {
      const response = await axios.get(`${baseURL}/extras/${restaurant_id}`);
      setExtrasList(response.data);
      console.log("getExtras", response.data);
    } catch (error) {
      console.error('Ошибка при выполнении запроса "getExtras":', error);
    }
  };

  const getTypes = async () => {
    const restaurant_id = 2;

    try {
      const response = await axios.get(`${baseURL}/types/` + restaurant_id);
      console.log('getTypes_response.data', response.data)
      setTypesList(response.data);
    } catch (error) {
      console.error('Ошибка при выполнении запроса "getTypes":', error);
    }
  };

  const addExtra = async () => {
    const restaurant_id = 2;

    const data = {
      title: newExtra.title,
      image: logoImage,
      restaurant_id: restaurant_id,
    };

    console.log("newExtra :>> ", data);

    try {
      const response = await axios.post(
        `${baseURL}/extras/`,

        data
      );
      console.log('Запрос "addExtra" успешно выполнен');

      setNewExtra({
        title: "",
        image: null,
      });

      setLogoImage(null);
      getExtras();
      setSuccessAlert(true);

      setTimeout(() => {
        setSuccessAlert(false);
      }, 3000);
    } catch (error) {
      console.error('Ошибка при выполнении запроса "addExtra":', error);
      return;
    }
  };

  const updateExtra = async (index) => {
    const updatedExtra = extrasList[index];
    try {
      await axios.put(
        `${baseURL}/extras/`,

        updatedExtra
      );
      setSuccessAlert(true);

      setTimeout(() => {
        setSuccessAlert(false);
      }, 3000);
      console.log("Экстра успешно обновлена");
      getExtras();
    } catch (error) {
      console.error("Ошибка при обновлении экстры:", error);
    }
  };

  const deleteExtra = async (index) => {
    try {
      const extraIdToDelete = extrasList[index].id;
      await axios.delete(`${baseURL}/extras/${extraIdToDelete}`);

      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
      }, 3000);
      console.log("Экстра успешно удалена");
      getExtras();
    } catch (error) {
      console.error("Ошибка при удалении экстры:", error);
    }
  };

  useEffect(() => {
    getExtras();
    getTypes();
  }, [user.nickname]);

  const handleProductImageUpload = (e) => {
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

    setNewExtra({
      ...newExtra,
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

      {extrasList.length === 0 && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}

      <Paper>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "lightBlue" }}>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell> {/* Заголовок для столбца types */}
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {extrasList.length > 0 &&
              extrasList.map((extra, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      value={extra.title}
                      onChange={(e) => {
                        const updatedList = [...extrasList];
                        updatedList[index].title = e.target.value;
                        setExtrasList(updatedList);
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      select
                      value={extra.type}
                      onChange={(e) => {
                        const updatedList = [...extrasList];
                        updatedList[index].types = e.target.value;
                        setExtrasList(updatedList);
                      }}
                      SelectProps={{
                        native: true,
                      }}
                    >
                      {typesList.map((type) => (
                        <option key={type.id} value={type.type}>
                          {type.type}
                        </option>
                      ))}
                    </TextField>
                  </TableCell>

                  <TableCell>
                    <Box>
                      <ImagePreview>
                        {extra.image ? (
                          <>
                            <img src={extra.image} alt="no_image!" />
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
                          const updatedList = [...extrasList];
                          const file = e.target.files[0];
                          const reader = new FileReader();

                          if (file) {
                            reader.readAsDataURL(file);
                            reader.onloadend = () => {
                              updatedList[index].image = reader.result;
                              setExtrasList(updatedList);
                            };
                          } else {
                            setExtrasList([...extrasList]);
                          }
                        }}
                        required
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <StyledButton
                      variant="contained"
                      color="primary"
                      onClick={() => updateExtra(index)}
                    >
                      Update
                    </StyledButton>
                    <StyledButton
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteExtra(index)}
                    >
                      Delete
                    </StyledButton>
                  </TableCell>
                </TableRow>
              ))}

            <TableRow sx={{ backgroundColor: "lightBlue" }}>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <TextField
                  label="Title"
                  name="title"
                  value={newExtra.title}
                  onChange={handleInputChange}
                  sx={{ m: "10px" }}
                />
              </TableCell>

              <TableCell>
                <TextField
                  select
                  label="Types"
                  name="types"
                  value={newExtra.type}
                  onChange={handleInputChange}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">None</option>
                  {typesList.map((type) => (
                    <option key={type.id} value={type.type}>
                      {type.type}
                    </option>
                  ))}
                </TextField>
              </TableCell>

              <TableCell>
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
              </TableCell>

              <TableCell>
                <StyledButton
                  variant="contained"
                  color="primary"
                  onClick={addExtra}
                >
                  Add Extra
                </StyledButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}
