import {ExerciseDto} from "../dto/exercise/exercise.dto.ts";

export class Exercise {

    static fromDto(dto: ExerciseDto): Exercise {
        return new Exercise(dto.id, dto.name, dto.tags, dto.comment);
    }

    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly tags: string[],
        public readonly comment: string | undefined,
    ) {
    }
}