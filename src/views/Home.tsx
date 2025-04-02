import { useEffect, useState } from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [doctores, setDoctores] = useState<Array<{ 
    login: { uuid: string }, 
    picture: { large: string }, 
    name: { title: string, first: string, last: string }, 
    email: string, 
    location: { city: string, timezone: { description: string } } 
  }>>([]);

  useEffect(() => {
    const obtenerDoctores = async () => {
      try {
        const respuesta = await axios.get('https://randomuser.me/api/?results=3');
        setDoctores(respuesta.data.results);
      } catch (error) {
        console.error("Error obteniendo doctores:", error);
      }
    };

    obtenerDoctores();
  }, []);

  return (
    <>
      <div className="hero d-flex flex-column justify-content-center align-items-center text-white text-center back bg-primary bg-gradient">
        <h1 className="display-4 fw-bold">Encuentra a los mejores doctores</h1>
        <p className="fs-5">Atención médica de calidad a un clic de distancia</p>
        <Button as={Link} to="/doctores" variant="light" className="mt-3">Ver Doctores</Button>
      </div>

      <Container className="py-5 text-center">
        <h2>¿Cómo funciona?</h2>
        <p className="text-muted">
          Nuestra plataforma te permite encontrar especialistas en salud de manera rápida y sencilla.
          Puedes explorar perfiles de médicos, leer reseñas y agendar citas en línea.
        </p>
      </Container>

      <Container className="py-5 mx-auto">
        <h2 className="text-center mb-4">Especialidades Médicas</h2>
        <Row className="justify-content-center">
          {["Cardiología", "Pediatría", "Dermatología", "Neurología", "Ginecología"].map((especialidad, index) => (
            <Col key={index} md={4} lg={2} className="mb-3">
              <Card as={Link} to="/doctores" className="text-center shadow-sm bg-primary bg-gradient">
                <Card.Body>
                  <Card.Title className="text-white text-decoration-none">{especialidad}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="py-5 text-center">
        <h2>Top 3 Doctores de la Semana</h2>
        <Row className="justify-content-center">
          {doctores.map((doctor) => (
            <Col key={doctor.login.uuid} md={4} className="mb-3">
              <Card className="text-center shadow-sm">
                <Card.Img variant="top" src={doctor.picture.large} alt={doctor.name.first} />
                <Card.Body>
                  <Card.Title>{doctor.name.title} {doctor.name.first} {doctor.name.last}</Card.Title>
                  <Card.Text>{doctor.location.city}, {doctor.location.timezone.description}</Card.Text>
                  <Button as={Link} to="/doctores" variant="primary">Ver Perfil</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <footer className="text-center text-white py-3 bg-dark">
        <p className="mb-0">© 2025 SaludApp | Todos los derechos reservados</p>
      </footer>

      <style>{`
        .hero {
          background-size: cover;
          min-height: 50vh;
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Home;
