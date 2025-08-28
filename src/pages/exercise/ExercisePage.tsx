import {Await, useRouteLoaderData} from "react-router-dom";
import {Exercise} from "../../model/exercise/exercise.ts";
import {Suspense} from "react";
import {ErrorComponent} from "../../components/core/ErrorComponent.tsx";
import {UserExerciseRecords} from "../../model/record/user-exercise-records.tsx";
import {ActivityTags} from "../../components/core/exercise/ActivityTags.tsx";

export default function ExercisePage() {
    const routeData = useRouteLoaderData('exercise-details') as { exercise: Exercise, records: UserExerciseRecords };

    return <>
        <Suspense fallback={<p>Loading exercise...</p>}>
            <Await resolve={routeData.exercise} errorElement={<ErrorComponent/>}>
                {(exercise: Exercise) => (
                    <>
                        <div>{exercise.name}</div>
                        <div>Unit: {exercise.unit}</div>
                        <div>
                            <ActivityTags tags={exercise.tags} />
                        </div>
                    </>
                )}
            </Await>
        </Suspense>

        <Suspense fallback={<p>Loading records...</p>}>
            <Await resolve={routeData.records} errorElement={<ErrorComponent/>}>
                {(records: UserExerciseRecords) => (
                    <>
                        {records.groupKeys.map(groupKey =>
                            records.groups.get(groupKey)?.records.map(record =>
                            <div>{record.value} at {record.date.toDateString()}</div>
                            )
                        )}
                    </>
                )}
            </Await>
        </Suspense>
    </>;
}