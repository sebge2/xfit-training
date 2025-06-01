import {Activity} from "./activity.ts";
import {WodDto} from "../dto/wod/wod.dto.ts";

export class Wod {

    static fromDto(id: string, dto: WodDto): Wod {
        return new Wod(
            id,
            Activity.mapFromDto(dto.activity),
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