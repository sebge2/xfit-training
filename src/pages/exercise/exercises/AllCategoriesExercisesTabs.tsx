import {MAIN_CATEGORY_LABELS, MainCategory} from "../../../model/exercise/main-category.ts";
import {AllCategoriesExercises} from "../../../model/exercise/all-categories-exercises.ts";
import TabPanel from '@mui/lab/TabPanel';
import {MainCategoryExercisesAccordion} from "./MainCategoryExercisesAccordion.tsx";
import {ExercisesCategoryTabs} from "./ExercisesCategoryTabs.tsx";
import {ActionsContainer} from "../../../components/core/interaction/ActionsContainer.tsx";
import {AddButton} from "../../../components/core/buttton/AddButton.tsx";
import {Permission} from "../../../model/auth/permission.ts";
import {AUTHENTICATION_SERVICE} from "../../../services/authentication-service.ts";
import {useNavigate} from "react-router-dom";

export function AllCategoriesExercisesTabs({exercises}: { exercises: AllCategoriesExercises }) {
    const navigate = useNavigate();

    function onNewExercise() {
        navigate("./new");
    }

    return <ExercisesCategoryTabs>
        {Object.keys(MAIN_CATEGORY_LABELS)
            .map(category => category as MainCategory)
            .map(category =>
                <TabPanel value={category}>
                    <MainCategoryExercisesAccordion category={exercises.getCategory(category)}/>

                    <ActionsContainer>
                        {AUTHENTICATION_SERVICE.currentUserOrFail.hasPermission(Permission.ADD_EXERCISE) &&
                            <AddButton onAdd={onNewExercise}/>}
                    </ActionsContainer>
                </TabPanel>
            )}
    </ExercisesCategoryTabs>;
}