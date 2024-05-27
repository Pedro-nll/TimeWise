import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import { MantineProvider } from '@mantine/core'

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
