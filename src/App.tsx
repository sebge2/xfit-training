import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import RootLayout from "./pages/RootLayout.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import {Login} from "./components/core/authentication/Login.tsx";
import {EXERCISE_ROUTE, EXERCISES_PATH} from "./pages/exercise/exercise-route.tsx";
import {WOD_ROUTE} from "./pages/wod/wod-route.tsx";
import {SETTINGS_ROUTE} from "./pages/settings/settings-route.tsx";

export type Params<Key extends string = string> = {
    readonly [key in Key]: string | undefined;
};

export default function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            errorElement: <ErrorPage/>,
            children: [
                {
                    path: '/',
                    element: <RootLayout/>,
                    children: [
                        {
                            index: true,
                            element: <Navigate to={EXERCISES_PATH} replace/>
                        },
                        EXERCISE_ROUTE,
                        WOD_ROUTE,
                        SETTINGS_ROUTE,
                    ]
                },
                {
                    path: 'login',
                    element: <Login/>
                }
            ]
        }
    ]);

    return (
        <RouterProvider router={router}/>
    );
}
