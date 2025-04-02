import axios from 'axios';
import { useState } from 'react';
import { Button, Form, Alert, Container, Card, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router";

export const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const { guardarUsuario } = useAuth();
    const navigate = useNavigate();

    const login = async (evento: { preventDefault: () => void; }) => {
        evento.preventDefault();
        setLoading(true);
        setError(false);

        try {
            const respuesta = await axios.post(
                "https://dummyjson.com/auth/login",
                { username, password }
            );
            guardarUsuario(respuesta.data.accessToken);
            navigate("/doctores");
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex vh-100 justify-content-center align-items-center">
            <Card className="shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <Card.Body>
                    <h2 className="text-center mb-3">Bienvenido</h2>
                    <p className="text-center text-muted mb-4">
                        Inicia sesión para ver el listado de doctores disponibles.
                    </p>
                    <Form onSubmit={login}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre de usuario</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingresa tu username"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Tu contraseña"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                            {loading ? (
                                <>
                                    <Spinner animation="border" size="sm" className="me-2" />
                                    Ingresando...
                                </>
                            ) : (
                                "Ingresar"
                            )}
                        </Button>

                        {error && (
                            <Alert variant="danger" className="mt-3 text-center">
                                Credenciales inválidas
                            </Alert>
                        )}
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};
