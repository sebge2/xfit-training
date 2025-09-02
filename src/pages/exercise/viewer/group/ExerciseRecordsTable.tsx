import {UserExerciseGroupRecords} from "../../../../model/record/user-exercise-group-records.tsx";

type Props = {
    records: UserExerciseGroupRecords,
};

export function ExerciseRecordsTable({records}: Props) {
    // TODO
    return (
        <div>
            {records.records.length}
        </div>
    );
};