import { FC } from "react"
import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import Navigation from "./components/Layout/Navigation"
import "./App.css"
import Login from "./views/Login"
import Home from "./views/Home"

const App: FC = () => {
  return (
    <div className='App'>
      <Navigation />
      <Container fluid className='main-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/furniture'
            element={<div>Gestion des meubles (Todo)</div>}
          />
          <Route
            path='/materials'
            element={<div>Gestion des matériaux (Todo)</div>}
          />
          <Route path='/statistics' element={<div>Statistiques (Todo)</div>} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
