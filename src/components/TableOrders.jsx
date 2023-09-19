import React, { useState, useEffect } from 'react'
import axios from 'axios'
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

export function TableOrders() {
  const [orders, setOrders] = useState(initialState)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await axios.get('https://burgerim.ru/orders')
      setOrders(response.data)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'right', width: '100%' }}>
      <Box p={2} sx={{ width: '100%' }}>
        <h1>Orders Dashboard</h1>
        {/* Добавьте ссылку для добавления заказа, если необходимо */}
        {/* <Link to="/orders/add">
          <Button variant="contained" color="success">
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
                {/* Добавьте заголовок для действий, если необходимо */}
                {/* <TableCell>Actions</TableCell> */}
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
                    <TableCell>{order.cartItems || ''}</TableCell>
                    <TableCell>{order.address || ''}</TableCell>
                    <TableCell>{order.user_name || ''}</TableCell>
                    <TableCell>{order.user_id || ''}</TableCell>
                    {/* Добавьте действия для редактирования и удаления заказа, если необходимо */}
                    {/* <TableCell>
                      <Link to={`/orders/edit/${order.order_id}`}>
                        <Button variant="contained" color="primary">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(order.order_id)}
                      >
                        Delete
                      </Button>
                    </TableCell> */}
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
  )
}
