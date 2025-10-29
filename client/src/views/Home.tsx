import React from "react"
import { Container, Row, Col, Card, Button } from "react-bootstrap"

const Home: React.FC = () => {
  return (
    <div>
      {/* Section Hero */}
      <div className='hero-section text-center'>
        <Container>
          <h1 className='display-4 mb-4'>
            <i className='fas fa-chair me-3'></i>
            Furniture Management
          </h1>
          <p className='lead mb-4'>
            Application de gestion des meubles pour designer artisan
          </p>
          <p className='mb-0'>
            Gérez vos créations, matériaux et fournisseurs en toute simplicité
          </p>
        </Container>
      </div>

      <Container>
        {/* Section Statistiques */}
        <Row className='mb-5'>
          <Col md={3} className='mb-4'>
            <div className='stats-card'>
              <div className='stats-icon'>
                <i className='fas fa-couch'></i>
              </div>
              <div className='stats-number'>0</div>
              <div className='stats-label'>Meubles créés</div>
            </div>
          </Col>
          <Col md={3} className='mb-4'>
            <div className='stats-card'>
              <div className='stats-icon'>
                <i className='fas fa-hammer'></i>
              </div>
              <div className='stats-number'>7</div>
              <div className='stats-label'>Matériaux disponibles</div>
            </div>
          </Col>
          <Col md={3} className='mb-4'>
            <div className='stats-card'>
              <div className='stats-icon'>
                <i className='fas fa-truck'></i>
              </div>
              <div className='stats-number'>3</div>
              <div className='stats-label'>Fournisseurs</div>
            </div>
          </Col>
          <Col md={3} className='mb-4'>
            <div className='stats-card'>
              <div className='stats-icon'>
                <i className='fas fa-tags'></i>
              </div>
              <div className='stats-number'>2</div>
              <div className='stats-label'>Catégories</div>
            </div>
          </Col>
        </Row>

        {/* Section Actions rapides */}
        <Row className='mb-5'>
          <Col md={6} className='mb-4'>
            <Card className='card-custom h-100'>
              <Card.Body className='text-center p-4'>
                <i
                  className='fas fa-plus-circle text-primary mb-3'
                  style={{ fontSize: "3rem" }}></i>
                <Card.Title>Créer un nouveau meuble</Card.Title>
                <Card.Text>
                  Ajoutez un nouveau meuble à votre collection avec ses
                  matériaux et spécifications.
                </Card.Text>
                <Button className='btn-primary-custom'>
                  <i className='fas fa-plus me-2'></i>
                  Nouveau meuble
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className='mb-4'>
            <Card className='card-custom h-100'>
              <Card.Body className='text-center p-4'>
                <i
                  className='fas fa-chart-line text-success mb-3'
                  style={{ fontSize: "3rem" }}></i>
                <Card.Title>Voir les statistiques</Card.Title>
                <Card.Text>
                  Consultez les statistiques de vos créations et l'utilisation
                  des matériaux.
                </Card.Text>
                <Button variant='success' className='rounded-pill px-4'>
                  <i className='fas fa-chart-bar me-2'></i>
                  Statistiques
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Section Informations */}
        <Row>
          <Col md={4} className='mb-4'>
            <Card className='card-custom'>
              <Card.Body>
                <Card.Title>
                  <i className='fas fa-layer-group text-warning me-2'></i>
                  Matériaux
                </Card.Title>
                <ul className='list-unstyled mb-0'>
                  <li>
                    <strong>Bois :</strong> Frêne, Chêne, Noyer
                  </li>
                  <li>
                    <strong>Fer :</strong> Acier inox, Aluminum
                  </li>
                  <li>
                    <strong>Plastique</strong>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className='mb-4'>
            <Card className='card-custom'>
              <Card.Body>
                <Card.Title>
                  <i className='fas fa-store text-info me-2'></i>
                  Fournisseurs
                </Card.Title>
                <ul className='list-unstyled mb-0'>
                  <li>
                    <i className='fas fa-tree me-2'></i>BBois (Bois)
                  </li>
                  <li>
                    <i className='fas fa-industry me-2'></i>MetaLo (Métaux)
                  </li>
                  <li>
                    <i className='fas fa-recycle me-2'></i>pPlastique
                    (Plastique)
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className='mb-4'>
            <Card className='card-custom'>
              <Card.Body>
                <Card.Title>
                  <i className='fas fa-th-list text-danger me-2'></i>
                  Catégories
                </Card.Title>
                <ul className='list-unstyled mb-0'>
                  <li>
                    <i className='fas fa-door-open me-2'></i>Armoires
                  </li>
                  <li>
                    <i className='fas fa-align-justify me-2'></i>Étagères
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home
