import * as React from "react";
import {Exercise} from "../../../model/exercise/exercise.ts";
import {UserExerciseRecords} from "../../../model/record/user-exercise-records.tsx";
import {ExerciseRecordsTabs} from "./ExerciseRecordsTabs.tsx";
import {MeasureUnit} from "../../../model/exercise/measure-unit.ts";
import {createInfoTab, TabDescriptor} from "./tab-descriptor.tsx";
import AddIcon from '@mui/icons-material/Add';
import {ExerciseRecordsGroupView} from "./group/ExerciseRecordsGroupView.tsx";

type ExerciseRecordsProps = {
    exercise: Exercise,
    records: UserExerciseRecords | undefined,
};

const MINIMUM_REPS_TAB = 5;

export function ExerciseView({exercise, records}: ExerciseRecordsProps) {
    const tabs: TabDescriptor[] = generateTabs(exercise, records);

    return <ExerciseRecordsTabs tabs={tabs}/>;
}

function generateTabs(exercise: Exercise, records: UserExerciseRecords | undefined): TabDescriptor[] {
    const tabs = [
        createInfoTab(exercise),
    ];

    switch (exercise.unit) {
        case MeasureUnit.REPS: {
            const recordsToUse = initRecords(records);

            for (let i = 0; i < recordsToUse.groupKeys.length; i++) {
                tabs.push({
                    icon: undefined,
                    label: `${recordsToUse.groupKeys[i]} REP`,
                    defaultSelected: i == 0,
                    content: <ExerciseRecordsGroupView records={recordsToUse.group(recordsToUse.groupKeys[i])} />
                })
            }
            break;
        }
        case MeasureUnit.KILOGRAMS:
        case MeasureUnit.TIME:
            tabs.push({
                icon: undefined,
                label: `PERF`,
                content: <div></div>, // TODO
                defaultSelected: true,
            })
            break;
    }

    if (exercise.unit === MeasureUnit.REPS) {
        // TODO
        tabs.push(
            createAddTab(
                <div>Add a new value</div>
            )
        );
    }

    return tabs;
}

function initRecords(records: UserExerciseRecords | undefined): UserExerciseRecords {
    if (records && (records.groupKeys.length > 0)) {
        return records;
    }

    return UserExerciseRecords.empty([...Array(MINIMUM_REPS_TAB)].map((_, i) => i + 1));
}

function createAddTab(content: React.ReactElement): TabDescriptor {
    return {
        label: undefined,
        icon: <AddIcon/>,
        content: content,
        defaultSelected: false,
    };
}

