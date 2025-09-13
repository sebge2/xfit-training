import {Await, useRouteLoaderData} from "react-router-dom";
import {Exercise} from "../../../model/exercise/exercise.ts";
import {Suspense} from "react";
import {ErrorComponent} from "../../../components/core/ErrorComponent.tsx";
import {UserExerciseRecords} from "../../../model/record/user-exercise-records.tsx";
import {ExerciseSkeletonPage} from "./ExerciseSkeletonPage.tsx";
import {ExerciseLoadedPage} from "./ExerciseLoadedPage.tsx";

export default function ExercisePage() {
    const routeData = useRouteLoaderData('exercise-details') as { exercise: Exercise, records: UserExerciseRecords };

    return <Suspense fallback={<ExerciseSkeletonPage/>}>
        <Await resolve={routeData.records} errorElement={<ErrorComponent/>}>
            {(records: UserExerciseRecords) => <ExerciseLoadedPage exercise={routeData.exercise} records={records}/>}
        </Await>
    </Suspense>;
}