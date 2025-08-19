import {Await, useRouteLoaderData} from "react-router-dom";
import {Exercise} from "../../model/exercise/exercise.ts";
import {Suspense} from "react";
import {ErrorComponent} from "../../components/core/ErrorComponent.tsx";
import {UserExerciseRecords} from "../../model/record/user-exercise-records.tsx";

export default function ExercisePage() {
    const routeData = useRouteLoaderData('exercise-details') as { exercise: Exercise, records: UserExerciseRecords };

    return <>
        <Suspense fallback={<p>Loading exercise...</p>}>
            <Await resolve={routeData.exercise} errorElement={<ErrorComponent/>}>
                {(exercise: Exercise) => (
                    <>
                        <div>{exercise.name}</div>
                        <div>Unit: {exercise.unit}</div>
                        <div>{exercise.tags.map(tag => ' ' + tag)}</div>
                    </>
                )}
            </Await>
        </Suspense>

        <Suspense fallback={<p>Loading records...</p>}>
            <Await resolve={routeData.records} errorElement={<ErrorComponent/>}>
                {(records: UserExerciseRecords) => (
                    <>
                        <div>{JSON.stringify(records.groups.get(1)?.records[0].value)}</div>
                    </>
                )}
            </Await>
        </Suspense>
    </>;
}