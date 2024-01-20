import {Navigate, Outlet} from "react-router-dom";
import {Navbar} from "../components/Navbar";

export const HomeScreen = () => {
    const token = localStorage.getItem("token")
    return (
        token ? <div>
            <Navbar/>
            <Outlet/>
            </div>
            : <Navigate to="/login"/>
    )
}
