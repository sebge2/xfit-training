import {Exercise} from "../../../model/exercise/exercise.ts";
import {UserExerciseRecords} from "../../../model/record/user-exercise-records.tsx";
import {ExerciseRecordsTabs} from "./ExerciseRecordsTabs.tsx";

type ExerciseRecordsProps = {
    exercise: Exercise,
    records: UserExerciseRecords
};

export function ExerciseRecords({exercise, records}: ExerciseRecordsProps) {
    return <ExerciseRecordsTabs exercise={exercise} records={records}>
    <div>test</div>
    </ExerciseRecordsTabs>;
}