import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import ExercisesPage from "./pages/ExercisesPage.tsx";
import RootLayout from "./pages/RootLayout.tsx";
import WodPage from "./pages/WodPage.tsx";


export default function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />,
            children: [
                {
                    path: '/',
                    element: <Navigate to="/exercises" replace />
                },
                {
                    path: '/exercises',
                    element: <ExercisesPage/>
                },
                {
                    path: '/wod',
                    element: <WodPage/>
                }
            ]
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
}
