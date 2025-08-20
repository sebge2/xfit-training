import {DateDto} from "../date.dto.ts";

export interface UserRecordDto {

    get value(): number;

    get date(): DateDto;

}