import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
} from '@mui/material';

import { initialState } from '../data/orders.js';

export function TableOrders() {
  const [orders, setOrders] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://burgerim.ru/orders');
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const parseCartItems = (cartItems) => {
    try {
      return JSON.parse(cartItems);
    } catch (error) {
      console.error('Error parsing cartItems:', error);
      return [];
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'right', width: '100%' }}>
      <Box p={2} sx={{ width: '100%' }}>
        <h1>Orders Dashboard</h1>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Query ID</TableCell>
                <TableCell>Comment</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Delivery Option</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Cart Items</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>User ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={11}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow key={order.order_id}>
                    <TableCell>{order.order_id}</TableCell>
                    <TableCell>{order.queryId || ''}</TableCell>
                    <TableCell>{order.comment || ''}</TableCell>
                    <TableCell>{order.totalPrice || ''}</TableCell>
                    <TableCell>{order.optionDelivery || ''}</TableCell>
                    <TableCell>{order.paymentMethod || ''}</TableCell>
                    <TableCell>{order.order_date || ''}</TableCell>
                    <TableCell>
                      {order.cartItems && order.cartItems.length > 0 ? (
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Title</TableCell>
                              <TableCell>Price</TableCell>
                              <TableCell>Quantity</TableCell>
                              <TableCell>Description</TableCell>
                              <TableCell>Toppings</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {console.log('parseCartItems(order.cartItems)', parseCartItems(order.cartItems))}
                            {parseCartItems(order.cartItems).map((item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.description || '-'}</TableCell>
                                <TableCell>
                                  {item?.toppings?.length > 0 ? (
                                    <ul>
                                      {item.toppings.map((topping, toppingIndex) => (
                                        <li key={toppingIndex}>{topping}</li>
                                      ))}
                                    </ul>
                                  ) : (
                                    '-'
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        'No items'
                      )}
                    </TableCell>
                    <TableCell>{order.address || ''}</TableCell>
                    <TableCell>{order.user_name || ''}</TableCell>
                    <TableCell>{order.user_id || ''}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={11} align='center'>
                    <Box p={2}>No Orders To Display</Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
