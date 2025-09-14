import {RouteObject} from "react-router";
import {EXERCISE_SERVICE} from "../../services/exercise-service.ts";
import ExercisesPage from "./exercises/ExercisesPage.tsx";
import {USER_RECORDS_SERVICE} from "../../services/user-records-service.ts";
import {Exercise} from "../../model/exercise/exercise.ts";
import ExercisePage from "./viewer/ExercisePage.tsx";
import {ExerciseMetadataView} from "./viewer/ExerciseMetadataView.tsx";
import {ExerciseMetadataEditor} from "./viewer/ExerciseMetadataEditor.tsx";
import {Params} from "../../App.tsx";

export const EXERCISES_PATH = '/exercises';;

export const EXERCISE_ROUTE: RouteObject = {
    path: EXERCISES_PATH,
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
};