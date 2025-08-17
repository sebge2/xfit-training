import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import ExercisesPage from "./pages/exercise/ExercisesPage.tsx";
import RootLayout from "./pages/RootLayout.tsx";
import WodSearchPage from "./pages/wod/WodSearchPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import WodPage, {sendWod} from "./pages/wod/WodPage.tsx";
import ExercisePage from "./pages/exercise/ExercisePage.tsx";
import WodRunnerPage from "./pages/wod/WodRunnerPage.tsx";
import SettingsPage from "./pages/settings/SettingsPage.tsx";


export default function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout/>,
            errorElement: <ErrorPage/>,
            children: [
                {
                    index: true,
                    element: <Navigate to="/exercises" replace/>
                },
                {
                    path: 'exercises',
                    handle: {pageName: 'Exercises'},
                    children: [
                        {
                            index: true,
                            element: <ExercisesPage/>
                        },
                        {
                            path: ':id',
                            element: <ExercisePage/>
                        },
                    ]
                },
                {
                    path: 'wods',
                    handle: {pageName: 'Workouts'},
                    children: [
                        {
                            index: true,
                            element: <WodSearchPage/>
                        },
                        {
                            path: ':id',
                            children: [
                                {
                                    index: true,
                                    element: <WodPage/>,
                                    action: sendWod
                                },
                                {
                                    path: 'run',
                                    element: <WodRunnerPage/>,
                                }
                            ]
                        },
                    ]
                },
                {
                    path: 'settings',
                    element: <SettingsPage/>,
                    handle: {pageName: 'Settings'},
                },
            ]
        }
    ]);

    return (
        <RouterProvider router={router}/>
    );
}
