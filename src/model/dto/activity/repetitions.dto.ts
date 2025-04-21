import {ActivityDto} from "./activity-dto";

export interface RepetitionsDto extends ActivityDto {

    get repetitions(): number;

    get activities(): ActivityDto[];
}