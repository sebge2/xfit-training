import {UserExerciseGroupRecords} from "../../../../model/record/user-exercise-group-records.tsx";
import {ExerciseRecordsTable} from "./ExerciseRecordsTable.tsx";
import {ExerciseRecordsEvolution} from "./ExerciseRecordsEvolution.tsx";
import {WeightCalculator} from "../../../../components/activity/WeightCalculator.tsx";

type Props = {
    records: UserExerciseGroupRecords,
};

export function ExerciseRecordsGroupView({records}: Props) {
    return <div>
        <div>
            <ExerciseRecordsTable records={records}/>
        </div>
        <div>
            <WeightCalculator weight={records.last()?.value} />
        </div>
        <div>
            <ExerciseRecordsEvolution records={records}/>
        </div>
    </div>
}