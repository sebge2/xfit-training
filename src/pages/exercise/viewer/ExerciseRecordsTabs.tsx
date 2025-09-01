import Tab from '@mui/material/Tab';

import Box from '@mui/material/Box';
import * as React from "react";
import {TabContext} from '@mui/lab';
import TabList from '@mui/lab/TabList';
import {TabDescriptor} from "./tab-descriptor.tsx";
import TabPanel from "@mui/lab/TabPanel";

type ExerciseRecordsTabsProps = {
    tabs: TabDescriptor[],
};

export function ExerciseRecordsTabs({tabs}: ExerciseRecordsTabsProps) {
    const [value, setValue] = React.useState(
        tabs.map((tab,index) => tab.defaultSelected ? index.toString() : undefined)
            .filter((value) => value !== undefined)
            .find(() => true) || 0,
    );

    return <Box sx={{width: '100%', typography: 'body1'}}>
        <TabContext value={value}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <TabList onChange={(_: React.SyntheticEvent, newValue: string) => setValue(newValue)}
                         aria-label="My Records"
                         centered>
                    {tabs
                        .map((tab, index) => <Tab key={index.toString()} icon={tab.icon} label={tab.label} value={index.toString()}/>)
                    }
                </TabList>
            </Box>

            {tabs
                .map((tab, index) => <TabPanel key={index.toString()} value={index.toString()}>{tab.content}</TabPanel>)
            }
        </TabContext>
    </Box>;
}
