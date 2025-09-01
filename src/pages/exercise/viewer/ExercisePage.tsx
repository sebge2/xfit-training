import {Await, useRouteLoaderData} from "react-router-dom";
import {Exercise} from "../../../model/exercise/exercise.ts";
import {Suspense} from "react";
import {ErrorComponent} from "../../../components/core/ErrorComponent.tsx";
import {UserExerciseRecords} from "../../../model/record/user-exercise-records.tsx";
import {ExerciseRecordsSkeleton} from "./ExerciseRecordsSkeleton.tsx";
import {ExerciseRecords} from "./ExerciseRecords.tsx";

export default function ExercisePage() {
    const routeData = useRouteLoaderData('exercise-details') as { exercise: Exercise, records: UserExerciseRecords };

    return <Suspense fallback={<ExerciseRecordsSkeleton exercise={routeData.exercise} records={undefined}/>}>
        <Await resolve={routeData.records} errorElement={<ErrorComponent/>}>
            {(records: UserExerciseRecords) => <ExerciseRecords exercise={routeData.exercise} records={records}/>}
        </Await>
    </Suspense>;
}