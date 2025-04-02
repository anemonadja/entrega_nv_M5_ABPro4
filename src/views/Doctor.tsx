import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Spinner, Card, Container, Row, Col, Button, Alert } from 'react-bootstrap';
import Calendar from 'react-calendar';

// Tipado del doctor basado en la respuesta de tu API
interface Doctor {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
  };
  email: string;
  phone: string;
  cell: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  dob: {
    date: string;
    age: number;
  };
}

const DoctorView: React.FC = () => {
  const location = useLocation();
  const doctor = location.state?.doctor;

  type ValuePiece = Date | null;

    type Value = ValuePiece | [ValuePiece, ValuePiece];

  const [value, onChange] = useState<Value>(new Date());


  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={4}>
          <Card className="shadow-lg">
            <Card.Img
              variant="top"
              src={doctor?.picture.large || 'https://via.placeholder.com/400x300'}
              alt={`Foto de ${doctor?.name.first} ${doctor?.name.last}`}
            />
            <Card.Body>
              <Card.Title className="text-center">
                {doctor?.name.title} {doctor?.name.first} {doctor?.name.last}
              </Card.Title>

              <Card.Subtitle className="mb-2 text-muted text-center">
                Especialidad: Medicina General
              </Card.Subtitle>

              <Card.Text>
                <strong>Email:</strong> {doctor?.email}<br />
                <strong>Teléfono fijo:</strong> {doctor?.phone}<br />
                <strong>Celular:</strong> {doctor?.cell}<br />
                <strong>Género:</strong> {doctor?.gender}<br />
                <strong>Edad:</strong> {doctor?.dob.age} años<br />
              </Card.Text>

              <Card.Text>
                <strong>Dirección:</strong><br />
                {doctor?.location.street.name} {doctor?.location.street.number},<br />
                {doctor?.location.city}, {doctor?.location.state},<br />
                {doctor?.location.country} - CP {doctor?.location.postcode}
              </Card.Text>

              <div className="d-flex justify-content-center">
                <Button variant="secondary" onClick={() => window.history.back()}>
                  Volver al listado
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      <Calendar onChange={onChange} value={value} />

      </Row>


    </Container>
  );
};

export default DoctorView;
