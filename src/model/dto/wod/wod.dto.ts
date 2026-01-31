import {WodTag} from "../../wod/wod-tag.ts";
import {MeasureUnit} from "../../exercise/measure-unit.ts";
import {SequenceDto} from "./activity/sequence.dto.ts";

export interface WodDto {

    get name(): string;

    get unit(): MeasureUnit;

    get activity(): SequenceDto;

    get tags(): WodTag[];

    get comment(): string | undefined;
}