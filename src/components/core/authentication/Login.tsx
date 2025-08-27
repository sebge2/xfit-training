import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {AUTHENTICATION_SERVICE} from "../../../services/authentication-service.ts";

export function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as { from?: Location })?.from?.pathname ?? "/";

    if (AUTHENTICATION_SERVICE.currentUser) {
        return <Navigate to="/" replace state={{from: location}}/>;
    }

    const signInWithGoogle = async () => {
        try {
            await AUTHENTICATION_SERVICE.login();

            navigate(from, {replace: true});
        } catch (error) {
            console.error('Error signing in with Google', error); // TODO
        }
    };

    return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}