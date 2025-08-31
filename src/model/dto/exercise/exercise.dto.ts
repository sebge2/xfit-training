import {DocumentData} from "firebase/firestore";
import {MeasureUnit} from "../../exercise/measure-unit.ts";
import {SubCategory} from "../../exercise/sub-category.ts";
import {ExerciseTag} from "../../exercise/exercise-tag.tsx";

export interface ExerciseDto extends DocumentData {

    get name(): string;

    get subCategory(): SubCategory;

    get tags(): ExerciseTag[];

    get unit(): MeasureUnit;

    get comment(): string | undefined;

}