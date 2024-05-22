import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import Home from './pages/Home'
import { MantineProvider } from '@mantine/core'

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
