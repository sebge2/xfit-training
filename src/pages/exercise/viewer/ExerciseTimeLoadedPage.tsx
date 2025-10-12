import {Exercise} from "../../../model/exercise/exercise.ts";
import {UserExerciseRecords} from "../../../model/record/user-exercise-records.tsx";
import {createInfoTab, TabDescriptor} from "../../../model/core/structure/tab-descriptor.tsx";
import {Tabs} from "../../../components/core/structure/Tabs.tsx";
import {ExerciseRecordsGroupView} from "./group/ExerciseRecordsGroupView.tsx";

type Props = {
    exercise: Exercise,
    records: UserExerciseRecords | undefined,
};

export function ExerciseTimeLoadedPage({exercise, records}: Props) {
    const tabs = generateTabs(exercise, records);

    return <Tabs tabs={tabs}/>;
}

function generateTabs(exercise: Exercise, records: UserExerciseRecords | undefined): TabDescriptor[] {
    const recordsToUse = initRecords(records);

    return [
        createInfoTab(),

        {
            header: `My Records`,
            defaultSelected: true,
            content: <ExerciseRecordsGroupView exercise={exercise} records={recordsToUse.group(0)}/>
        }
    ];
}

function initRecords(records: UserExerciseRecords | undefined): UserExerciseRecords {
    const filledRecords = UserExerciseRecords.empty([0]);

    if (records) {
        filledRecords.merge(records);
    }

    return filledRecords;
}