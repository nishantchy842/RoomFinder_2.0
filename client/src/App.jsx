import './App.css'
import CustomSnackbar from './Component/alert/SnakeBar'
import ConditionalRoutes from './Routes/ConditionalRoutes'

function App() {

  return (
    <>
        <ConditionalRoutes />
        <CustomSnackbar />
    </>
  )
}

export default App
