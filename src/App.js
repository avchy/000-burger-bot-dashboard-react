import './styles/App.scss'
import { TableOrders } from './components/TableOrders'

import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import Profile from './components/Profile'
import { useAuth0 } from '@auth0/auth0-react'

function App() {
  const { isLoading, error } = useAuth0()

  
  if (Notification.permission !== "granted") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        // Разрешение получено, можно отправлять уведомления
      }
    });
  }
  
  if (Notification.permission === "granted") {
    const notification = new Notification("Заголовок уведомления", {
      body: "Текст уведомления",
      icon: "путь_к_иконке.png" // необязательно
    });
  
    // Обработчик клика по уведомлению
    notification.onclick = () => {
      // Действие при клике на уведомлении
      
      console.log('Действие при клике на уведомлении-----', )
    };
  }
  
  
  if (Notification.permission === "denied") {
    // Пользователь запретил уведомления
    console.log("Пользователь запретил уведомления")
  } else if (Notification.permission === "default") {
    // Пользователь еще не принял решение
  }
  
  
  return (
    <main className='column'>
      <h1>Auth0 Login</h1>
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          <LoginButton />
          <LogoutButton />
          <Profile />

          <TableOrders />
        </>
      )}
    </main>
  )
}

export default App
