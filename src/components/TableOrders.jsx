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
  Paper,  Typography,

} from '@mui/material'
 import { styled } from '@mui/material/styles'
import { initialState } from '../data/orders.js'

const StyledTableContainer = styled(TableContainer)`
  margin-top: 20px;
`;

const StyledTable = styled(Table)`
  min-width: 650px;   border-collapse: collapse; // Слияние границ ячеек для линий между ними

`;

const StyledTableCell = styled(TableCell)`
  background-color: #f5f5f5; // Цвет фона для ячеек
  font-weight: bold; // Полужирный текст
  border: 1px solid #ddd; // Разделительные линии
  padding: 10px; // Отступы внутри ячейки
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #e0e0e0; // Цвет фона для четных строк
    border: 1px solid #ddd; // Разделительные линии

  }
`;

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

  const dateToTime = (orderDateServer) => {
    const orderDate = new Date(orderDateServer)

    const hours = String(orderDate.getHours()).padStart(2, '0')
    const minutes = String(orderDate.getMinutes()).padStart(2, '0')
    const seconds = String(orderDate.getSeconds()).padStart(2, '0')

    const day = String(orderDate.getDate()).padStart(2, '0')
    const month = String(orderDate.getMonth() + 1).padStart(2, '0') // Месяцы в JavaScript начинаются с 0, поэтому добавляем 1
    const year = orderDate.getFullYear()

    const formattedDate = `${hours}:${minutes}:${seconds}--${day}/${month}/${year}`
    console.log(formattedDate)
    return formattedDate
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
    <Box p={2} sx={{ width: '100%' }}>
      <Typography variant="h4" align="center" mb={2}>
        Orders Dashboard !!!
      </Typography>
      {/* Используем пользовательские стили */}
      <StyledTableContainer component={Paper}>
        <StyledTable aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Query ID</StyledTableCell>
              <StyledTableCell align="center">Comment</StyledTableCell>
              <StyledTableCell align="center">Total Price</StyledTableCell>
              <StyledTableCell align="center">Delivery Option</StyledTableCell>
              <StyledTableCell align="center">Payment Method</StyledTableCell>
              <StyledTableCell align="center">Order Date</StyledTableCell>
              <StyledTableCell align="center">Cart Items</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">User Name</StyledTableCell>
              <StyledTableCell align="center">User ID</StyledTableCell>
            </StyledTableRow>
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
                    <TableCell>{order.queryId || '-'}</TableCell>
                    <TableCell>{order.comment || '-'}</TableCell>
                    <TableCell>{order.totalPrice || '-'}</TableCell>
                    <TableCell>{order.optionDelivery || '-'}</TableCell>
                    <TableCell>{order.paymentMethod || '-'}</TableCell>
                    <TableCell>{dateToTime(order.order_date) || '-'}</TableCell>
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
            </StyledTable>
        </StyledTableContainer>
      </Box>
    </Box>
  )
}
