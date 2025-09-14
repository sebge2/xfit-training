import {ActivityDto} from "./activity/activity-dto.ts";
import {WodTag} from "../../wod/wod-tag.ts";
import {MeasureUnit} from "../../exercise/measure-unit.ts";

export interface WodDto {

    get name(): string;

    get unit(): MeasureUnit;

    get activity(): ActivityDto;

    get tags(): WodTag[];

    get comment(): string | undefined;
}