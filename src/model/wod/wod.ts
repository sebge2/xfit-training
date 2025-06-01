import {Activity} from "./activity/activity.ts";
import {WodDto} from "../dto/wod/wod.dto.ts";
import {mapActivityFromDto} from "./activity/activity-utils.ts";

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

    constructor(
        public readonly id: string,
        public readonly activity: Activity,
        public readonly name: string,
        public readonly tags: string[],
        public readonly comment: string | undefined,
    ) {
    }
}