import {DocumentData} from "firebase/firestore";
import {MeasureUnit} from "../../exercise/measure-unit.ts";

export interface ExerciseDto extends DocumentData {

    get name(): string;

    get tags(): string[];

    get unit(): MeasureUnit;

    get comment(): string | undefined;

}