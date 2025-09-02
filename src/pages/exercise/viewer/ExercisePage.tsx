import {Await, useRouteLoaderData} from "react-router-dom";
import {Exercise} from "../../../model/exercise/exercise.ts";
import {Suspense} from "react";
import {ErrorComponent} from "../../../components/core/ErrorComponent.tsx";
import {UserExerciseRecords} from "../../../model/record/user-exercise-records.tsx";
import {ExerciseSkeletonView} from "./ExerciseSkeletonView.tsx";
import {ExerciseView} from "./ExerciseView.tsx";

export default function ExercisePage() {
    const routeData = useRouteLoaderData('exercise-details') as { exercise: Exercise, records: UserExerciseRecords };

    return <Suspense fallback={<ExerciseSkeletonView exercise={routeData.exercise}/>}>
        <Await resolve={routeData.records} errorElement={<ErrorComponent/>}>
            {(records: UserExerciseRecords) => <ExerciseView exercise={routeData.exercise} records={records}/>}
        </Await>
    </Suspense>;
}