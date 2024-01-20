import {Navigate, Outlet} from "react-router-dom";
import {Navbar} from "../components/Navbar";

export const HomeScreen = () => {
    return (
        <>
            auth.token ? <div>
            <Navbar/>
            <Outlet/>
        </div> : <Navigate to="/login"/>
        </>
    )
}
