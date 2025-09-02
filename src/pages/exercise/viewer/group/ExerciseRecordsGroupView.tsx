import {UserExerciseGroupRecords} from "../../../../model/record/user-exercise-group-records.tsx";
import {ExerciseRecordsTable} from "./ExerciseRecordsTable.tsx";
import {ExerciseRecordsEvolution} from "./ExerciseRecordsEvolution.tsx";
import {WeightCalculator} from "../../../../components/activity/WeightCalculator.tsx";
import {MeasureUnit} from "../../../../model/exercise/measure-unit.ts";

type Props = {
    records: UserExerciseGroupRecords,
    unit: MeasureUnit,
};

export function ExerciseRecordsGroupView({records, unit}: Props) {
    return <div>
        <div>
            <ExerciseRecordsTable records={records} unit={unit}/>
        </div>
        <div>
            <WeightCalculator weight={records.last()?.value} />
        </div>
        <div>
            <ExerciseRecordsEvolution records={records}/>
        </div>
    </div>
}