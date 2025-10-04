import * as React from "react";
import {Exercise} from "../../../model/exercise/exercise.ts";
import {UserExerciseRecords} from "../../../model/record/user-exercise-records.tsx";
import {MeasureUnit} from "../../../model/exercise/measure-unit.ts";
import {createInfoTab, TabDescriptor} from "../../../model/core/structure/tab-descriptor.tsx";
import {ExerciseRecordsGroupView} from "./group/ExerciseRecordsGroupView.tsx";
import {Tabs} from "../../../components/core/structure/Tabs.tsx";
import {NewRecordGroupInput} from "../../../components/activity/NewRecordGroupInput.tsx";

type ExerciseRecordsProps = {
    exercise: Exercise,
    records: UserExerciseRecords | undefined,
};

const MINIMUM_REPS_TAB = 5;

export function ExerciseLoadedPage({exercise, records}: ExerciseRecordsProps) {
    const tabs: TabDescriptor[] = generateTabs(exercise, records);

    return <Tabs tabs={tabs}/>;
}

function generateTabs(exercise: Exercise, records: UserExerciseRecords | undefined): TabDescriptor[] {
    const tabs = [
        createInfoTab(),
    ];

    switch (exercise.unit) {
        case MeasureUnit.KILOGRAMS: {
            const recordsToUse = initRecords(records);

            for (let i = 0; i < recordsToUse.groupKeys.length; i++) {
                tabs.push({
                    header: `${recordsToUse.groupKeys[i]} REP`,
                    defaultSelected: i == 0,
                    content: <ExerciseRecordsGroupView exercise={exercise}
                                                       records={recordsToUse.group(recordsToUse.groupKeys[i])}/>
                })
            }
            break;
        }
        case MeasureUnit.REPS:
        case MeasureUnit.TIME:
            tabs.push({
                header: `PERF`,
                content: <div></div>, // TODO
                defaultSelected: true,
            })
            break;
    }

    if (exercise.unit === MeasureUnit.KILOGRAMS) {
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
    const filledRecords = UserExerciseRecords.empty([...Array(MINIMUM_REPS_TAB)].map((_, i) => i + 1));

    if (records) {
        filledRecords.merge(records);
    }

    return filledRecords;
}

function createAddTab(content: React.ReactElement): TabDescriptor {
    return {
        header: <NewRecordGroupInput/>,
        content: content,
        defaultSelected: false,
    };
}

