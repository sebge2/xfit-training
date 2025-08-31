import {Await, useRouteLoaderData} from "react-router-dom";
import {Exercise} from "../../../model/exercise/exercise.ts";
import {Suspense} from "react";
import {ErrorComponent} from "../../../components/core/ErrorComponent.tsx";
import {UserExerciseRecords} from "../../../model/record/user-exercise-records.tsx";
import {ActivityTags} from "../../../components/core/exercise/ActivityTags.tsx";
import {MAIN_CATEGORY_LABELS} from "../../../model/exercise/main-category.ts";
import {SUB_CATEGORY_LABELS} from "../../../model/exercise/sub-category.ts";

export default function ExercisePage() {
    const routeData = useRouteLoaderData('exercise-details') as { exercise: Exercise, records: UserExerciseRecords };

    return <>
        <Suspense fallback={<p>Loading exercise...</p>}>
            <Await resolve={routeData.exercise} errorElement={<ErrorComponent/>}>
                {(exercise: Exercise) => (
                    <>
                        <div>{exercise.name}</div>
                        <div>Unit: {exercise.unit}
                            {/*<MeasureUnitSelector originalValue={exercise.unit} id="measure-unit" />*/}
                        </div>
                        <div>Location: {MAIN_CATEGORY_LABELS[exercise.category]} &gt; {SUB_CATEGORY_LABELS[exercise.subCategory]}
                            {/*<CategorySelector originalValue={exercise.subCategory} />*/}
                        </div>
                        <div>
                            <ActivityTags tags={exercise.tags}/>
                        </div>
                        <div>Comment: {exercise.comment}</div>
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