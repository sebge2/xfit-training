import {UserExerciseGroupRecords} from "../../../../model/record/user-exercise-group-records.tsx";

type Props = {
    records: UserExerciseGroupRecords,
};

export function ExerciseRecordsEvolution({records}: Props) {
    return <div style={{display: 'none'}}>
        {records.records.length}
    </div>; // TODO
};