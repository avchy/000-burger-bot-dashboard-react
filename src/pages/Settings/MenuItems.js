import React, { useState } from 'react';
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
} from '@mui/material';
import NavbarSettings from '../../components/NavbarSettings/';

export function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const [menuItem, setMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    addOns: '',
    photo: '', // Добавлено поле "photo"
  });

  const handleMenuItemChange = (e) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  const addMenuItem = () => {
    setMenuItems([...menuItems, menuItem]);
    setMenuItem({ name: '', description: '', price: '', addOns: '', photo: '' });
  };

  const deleteMenuItem = (index) => {
    const updatedMenuItems = [...menuItems];
    updatedMenuItems.splice(index, 1);
    setMenuItems(updatedMenuItems);
  };

  return (
    <>
      <NavbarSettings />

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Add-ons</TableCell>
              <TableCell>Photo</TableCell> {/* Добавлено поле "Photo" в заголовок таблицы */}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.addOns}</TableCell>
                <TableCell>{item.photo}</TableCell>
                <TableCell>
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
            <TableRow>
              <TableCell>
                <TextField
                  name="name"
                  value={menuItem.name}
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
                <TextField
                  name="addOns"
                  value={menuItem.addOns}
                  onChange={handleMenuItemChange}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="photo" // Добавлено поле "photo"
                  value={menuItem.photo}
                  onChange={handleMenuItemChange}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={addMenuItem}>
                  Add
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}
