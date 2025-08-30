import Tab from '@mui/material/Tab';
import * as React from 'react';
import Box from '@mui/material/Box';
import {MAIN_CATEGORY_LABELS, MainCategory} from "../../../model/exercise/main-category.ts";
import {TabContext} from '@mui/lab';
import TabList from '@mui/lab/TabList';

export function ExercisesCategoryTabs({children}: { children: React.ReactNode }) {
    const [value, setValue] = React.useState(MainCategory.STRENGTH);

    return <Box sx={{width: '100%', typography: 'body1'}}>
        <TabContext value={value}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <TabList onChange={(_: React.SyntheticEvent, newValue: MainCategory) => setValue(newValue)}
                         aria-label="Exercises by categories"
                         centered>
                    {Object.keys(MainCategory)
                        .map(category => category as MainCategory)
                        .map(category => <Tab label={MAIN_CATEGORY_LABELS[category]} value={category}/>)}
                </TabList>
            </Box>

            {children}
        </TabContext>
    </Box>;
}