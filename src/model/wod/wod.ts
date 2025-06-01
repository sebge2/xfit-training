import {Activity} from "./activity/activity.ts";
import {WodDto} from "../dto/wod/wod.dto.ts";
import {mapActivityFromDto, mapActivityToDto} from "./activity/activity-utils.ts";

export class Wod {

    static fromDto(id: string, dto: WodDto): Wod {
        return new Wod(
            id,
            mapActivityFromDto(dto.activity),
            dto.name,
            dto.tags || [],
            dto.comment
        );
    }

    static toDto(wod: Wod): WodDto {
        return {
            name: wod.name,
            activity: mapActivityToDto(wod.activity),
            tags: wod.tags,
            comment: wod.comment,
        };
    }

    constructor(
        public id: string | undefined,
        public activity: Activity,
        public name: string,
        public tags: string[],
        public comment: string | undefined,
    ) {
    }
}