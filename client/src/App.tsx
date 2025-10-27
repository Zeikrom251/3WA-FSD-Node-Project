import React from "react"
import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import Navigation from "./components/Layout/Navigation"
import "./App.css"

const App: React.FC = () => {
  return (
    <div className='App'>
      <Navigation />
      <Container fluid className='main-content'>
        <Routes>
          <Route path='/' element={<div>Accueil (Todo)</div>} />
          <Route
            path='/furniture'
            element={<div>Gestion des meubles (Todo)</div>}
          />
          <Route
            path='/materials'
            element={<div>Gestion des matériaux (Todo)</div>}
          />
          <Route path='/statistics' element={<div>Statistiques (Todo)</div>} />
          <Route path='/login' element={<div>Connexion (Todo)</div>} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
