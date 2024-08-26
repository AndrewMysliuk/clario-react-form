import { BrowserRouter } from "react-router-dom"
import AppRouter from "@/app/router/AppRouter"

const App = () => {
  return (
    <BrowserRouter basename="/clario-react-form">
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
