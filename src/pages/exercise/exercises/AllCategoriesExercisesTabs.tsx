import {MAIN_CATEGORY_LABELS, MainCategory} from "../../../model/exercise/main-category.ts";
import {AllCategoriesExercises} from "../../../model/exercise/all-categories-exercises.ts";
import TabPanel from '@mui/lab/TabPanel';
import {MainCategoryExercisesAccordion} from "./MainCategoryExercisesAccordion.tsx";
import {ExercisesCategoryTabs} from "./ExercisesCategoryTabs.tsx";

export function AllCategoriesExercisesTabs({exercises}: { exercises: AllCategoriesExercises }) {
    return <ExercisesCategoryTabs>
        {Object.keys(MAIN_CATEGORY_LABELS)
            .map(category => category as MainCategory)
            .map(category =>
                <TabPanel value={category}>
                    <MainCategoryExercisesAccordion category={exercises.getCategory(category)}/>
                </TabPanel>
            )}
    </ExercisesCategoryTabs>;
}