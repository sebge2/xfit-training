import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import * as React from "react";
import {TabContext} from '@mui/lab';
import TabList from '@mui/lab/TabList';
import TabPanel from "@mui/lab/TabPanel";
import {TabDescriptor} from "../../../model/core/structure/tab-descriptor.tsx";
import {useSearchParams} from "react-router-dom";

type Props = {
    tabs: TabDescriptor[],
    onTabChange?: (newValue: string) => void,
};

const TAB_QUERY_PARAM = 'tabIndex';

export function Tabs({tabs, onTabChange: onTabChangeDelegate}: Props) {
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

        if (onTabChangeDelegate) {
            onTabChangeDelegate(newValue);
        }
    }

    return <Box sx={{width: '100%', typography: 'body1'}}>
        <TabContext value={selectedTab}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <TabList onChange={onTabChange}
                         aria-label="Tabs"
                         variant="scrollable"
                         scrollButtons="auto">
                    {tabs
                        .map((tab, index) => <Tab key={index.toString()} label={tab.header} value={index.toString()}/>)
                    }
                </TabList>
            </Box>

            {tabs
                .map((tab, index) => <TabPanel key={index.toString()} value={index.toString()}>{tab.content}</TabPanel>)
            }
        </TabContext>
    </Box>;
}