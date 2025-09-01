import {UserExerciseRecords} from "../../../model/record/user-exercise-records.tsx";
import Tab from '@mui/material/Tab';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import {Exercise} from "../../../model/exercise/exercise.ts";
import * as React from "react";
import {TabContext} from '@mui/lab';
import TabList from '@mui/lab/TabList';
import {MeasureUnit} from "../../../model/exercise/measure-unit.ts";

type ExerciseRecordsTabsProps = {
    exercise: Exercise,
    records: UserExerciseRecords | undefined,
    children: React.ReactNode,
};

type TabDescriptor = {
    label: React.ReactNode,
    icon: React.ReactElement | undefined,
    value: string,
};

const INFO_TAB: TabDescriptor = {
    label: undefined,
    icon: <InfoIcon/>,
    value: '-1',
};

const ADD_TAB: TabDescriptor = {
    label: undefined,
    icon: <AddIcon/>,
    value: '0',
};

const MINIMUM_REPS_TAB = 5;

export function ExerciseRecordsTabs({exercise, records, children}: ExerciseRecordsTabsProps) {
    const [value, setValue] = React.useState('1');
    const tabDescriptors: TabDescriptor[] = generateTabs(exercise, records);

    return <Box sx={{width: '100%', typography: 'body1'}}>
        <TabContext value={value}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <TabList onChange={(_: React.SyntheticEvent, newValue: string) => setValue(newValue)}
                         aria-label="My Records"
                         centered>
                    {tabDescriptors
                        .map(tab => <Tab icon={tab.icon} label={tab.label} value={tab.value}/>)}
                </TabList>
            </Box>

            {children}
        </TabContext>
    </Box>;
}

function generateTabs(exercise: Exercise, records: UserExerciseRecords | undefined): TabDescriptor[] {
    const tabs = [INFO_TAB];

    switch (exercise.unit) {
        case MeasureUnit.REPS: {
            const recordsToUse = initRecords(records);

            for (let i = 0; i < recordsToUse.groupKeys.length; i++) {
                tabs.push({
                    icon: undefined,
                    label: `${recordsToUse.groupKeys[i]} REP`,
                    value: recordsToUse.groupKeys[i].toString(),
                })
            }
            break;
        }
        case MeasureUnit.KILOGRAMS:
        case MeasureUnit.TIME:
            tabs.push({
                icon: undefined,
                label: `PERF`,
                value: '1',
            })
            break;
    }

    if (exercise.unit === MeasureUnit.REPS) {
        tabs.push(ADD_TAB);
    }

    return tabs;
}

function initRecords(records: UserExerciseRecords | undefined): UserExerciseRecords {
    if (records && (records.groupKeys.length > 0)) {
        return records;
    }

    return UserExerciseRecords.empty([...Array(MINIMUM_REPS_TAB)].map((_, i) => i + 1));
}
