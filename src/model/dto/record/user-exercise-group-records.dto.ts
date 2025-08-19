import {UserRecordDto} from "./user-record.dto.ts";

export interface UserExerciseGroupRecordsDto {

    get records(): UserRecordDto[];

}