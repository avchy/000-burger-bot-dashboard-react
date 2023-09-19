import { useState, useEffect } from 'react'
// import { Link } from './Link'
// import { Link } from "react-router-dom";

import { Spinner } from './Spinner'
// import { Link, Spinner } from 'components';

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
} from '@mui/material'

import { initialState } from '../data/orders.js'


const axios = require('axios');

export function TableOrders() {
  const [orders, setOrders] = useState(initialState)

  useEffect(() => {

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://burgerim.ru/orders',
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      setOrders(response.data);
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
      }, [])

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'right',
          width: '100%',
        }}
      >
        <Box
          p={2}
          sx={{
            width: '100%',
          }}
        >
          <h1>Orders Dashboard</h1>
          {/* <Link href='/orders/add'>
            <Button variant='contained' color='success'>
              Add Order
            </Button>
          </Link> */}

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
                {orders ? (
                  orders.map((order) => (
                    <TableRow key={order.order_id}>
                      <TableCell>{order.order_id}</TableCell>
                      <TableCell>{order.queryId}</TableCell>
                      <TableCell>{order.comment}</TableCell>
                      <TableCell>{order.totalPrice}</TableCell>
                      <TableCell>{order.optionDelivery}</TableCell>
                      <TableCell>{order.paymentMethod}</TableCell>
                      <TableCell>{order.order_date}</TableCell>
                      <TableCell>{order.cartItems}</TableCell>
                      <TableCell>{order.address}</TableCell>
                      <TableCell>{order.user_name}</TableCell>
                      <TableCell>{order.user_id}</TableCell>

                      <TableCell style={{ whiteSpace: 'nowrap' }}>
                        {/* <Link href={`/orders/edit/${order.order_id}`}>
                          <Button variant='contained' color='primary'>
                            Edit
                          </Button>
                        </Link> */}

                        {/* Добавьте обработчик удаления заказа, если необходимо */}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan='11'>
                      <Spinner />
                    </TableCell>
                  </TableRow>
                )}
                {orders && !orders.length && (
                  <TableRow>
                    <TableCell colSpan='11' align='center'>
                      <Box p={2}>No Orders To Display</Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* <Sidebar /> */}
      </Box>
    </>
  )
}
