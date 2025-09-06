import {ActivityDto} from "./activity/activity-dto.ts";
import {WodTag} from "../../wod/wod-tag.ts";

export interface WodDto {

    get name(): string;

    get activity(): ActivityDto;

    get tags(): WodTag[];

    get comment(): string | null;
}