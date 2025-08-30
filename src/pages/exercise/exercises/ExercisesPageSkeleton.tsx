import {Skeleton} from "@mui/material";
import {MAIN_CATEGORY_LABELS, MainCategory} from "../../../model/exercise/main-category.ts";
import TabPanel from '@mui/lab/TabPanel';
import {ExercisesCategoryTabs} from "./ExercisesCategoryTabs.tsx";

export function ExercisesPageSkeleton() {
    const numberSkeletons = 10;

    return <ExercisesCategoryTabs>
        {Object.keys(MAIN_CATEGORY_LABELS)
            .map(category => category as MainCategory)
            .map(category =>
                <TabPanel value={category}>
                    {[...Array(numberSkeletons)].map((_, i) => (
                        <Skeleton key={i} variant="rectangular" width="100%" height="5rem" sx={{mb: 2}}/>
                    ))}
                </TabPanel>
            )}
    </ExercisesCategoryTabs>;
}