import {WodDto} from "../dto/wod/wod.dto.ts";
import {WodTag} from "./wod-tag.ts";
import {MeasureUnit} from "../exercise/measure-unit.ts";
import {Sequence} from "./activity/sequence.ts";

export class Wod {

    static fromDto(id: string, dto: WodDto): Wod {
        return new Wod(
            id,
            Sequence.fromDto(dto.activity),
            dto.name,
            dto.unit,
            dto.tags || [],
            dto.comment,
        );
    }

    static toDto(wod: Wod): WodDto {
        return {
            name: wod.name,
            unit: wod.unit,
            activity: Sequence.toDto(wod.activity),
            tags: wod.tags,
            comment: wod.comment,
        };
    }

    constructor(
        public id: string | null,
        public activity: Sequence,
        public name: string,
        public unit: MeasureUnit,
        public tags: WodTag[],
        public comment: string | undefined,
    ) {
    }
}