import {Exercise} from "./exercise.ts";
import {SubCategory} from "./sub-category.ts";
import {MainCategory} from "./main-category.ts";

export class SubCategoryExercises {

    static empty(category: MainCategory, subCategory: SubCategory): SubCategoryExercises {
        return new SubCategoryExercises(category, subCategory, []);
    }

    constructor(
        public readonly category: MainCategory,
        public readonly subCategory: SubCategory,
        public readonly exercises: Exercise[],
    ) {
    }

    addExercise(exercise: Exercise): void {
        this.exercises.push(exercise);
    }
}