import {MainCategoryExercises} from "./main-category-exercises.ts";
import {MainCategory} from "./main-category.ts";

export class AllCategoriesExercises {

    static empty(): AllCategoriesExercises {
        return new AllCategoriesExercises(
            Object.fromEntries(
                Object.values(MainCategory).map((category) => [category, MainCategoryExercises.empty(category)])
            ) as Record<MainCategory, MainCategoryExercises>
        );
    }

    constructor(
        public readonly categories: { [key in MainCategory]: MainCategoryExercises },
    ) {
    }

    getCategory(category: MainCategory): MainCategoryExercises {
        return this.categories[category];
    }
}