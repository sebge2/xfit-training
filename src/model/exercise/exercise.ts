import {ExerciseDto} from "../dto/exercise/exercise.dto.ts";
import {MeasureUnit} from "./measure-unit.ts";

export class Exercise {

    static fromDto(id: string, dto: ExerciseDto): Exercise {
        return new Exercise(id, dto.name, dto.tags, dto.unit, dto.comment);
    }

    static toDto(exercise: Exercise): ExerciseDto {
        return {
            name: exercise.name,
            tags: exercise.tags,
            unit: exercise.unit,
            comment: exercise.comment,
        };
    }

    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly tags: string[],
        public readonly unit: MeasureUnit,
        public readonly comment: string | undefined,
    ) {
    }
}