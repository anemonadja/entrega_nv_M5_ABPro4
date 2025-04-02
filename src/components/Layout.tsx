import { Outlet } from "react-router-dom";
import NavbarComponent from "./Navbar";

const Layout = () => {
    return (
        <>
            <NavbarComponent />
            <div>
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
