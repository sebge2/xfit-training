import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import ExercisesPage from "./pages/exercise/ExercisesPage.tsx";
import RootLayout from "./pages/RootLayout.tsx";
import WodSearchPage from "./pages/wod/WodSearchPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import WodPage from "./pages/wod/WodPage.tsx";
import ExercisePage from "./pages/exercise/ExercisePage.tsx";
import WodRunner from "./pages/wod/WodRunner.tsx";


export default function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: '',
                    element: <Navigate to="/exercises" replace />
                },
                {
                    path: 'exercises',
                    element: <ExercisesPage/>
                },
                {
                    path: 'exercises/:id',
                    element: <ExercisePage/>
                },
                {
                    path: 'wod',
                    element: <WodSearchPage/>
                },
                {
                    path: 'wod/:id',
                    children: [
                        {
                            path: '',
                            element: <WodPage />,
                        },
                        {
                            path: 'run',
                            element: <WodRunner />,
                        }
                    ]
                }
            ]
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
}
