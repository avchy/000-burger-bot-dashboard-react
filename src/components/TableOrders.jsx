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
  Paper,
} from '@mui/material'

import { initialState } from '../data/orders.js'

export function TableOrders() {
  const [orders, setOrders] = useState(initialState)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await axios.get('https://burgerim.ru/orders')
      console.log('response.data--->', response.data)
      // Отсортируйте заказы в обратном порядке перед установкой состояния
      setOrders(response.data.reverse())
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const parseCartItems = (cartItems) => {
    try {
      return JSON.parse(cartItems)
    } catch (error) {
      console.error('Error parsing cartItems:', error)
      return []
    }
  }

  // Функция для определения цвета строки на основе времени заказа
  const getRowColor = (orderDate) => {
    const currentTime = new Date()
    const orderTime = new Date(orderDate)
    const timeDifference = (currentTime - orderTime) / (1000 * 60) // Разница в минутах

    if (timeDifference <= 5) {
      return 'lightgreen' // Светло зеленый
    } else if (timeDifference <= 10) {
      return 'lightyellow' // Светло желтый
    } else {
      return 'lightpink' // Светло розовый
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'right', width: '100%' }}>
      <Box p={2} sx={{ width: '100%' }}>
        <h1>Orders Dashboard</h1>
        <TableContainer component={Paper} p={2}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table' p={2}>
            <TableHead>
              <TableRow>
                <TableCell component='th' scope='row'>
                  ID
                </TableCell>
                <TableCell align='right'>Query ID</TableCell>
                <TableCell align='right'>Comment</TableCell>
                <TableCell align='right'>Total Price</TableCell>
                <TableCell align='right'>Delivery Option</TableCell>
                <TableCell align='right'>Payment Method</TableCell>
                <TableCell align='right'>Order Date</TableCell>
                <TableCell align='right'>Cart Items</TableCell>
                <TableCell align='right'>Address</TableCell>
                <TableCell align='right'>User Name</TableCell>
                <TableCell align='right'>User ID</TableCell>
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
                  <TableRow
                    key={order.order_id}
                    style={{ backgroundColor: getRowColor(order.order_date) }}
                  >
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
                              <TableCell>Quantity</TableCell>
                              <TableCell>Description</TableCell>
                              <TableCell>Toppings</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {parseCartItems(order.cartItems).map(
                              (item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.title}</TableCell>
                                  <TableCell>{item.quantity}</TableCell>
                                  <TableCell>
                                    {item.description || '-'}
                                  </TableCell>
                                  <TableCell>
                                    {item?.toppings?.length > 0 ? (
                                      <ul>
                                        {item?.toppings?.map(
                                          (topping, toppingIndex) =>
                                            topping.count > 0 && (
                                              <li key={toppingIndex}>
                                                {topping.title}
                                              </li>
                                            )
                                        )}
                                      </ul>
                                    ) : (
                                      '-'
                                    )}
                                  </TableCell>
                                </TableRow>
                              )
                            )}
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
  )
}
