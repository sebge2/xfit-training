import Tab from '@mui/material/Tab';

import Box from '@mui/material/Box';
import * as React from "react";
import {TabContext} from '@mui/lab';
import TabList from '@mui/lab/TabList';
import {TabDescriptor} from "./tab-descriptor.tsx";
import TabPanel from "@mui/lab/TabPanel";
import {useSearchParams} from "react-router-dom";

type ExerciseRecordsTabsProps = {
    tabs: TabDescriptor[],
};

const TAB_QUERY_PARAM = 'tabIndex';

export function ExerciseRecordsTabs({tabs}: ExerciseRecordsTabsProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedTabFromParam = searchParams.get(TAB_QUERY_PARAM);

    const [selectedTab, setSelectedTab] = React.useState(
        selectedTabFromParam || tabs.map((tab, index) => (tab.defaultSelected) ? index.toString() : undefined)
            .filter((value) => value !== undefined)
            .find(() => true) || 0,
    );

    function onTabChange(_: React.SyntheticEvent, newValue: string) {
        setSelectedTab(newValue);
        setSearchParams({[TAB_QUERY_PARAM]: newValue});
    }

    return <Box sx={{width: '100%', typography: 'body1'}}>
        <TabContext value={selectedTab}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <TabList onChange={onTabChange}
                         aria-label="My Records"
                         variant="scrollable"
                         scrollButtons="auto">
                    {tabs
                        .map((tab, index) => <Tab key={index.toString()} icon={tab.icon} label={tab.label}
                                                  value={index.toString()}/>)
                    }
                </TabList>
            </Box>

            {tabs
                .map((tab, index) => <TabPanel key={index.toString()} value={index.toString()}>{tab.content}</TabPanel>)
            }
        </TabContext>
    </Box>;
}
