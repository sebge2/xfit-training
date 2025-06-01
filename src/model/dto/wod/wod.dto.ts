import {ActivityDto} from "./activity/activity-dto.ts";

export interface WodDto {

    get name(): string;

    get activity(): ActivityDto;

    get tags(): string[];

    get comment(): string | undefined;
}