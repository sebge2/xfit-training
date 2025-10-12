import {Exercise} from "../../../model/exercise/exercise.ts";
import {UserExerciseRecords} from "../../../model/record/user-exercise-records.tsx";
import {useState} from "react";
import {createInfoTab, TabDescriptor} from "../../../model/core/structure/tab-descriptor.tsx";
import {Tabs} from "../../../components/core/structure/Tabs.tsx";
import {ExerciseNewGroupEditor} from "./ExerciseNewGroupEditor.tsx";
import {ExerciseRecordsGroupView} from "./group/ExerciseRecordsGroupView.tsx";
import AddIcon from "@mui/icons-material/Add";

type Props = {
    exercise: Exercise,
    records: UserExerciseRecords | undefined,
};

const MINIMUM_REPS_TAB = 5;

export function ExerciseKilogramsLoadedPage({exercise, records}: Props) {
    const [tabs, setTabs] = useState<TabDescriptor[]>([]);

    function onAddGroup(group: number) {
        records?.addGroup(group);
        setTabs(generateTabs(exercise, records, onAddGroup));
    }

    useState(() => {
        setTabs(generateTabs(exercise, records, onAddGroup));
    });

    return <Tabs tabs={tabs}/>;
}

function generateTabs(exercise: Exercise, records: UserExerciseRecords | undefined, onAddGroup: (group: number) => void): TabDescriptor[] {
    const tabs = [
        createInfoTab(),
    ];

    const recordsToUse = initRecords(records);

    for (let i = 0; i < recordsToUse.groupKeys.length; i++) {
        tabs.push({
            header: `${recordsToUse.groupKeys[i]} REP`,
            defaultSelected: i == 0,
            content: <ExerciseRecordsGroupView exercise={exercise}
                                               records={recordsToUse.group(recordsToUse.groupKeys[i])}/>
        })
    }

    // TODO
    tabs.push(
        {
            header: <AddIcon/>,
            content: <ExerciseNewGroupEditor onCreate={onAddGroup} unit={exercise.unit}/>,
            defaultSelected: false,
        }
    );

    return tabs;
}

function initRecords(records: UserExerciseRecords | undefined): UserExerciseRecords {
    const filledRecords = UserExerciseRecords.empty([...Array(MINIMUM_REPS_TAB)].map((_, i) => i + 1));

    if (records) {
        filledRecords.merge(records);
    }

    return filledRecords;
}