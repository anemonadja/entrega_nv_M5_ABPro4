import { useAuth } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "react-bootstrap";


interface ProtectedRouteProps {
    rolRequerido?: string;
}

export const ProtectedRoute = ({ rolRequerido }: ProtectedRouteProps) => {


    const { usuario, cargando } = useAuth();

    if (cargando === true) {
        return <Spinner animation="grow" variant="info" />
    }


    if ( !usuario ) {
        console.log('usuario no logueado: ', usuario)
        return <Navigate to='/login'/>;
    }

    if ( rolRequerido  &&  usuario.role !== rolRequerido ) {
        return <Navigate to='/'/>;
    }



    return <Outlet/>


}
