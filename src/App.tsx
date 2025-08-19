import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import ExercisesPage from "./pages/exercise/ExercisesPage.tsx";
import RootLayout from "./pages/RootLayout.tsx";
import WodSearchPage from "./pages/wod/WodSearchPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import WodPage, {sendWod} from "./pages/wod/WodPage.tsx";
import ExercisePage from "./pages/exercise/ExercisePage.tsx";
import WodRunnerPage from "./pages/wod/WodRunnerPage.tsx";
import SettingsPage from "./pages/settings/SettingsPage.tsx";
import {WOD_SERVICE} from "./services/wod-service.ts";
import {EXERCISE_SERVICE} from "./services/exercise-service.ts";
import {USER_RECORDS_SERVICE} from "./services/user-records-service.ts";

export type Params<Key extends string = string> = {
    readonly [key in Key]: string | undefined;
};

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
                            loader: () => {
                                return {
                                    exercises: EXERCISE_SERVICE.findAll()
                                }
                            },
                            element: <ExercisesPage/>
                        },
                        {
                            id: 'exercise-details',
                            path: ':id',
                            loader: ({params}: {params: Params}) => {
                                return {
                                    exercise: EXERCISE_SERVICE.findById(params.id as string),
                                    records: USER_RECORDS_SERVICE.findForCurrentUserAndExercise(params.id as string),
                                }
                            },
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
                            loader: () => {
                                return {
                                    wods: WOD_SERVICE.findAll()
                                }
                            },
                            element: <WodSearchPage/>
                        },
                        {
                            id: 'wod-details',
                            path: ':id',
                            loader: ({params}: {params: Params}) => {
                                return {
                                    wod: WOD_SERVICE.findById(params.id as string)
                                }
                            },
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
