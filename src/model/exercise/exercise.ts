import {ExerciseDto} from "../dto/exercise/exercise.dto.ts";
import {MeasureUnit} from "./measure-unit.ts";
import {findMainCategory, MainCategory} from "./main-category.ts";
import {SubCategory} from "./sub-category.ts";
import {ExerciseTag} from "./exercise-tag.tsx";

export class Exercise {

    static fromDto(id: string, dto: ExerciseDto): Exercise {
        return new Exercise(id, dto.name, findMainCategory(dto.subCategory), dto.subCategory, dto.tags, dto.unit, dto.comment);
    }

    static toDto(exercise: Exercise): ExerciseDto {
        return {
            name: exercise.name,
            subCategory: exercise.subCategory,
            tags: exercise.tags,
            unit: exercise.unit,
            comment: exercise.comment,
        };
    }

    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly category: MainCategory,
        public readonly subCategory: SubCategory,
        public readonly tags: ExerciseTag[],
        public readonly unit: MeasureUnit,
        public readonly comment: string | undefined,
    ) {
    }
}