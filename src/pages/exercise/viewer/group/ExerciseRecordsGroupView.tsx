import {UserExerciseGroupRecords} from "../../../../model/record/user-exercise-group-records.tsx";
import {ExerciseRecordsTable} from "./ExerciseRecordsTable.tsx";
import {ExerciseRecordsEvolution} from "./ExerciseRecordsEvolution.tsx";
import {WeightCalculator} from "../../../../components/activity/WeightCalculator.tsx";
import {MeasureUnit} from "../../../../model/exercise/measure-unit.ts";
import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";

type Props = {
    records: UserExerciseGroupRecords,
    unit: MeasureUnit,
};

export function ExerciseRecordsGroupView({records, unit}: Props) {
    return <Stack spacing={2}>
        <div>
            <ExerciseRecordsTable records={records} unit={unit}/>
        </div>
        {(!!records.lastRecord()) && <Box>
            <h3>Compute % of KG</h3>

            <WeightCalculator weight={records.lastRecord()?.value || 0} />
        </Box>}
        {(records.records.length > 0) && <Box>
            <h3>Evolution</h3>

            <ExerciseRecordsEvolution records={records}/>
        </Box>}
    </Stack>;
}