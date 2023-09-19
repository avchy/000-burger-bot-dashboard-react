import { useEffect, useState } from 'react'
import './App.scss'
import { TableOrders } from './components/TableOrders'

function App() {
    // const [usersArray, setUsersArray] = useState(initialState)

    useEffect(() => {
        console.log('render App')
    }, [])
    return (
        <div className='App'>
            <h1> Burger Dashboard</h1>


             <TableOrders  />
             {/* <TableOrders usersArray={usersArray} /> */}
        </div>
    )
}

export default App
