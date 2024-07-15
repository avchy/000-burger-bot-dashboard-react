import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  LinearProgress,
  Box,
} from "@mui/material";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { baseURL } from "constants/api";
import {  StyledButton } from "styles/styledComponents";

export function Groups() {
  const { user } = useAuth0();
  const [groupsList, setGroupsList] = useState([]);
  const [successAlert, setSuccessAlert] = useState(false);

  const [name, setName] = useState("");
  const restaurant_id = 2;

  const getGroups = async () => {
    try {
      const response = await axios.get(`${baseURL}/groups/` + restaurant_id);
      setGroupsList(response.data);
    } catch (error) {
      console.error('Ошибка при выполнении запроса "getGroups":', error);
    }
  };

  const addGroup = async () => {
    const data = {
      name: name,
      restaurant_id: restaurant_id,
    };

    try {
      await axios.post(`${baseURL}/groups/`, data);
      setName("");
      getGroups();
      setSuccessAlert(true);

      setTimeout(() => {
        setSuccessAlert(false);
      }, 3000);
    } catch (error) {
      console.error('Ошибка при выполнении запроса "addGroup":', error);
    }
  };

  const updateGroup = async (id, updatedGroup) => {
    const data = {
      id: id,
      name: updatedGroup.name,
      restaurant_id: restaurant_id,
    };
    console.log("data :>> ", data);
    try {
      await axios.put(`${baseURL}/groups/`, data);
      setSuccessAlert(true);

      setTimeout(() => {
        setSuccessAlert(false);
      }, 3000);
      getGroups();
    } catch (error) {
      console.error("Ошибка при обновлении типа:", error);
    }
  };

  const deleteGroup = async (id) => {
    try {
      await axios.delete(`${baseURL}/groups/${id}`);

      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
      }, 3000);
      getGroups();
    } catch (error) {
      console.error("Ошибка при удалении типа:", error);
    }
  };

  useEffect(() => {
    getGroups();
  }, [user.nickname, restaurant_id]);

  const handleInputChange = (event) => {
    setName(event.target.value);
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

      {groupsList.length === 0 && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}

      <Paper>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "lightBlue" }}>
              <TableCell>Group</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupsList.map((group) => (
              <TableRow key={group.id}>
                <TableCell>
                  <TextField
                    value={group.name}
                    onChange={(e) => {
                      const updatedList = groupsList.map((item) =>
                        item.id === group.id
                          ? { ...item, name: e.target.value }
                          : item
                      );
                      setGroupsList(updatedList);
                    }}
                  />
                </TableCell>

                <TableCell>
                  <StyledButton
                    variant="contained"
                    color="primary"
                    onClick={() => updateGroup(group.id, group)}
                  >
                    Update
                  </StyledButton>
                  <StyledButton
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteGroup(group.id)}
                  >
                    Delete
                  </StyledButton>
                </TableCell>
              </TableRow>
            ))}

            <TableRow sx={{ backgroundColor: "lightBlue" }}>
              <TableCell>Group</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <TextField
                  label="Group Name"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                  sx={{ m: "10px" }}
                />
              </TableCell>

              <TableCell>
                <StyledButton
                  variant="contained"
                  color="primary"
                  onClick={addGroup}
                >
                  Add Group
                </StyledButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}
