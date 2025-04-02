import axios from 'axios';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Usuario {
    id: number;
    email: string;
    username: string;
    role: string;
}

interface AuthContextProps {
    guardarUsuario: (token: string) => void;
    cerrarSesion: () => void;
    usuario: Usuario | undefined;
    cargando: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [usuario, setUsuario] = useState<Usuario | undefined>(undefined);
    const [cargando, setCargando] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const obtenerUsuarioAPI = async () => {
        try {
            const respuesta = await axios.get("https://dummyjson.com/user/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsuario(respuesta.data);
            setError(null); 
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            cerrarSesion();
            setError('Sesión expirada o token inválido');
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        if (token) {
            obtenerUsuarioAPI();
        } else {
            setCargando(false);
        }
    }, [token]);

    const guardarUsuario = (nuevoToken: string) => {
        localStorage.setItem("token", nuevoToken);
        setToken(nuevoToken);
        setCargando(true);
        setError(null);
    };

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUsuario(undefined);
        setCargando(false);
        setError(null);
    };

    return (
        <AuthContext.Provider value={{ guardarUsuario, cerrarSesion, usuario, cargando, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};
