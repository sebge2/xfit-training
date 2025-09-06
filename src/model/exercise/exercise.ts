import {ExerciseDto} from "../dto/exercise/exercise.dto.ts";
import {MeasureUnit} from "./measure-unit.ts";
import {findMainCategory, MainCategory} from "./main-category.ts";
import {SubCategory} from "./sub-category.ts";
import {ExerciseTag} from "./exercise-tag.ts";

export class Exercise {

    static fromDto(id: string, dto: ExerciseDto): Exercise {
        return new Exercise(id, dto.name, dto.subCategory, dto.tags, dto.unit, dto.comment);
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
        public name: string,
        public subCategory: SubCategory,
        public tags: ExerciseTag[],
        public unit: MeasureUnit,
        public comment: string | undefined,
    ) {
    }

    get category(): MainCategory {
        return findMainCategory(this.subCategory);
    }
}