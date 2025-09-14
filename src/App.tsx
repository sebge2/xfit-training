import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import ExercisesPage from "./pages/exercise/exercises/ExercisesPage.tsx";
import RootLayout from "./pages/RootLayout.tsx";
import WodSearchPage from "./pages/wod/wods/WodSearchPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import WodPage from "./pages/wod/viewer/WodPage.tsx";
import ExercisePage from "./pages/exercise/viewer/ExercisePage.tsx";
import SettingsPage from "./pages/settings/SettingsPage.tsx";
import {WOD_SERVICE} from "./services/wod-service.ts";
import {EXERCISE_SERVICE} from "./services/exercise-service.ts";
import {USER_RECORDS_SERVICE} from "./services/user-records-service.ts";
import {Login} from "./components/core/authentication/Login.tsx";
import {Exercise} from "./model/exercise/exercise.ts";
import {ExerciseMetadataView} from "./pages/exercise/viewer/ExerciseMetadataView.tsx";
import {ExerciseMetadataEditor} from "./pages/exercise/viewer/ExerciseMetadataEditor.tsx";
import {Wod} from "./model/wod/wod.ts";
import {WodMetadataView} from "./pages/wod/viewer/WodMetadataView.tsx";
import {WodMetadataEditor} from "./pages/wod/viewer/WodMetadataEditor.tsx";

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
                                            exercises: EXERCISE_SERVICE.findAllGrouped()
                                        }
                                    },
                                    element: <ExercisesPage/>
                                },
                                {
                                    id: 'exercise-details',
                                    path: ':id',
                                    loader: async ({params}: { params: Params }) => {
                                        const exercise = await EXERCISE_SERVICE.findById(params.id!);
                                        const records = USER_RECORDS_SERVICE.findForCurrentUserAndExercise(params.id!);

                                        return {exercise, records};
                                    },
                                    handle: {
                                        pageName: ({data}: { data: { exercise: Exercise } }) => data?.exercise?.name,
                                    },
                                    element: <ExercisePage/>,
                                    children: [
                                        {
                                            index: true,
                                            element: <ExerciseMetadataView/>
                                        },
                                        {
                                            path: 'edit',
                                            element: <ExerciseMetadataEditor/>
                                        }
                                    ]
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
                                    loader: async ({params}: { params: Params }) => {
                                        return {
                                            wod: await WOD_SERVICE.findById(params.id as string)
                                        }
                                    },
                                    handle: {
                                        pageName: ({data}: { data: { wod: Wod } }) => data?.wod?.name,
                                    },
                                    element: <WodPage/>,
                                    children: [
                                        {
                                            index: true,
                                            element: <WodMetadataView/>,
                                        },
                                        {
                                            path: 'edit',
                                            element: <WodMetadataEditor/>,
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
