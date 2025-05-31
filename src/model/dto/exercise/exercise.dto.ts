import {DocumentData} from "firebase/firestore";

export interface ExerciseDto extends DocumentData{

    get name(): string;

    get tags(): string[];

    get comment(): string | undefined;

}