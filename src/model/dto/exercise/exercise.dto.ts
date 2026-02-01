import {DocumentData} from "firebase/firestore";
import {MeasureUnit} from "../../exercise/measure-unit.ts";
import {SubCategory} from "../../exercise/sub-category.ts";
import {ExerciseTag} from "../../exercise/exercise-tag.ts";
import {MainCategory} from "../../exercise/main-category.ts";

export interface ExerciseDto extends DocumentData {

    get name(): string;

    get category(): MainCategory;

    get subCategory(): SubCategory;

    get tags(): ExerciseTag[];

    get unit(): MeasureUnit;

    get comment(): string | null;

}