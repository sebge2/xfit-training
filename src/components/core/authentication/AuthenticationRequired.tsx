import {Navigate, Outlet, useLocation} from "react-router-dom";
import {AUTHENTICATION_SERVICE} from "../../../services/authentication-service.ts";

export function AuthenticationRequired() {
    const location = useLocation();

    if (!AUTHENTICATION_SERVICE.currentUser) {
        return <Navigate to="/login" replace state={{from: location}}/>;
    }

    return <>
        <Outlet/>
    </>;
}
