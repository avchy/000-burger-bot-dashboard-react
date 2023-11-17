import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Paper,
  Typography,
} from '@mui/material'

import {
  StyledTableRow,
  StyledTableCell,
  StyledTable,
  StyledTableContainer,
} from '../styles/styledComponents'

import { initialState } from '../data/orders.js'
import AudioPlayer from '../components/AudioPlayer.jsx'

import { useAuth0 } from '@auth0/auth0-react'

export function TableOrders() {
  // const {  isAuthenticated } = useAuth0()
	const isAuthenticated = true;

  const [orders, setOrders] = useState([])
  const [ordersReverse, setOrdersReverse] = useState([])
  // const [orders, setOrders] = useState(initialState)

  const [loading, setLoading] = useState(true)
  const [volumeValueDataReceived, setVolumeValueDataReceived] = useState(0)

  const audio = new Audio('icq_sms_sound.mp3')
  const audioSrc = 'icq_sms_sound.mp3'

  //==================================================

  // Функция для получения данных из сервера
  const fetchData = async () => {
    try {
      const response = await fetch('https://burgerim.ru/orders')
      if (response.ok) {
        const newData = await response.json()
        // Проверка изменения данных
        console.log('newData', newData)
        console.log('orders', orders)
        if (newData.length != orders.length) {
          // if (JSON.stringify(newData) !== JSON.stringify(orders)) {

          console.log('Данные изменились:', newData)
          setOrders(newData)
          setOrdersReverse(newData.reverse())

          setVolumeValueDataReceived(1)
          setTimeout(() => {
            setVolumeValueDataReceived(0)
          }, 3000)
        }
      }
      setLoading(false)
    } catch (error) {
      console.error('Ошибка при запросе данных:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://burgerim.ru/orders')
        if (response.ok) {
          const newData = await response.json()
          setOrders(newData)
          setOrdersReverse(newData.reverse())
        }
        setLoading(false)
      } catch (error) {
        console.error('Ошибка при запросе данных:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    fetchData() // Выполняем запрос сразу
    const interval = setInterval(fetchData, 3000)

    return () => clearInterval(interval) // Очищаем интервал при размонтировании компонента
  }, [orders]) // Зависимость от изменения данных

  const parseCartItems = (cartItems) => {
    try {
      return JSON.parse(cartItems)
    } catch (error) {
      console.error('Error parsing cartItems:', error)
      return []
    }
  }

  const getRowColor = (orderDate) => {
    const currentTime = new Date()
    const orderTime = new Date(orderDate)
    const timeDifference = (currentTime - orderTime) / (1000 * 60)

    if (timeDifference <= 5) {
      return 'lightGreen'
    } else if (timeDifference <= 10) {
      return 'Yellow'
    } else {
      return 'lightPink'
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
    return formattedDate
  }
  return (
    <>
      {isAuthenticated && (
        <>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            <Box p={2} sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h4' align='center' mb={2}>
                  Orders
                </Typography>
                <AudioPlayer
                  volumeValueDataReceived={volumeValueDataReceived}
                />
              </Box>

              <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        backgroundColor: 'lightGreen',
                        width: '200px',
                        height: '20px',
                        marginRight: '5px',
                      }}
                    >
                      менее 5 минут назад
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        backgroundColor: 'Yellow',
                        width: '200px',
                        height: '20px',
                        marginRight: '5px',
                      }}
                    >
                      5-10 минут назад
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        backgroundColor: 'lightPink',
                        width: '200px',
                        height: '20px',
                        marginRight: '5px',
                      }}
                    >
                      более 10 минут назад{' '}
                    </Box>
                  </Box>
                </Box>
              </Box>
              <StyledTableContainer component={Paper}>
                <StyledTable aria-label='simple table'>
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell align='center'>ID</StyledTableCell>
                      {/* <StyledTableCell align='center'>Query ID</StyledTableCell> */}
                      <StyledTableCell align='center'>Comment</StyledTableCell>
                      <StyledTableCell align='center'>
                        Total Price
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        Delivery Option
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        Payment Method
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        Order Date
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        Cart Items
                      </StyledTableCell>
                      <StyledTableCell align='center'>Address</StyledTableCell>
                      <StyledTableCell align='center'>Username</StyledTableCell>
                      <StyledTableCell align='center'>User ID</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell align='center' colSpan={11}>
                          <CircularProgress />
                        </TableCell>
                      </TableRow>
                    ) : orders.length > 0 ? (
                      ordersReverse.map((order) => (
                        <TableRow
                          key={order.order_id}
                          sx={{
                            backgroundColor: getRowColor(order.order_date),
                          }}
                        >
                          <TableCell>{order.order_id}</TableCell>
                          {/* <TableCell>{order.queryId || '-'}</TableCell> */}
                          <TableCell>{order.comment || '-'}</TableCell>
                          <TableCell>{order.totalPrice || '-'}</TableCell>
                          <TableCell>{order.optionDelivery || '-'}</TableCell>
                          <TableCell>{order.paymentMethod || '-'}</TableCell>
                          <TableCell>
                            {dateToTime(order.order_date) || '-'}
                          </TableCell>
                          <TableCell>
                            {order.cartItems &&
                            parseCartItems(order.cartItems).length > 0 ? (
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
        </>
      )}
    </>
  )
}
