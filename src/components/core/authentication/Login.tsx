import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {AUTHENTICATION_SERVICE} from "../../../services/authentication-service.ts";
import {AppProvider} from '@toolpad/core/AppProvider';
import {SignInPage} from '@toolpad/core/SignInPage';
import {THEME_SERVICE} from "../../../services/theme-service.ts";
import {AuthResponse} from "@toolpad/core";

export function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as { from?: Location })?.from?.pathname ?? "/";

    if (AUTHENTICATION_SERVICE.currentUser) {
        return <Navigate to="/" replace state={{from: location}}/>;
    }

    const signInWithGoogle = async (): Promise<AuthResponse> => {
        try {
            await AUTHENTICATION_SERVICE.login();

            navigate(from, {replace: true});

            return {success: ''} as AuthResponse;
        } catch (error) {
            console.error('Error signing in with Google.', error);

            return {error: 'Error signing in with Google.'} as AuthResponse;
        }
    };

    const providers = [
        {id: 'google', name: 'Google'},
    ];

    return <AppProvider theme={THEME_SERVICE.theme}>
        <SignInPage signIn={signInWithGoogle} providers={providers}
                    localeText={{
                        signInTitle: () => `Welcome to Xfit Training App`,
                        signInSubtitle: 'Please login to access the application.',
                    }}
        />
    </AppProvider>
}