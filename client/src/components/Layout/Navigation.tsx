import React from "react"
import { Navbar, Nav, Container } from "react-bootstrap"
import { Link } from "react-router-dom"

const Navigation: React.FC = () => {
  return (
    <Navbar expand='lg' className='navbar-custom' variant='dark'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          <i className='fas fa-chair me-2'></i>
          Furniture Management
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link as={Link} to='/'>
              <i className='fas fa-home me-1'></i>
              Accueil
            </Nav.Link>
            <Nav.Link as={Link} to='/furniture'>
              <i className='fas fa-couch me-1'></i>
              Meubles
            </Nav.Link>
            <Nav.Link as={Link} to='/materials'>
              <i className='fas fa-hammer me-1'></i>
              Matériaux
            </Nav.Link>
            <Nav.Link as={Link} to='/statistics'>
              <i className='fas fa-chart-bar me-1'></i>
              Statistiques
            </Nav.Link>
            <Nav.Link as={Link} to='/login'>
              <i className='fas fa-sign-in-alt me-1'></i>
              Connexion
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
