import {Exercise} from "../../../model/exercise/exercise.ts";
import {UserExerciseRecords} from "../../../model/record/user-exercise-records.tsx";
import {ExerciseRecordsTabs} from "./ExerciseRecordsTabs.tsx";

type ExerciseRecordsSkeletonProps = {
    exercise: Exercise,
    records: UserExerciseRecords | undefined,
};

export function ExerciseRecordsSkeleton({exercise, records}: ExerciseRecordsSkeletonProps) {
    return <ExerciseRecordsTabs exercise={exercise} records={records}>
        <div>test</div>
    </ExerciseRecordsTabs>;
}