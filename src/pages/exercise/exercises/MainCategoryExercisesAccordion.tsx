import {MAIN_SUB_CATEGORY_STRUCTURE} from "../../../model/exercise/main-category.ts";
import {MainCategoryExercises} from "../../../model/exercise/main-category-exercises.ts";
import {SubCategory} from "../../../model/exercise/sub-category.ts";
import {SubCategoryExercisesAccordion} from "./SubCategoryExercisesAccordion.tsx";

export function MainCategoryExercisesAccordion({category}: { category: MainCategoryExercises }) {
    return <>{
        MAIN_SUB_CATEGORY_STRUCTURE[category.category]
            .map(subCategory => subCategory as SubCategory)
            .map(subCategory => category.getSubCategory(subCategory))
            .map(subCategory =>
                <SubCategoryExercisesAccordion subCategory={subCategory}/>
            )
    }</>;
}