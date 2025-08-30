import {DocumentData} from "firebase/firestore";
import {MeasureUnit} from "../../exercise/measure-unit.ts";
import {MainCategory} from "../../exercise/main-category.ts";
import {SubCategory} from "../../exercise/sub-category.ts";

export interface ExerciseDto extends DocumentData {

    get name(): string;

    get category(): MainCategory;

    get subCategory(): SubCategory;

    get tags(): string[];

    get unit(): MeasureUnit;

    get comment(): string | undefined;

}