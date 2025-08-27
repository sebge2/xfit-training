import {Navigate, useLocation} from "react-router-dom";
import {AUTHENTICATION_SERVICE} from "../../../services/authentication-service.ts";
import {ReactElement} from "react";

export function AuthenticationRequired({children}: { children?: ReactElement | null }) {
    const location = useLocation();

    if (!AUTHENTICATION_SERVICE.currentUser) {
        return <Navigate to="/login" replace state={{from: location}}/>; // TODO extract this to service
    }

    return <>
        {children}
    </>;
}
