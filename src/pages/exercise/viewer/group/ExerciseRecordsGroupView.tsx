import {UserExerciseGroupRecords} from "../../../../model/record/user-exercise-group-records.tsx";
import {ExerciseRecordsTable} from "./ExerciseRecordsTable.tsx";
import {ExerciseRecordsEvolution} from "./ExerciseRecordsEvolution.tsx";
import {WeightCalculator} from "../../../../components/activity/WeightCalculator.tsx";
import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";
import {Exercise} from "../../../../model/exercise/exercise.ts";
import {MeasureUnit} from "../../../../model/exercise/measure-unit.ts";
import {useState} from "react";

type Props = {
    records: UserExerciseGroupRecords,
    exercise: Exercise,
};

export function ExerciseRecordsGroupView({records: originalGroupRecords, exercise}: Props) {
    const [groupRecords, setGroupRecords] = useState(originalGroupRecords);

    return <Stack spacing={2}>
        <div>
            <ExerciseRecordsTable groupRecords={groupRecords}
                                  exercise={exercise}
                                  onChange={(records) => setGroupRecords(records)}/>
        </div>
        {(!!groupRecords.lastRecord()) && (exercise.unit === MeasureUnit.KILOGRAMS) && <Box>
            <h3>Compute % of KG</h3>

            <WeightCalculator weight={groupRecords.lastRecord()?.value || 0}/>
        </Box>}
        {(groupRecords.records.length > 0) && <Box>
            <h3>Evolution</h3>

            <ExerciseRecordsEvolution records={groupRecords} unit={exercise.unit}/>
        </Box>}
    </Stack>;
}