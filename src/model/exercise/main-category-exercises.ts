import {MAIN_SUB_CATEGORY_STRUCTURE, MainCategory} from "./main-category.ts";
import {SubCategory} from "./sub-category.ts";
import {SubCategoryExercises} from "./sub-category-exercises.ts";

export class MainCategoryExercises {

    static empty(category: MainCategory): MainCategoryExercises {
        return new MainCategoryExercises(
            category,
            Object.fromEntries(
                MAIN_SUB_CATEGORY_STRUCTURE[category].map((key) => [key, SubCategoryExercises.empty(category, key)])
            ) as Record<SubCategory, SubCategoryExercises>
        );
    }

    constructor(
        public readonly category: MainCategory,
        public readonly subCategories: { [key in SubCategory]: SubCategoryExercises },
    ) {
    }

    getSubCategory(subCategory: SubCategory): SubCategoryExercises {
        return this.subCategories[subCategory] || new SubCategoryExercises(this.category, subCategory, []);
    }
}