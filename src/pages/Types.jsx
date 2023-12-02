import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  LinearProgress,
  Box,
} from "@mui/material";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { baseURL } from "constants/api";
import { FlexRowContainer, StyledButton } from "components/AllHelpComponents";

export function Types() {
  const { user } = useAuth0();
  const [typesList, setTypesList] = useState([]);
  const [successAlert, setSuccessAlert] = useState(false);

  const [type, setType] = useState("");
  const restaurant_id = 2;

  const getTypes = async () => {
    try {
      const response = await axios.get(`${baseURL}/types/` + restaurant_id);
      setTypesList(response.data);
    } catch (error) {
      console.error('Ошибка при выполнении запроса "getTypes":', error);
    }
  };

  const addType = async () => {
    const data = {
      type: type,
      restaurant_id: restaurant_id,
    };

    try {
      await axios.post(`${baseURL}/types/`, data);
      setType("");
      getTypes();
      setSuccessAlert(true);

      setTimeout(() => {
        setSuccessAlert(false);
      }, 3000);
    } catch (error) {
      console.error('Ошибка при выполнении запроса "addType":', error);
    }
  };

  const updateType = async (id, updatedType) => {
    const data = {
      id: id,
      type: updatedType.type,
      restaurant_id: restaurant_id,
    };
    console.log("data :>> ", data);
    try {
      await axios.put(`${baseURL}/types/`, data);
      setSuccessAlert(true);

      setTimeout(() => {
        setSuccessAlert(false);
      }, 3000);
      getTypes();
    } catch (error) {
      console.error("Ошибка при обновлении типа:", error);
    }
  };

  const deleteType = async (id) => {
    try {
      await axios.delete(`${baseURL}/types/${id}`);

      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
      }, 3000);
      getTypes();
    } catch (error) {
      console.error("Ошибка при удалении типа:", error);
    }
  };

  useEffect(() => {
    getTypes();
  }, [user.nickname, restaurant_id]);

  const handleInputChange = (event) => {
    setType(event.target.value);
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

      {typesList.length === 0 && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}

      <Paper>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "lightBlue" }}>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {typesList.map((type) => (
              <TableRow key={type.id}>
                <TableCell>
                  <TextField
                    value={type.type}
                    onChange={(e) => {
                      const updatedList = typesList.map((item) =>
                        item.id === type.id
                          ? { ...item, type: e.target.value }
                          : item
                      );
                      setTypesList(updatedList);
                    }}
                  />
                </TableCell>

                <TableCell>
                  <StyledButton
                    variant="contained"
                    color="primary"
                    onClick={() => updateType(type.id, type)}
                  >
                    Update
                  </StyledButton>
                  <StyledButton
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteType(type.id)}
                  >
                    Delete
                  </StyledButton>
                </TableCell>
              </TableRow>
            ))}

            <TableRow sx={{ backgroundColor: "lightBlue" }}>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <TextField
                  label="Type"
                  name="type"
                  value={type}
                  onChange={handleInputChange}
                  sx={{ m: "10px" }}
                />
              </TableCell>

              <TableCell>
                <StyledButton
                  variant="contained"
                  color="primary"
                  onClick={addType}
                >
                  Add Type
                </StyledButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}
