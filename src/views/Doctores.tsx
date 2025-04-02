import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const Doctores = () => {

    const [doctores, setDoctores] = useState<Array<{ 
      login: { uuid: string }, 
      picture: { large: string }, 
      name: { title: string, first: string, last: string }, 
      email: string, 
      location: { city: string, timezone: { description: string } } 
    }>>([]);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const obtenerDoctores = async () => {

      try {
        const respuesta = await axios.get('https://randomuser.me/api/?results=10');
        setDoctores(respuesta.data.results);
        setError(false);
      } catch {
        setError(true);
      }

    }

    useEffect(() => {

      obtenerDoctores();
    }, []);

    const navegarDetalleDoctor = (doctor) => {
      navigate('/doctor/' , { state: { doctor } });
    }


  return (
    <section>
      <h1 className='text-center my-3'>Doctores Disponibles</h1>

      <Container className='mb-4'>
      <Button variant="primary" onClick={obtenerDoctores} >Actualizar</Button>

      </Container>

      {
        error == true &&

        (<Alert variant="danger">
          Error al obtener los doctores, intentalo mas tarde
        </Alert>)

      }
      


      <Container>
        <Row lg={3}>
        {doctores.map((doctor) => (
            <Col className='mb-3' key={doctor.login.uuid} style={{ width: "20rem", }}>
            <Image src={doctor.picture.large} rounded className='w-100'/>

            <Card className='border-0' border='d' >
              <Card.Body>
                <Card.Title>{`${doctor.name.title}  ${doctor.name.first}  ${doctor.name.last}`}</Card.Title> 
                <Card.Text>{doctor.email}</Card.Text>
                <Card.Text>{doctor.location.city}</Card.Text>
                <Card.Text>{doctor.location.timezone.description}</Card.Text>
                      <Button onClick={() => navegarDetalleDoctor(doctor)} variant="primary">Ver disponibilidad</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
        </Row>
      </Container>


    </section>
  );
}

export default Doctores