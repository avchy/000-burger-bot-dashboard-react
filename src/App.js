import './styles/App.scss'
import { TableOrders } from './components/TableOrders'

// const audio = new Audio('icq_sms_sound.mp3')
// function playSound() {
//   audio.play()
// }

function App() {
  return (
    <div className='App'>
      {/* <button onClick={playSound}>Play</button> */}

      <TableOrders />
    </div>
  )
}

export default App
