import {UserExerciseGroupRecords} from "../../../../model/record/user-exercise-group-records.tsx";
import {ExerciseRecordsTable} from "./ExerciseRecordsTable.tsx";
import {ExerciseRecordsEvolution} from "./ExerciseRecordsEvolution.tsx";
import {WeightCalculator} from "../../../../components/activity/WeightCalculator.tsx";
import {MeasureUnit} from "../../../../model/exercise/measure-unit.ts";
import Stack from '@mui/material/Stack';

type Props = {
    records: UserExerciseGroupRecords,
    unit: MeasureUnit,
};

export function ExerciseRecordsGroupView({records, unit}: Props) {
    return <Stack spacing={2}>
        <div>
            <ExerciseRecordsTable records={records} unit={unit}/>
        </div>
        <div>
            <WeightCalculator weight={records.lastRecord()?.value} />
        </div>
        <div>
            <ExerciseRecordsEvolution records={records}/>
        </div>
    </Stack>;
}