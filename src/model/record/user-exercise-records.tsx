import {UserExerciseRecordsDto} from "../dto/record/user-exercise-records.dto.ts";
import {UserExerciseGroupRecords} from "./user-exercise-group-records.tsx";

export class UserExerciseRecords {

    static fromDto(dto: UserExerciseRecordsDto): UserExerciseRecords {
        const groups = new Map<number, UserExerciseGroupRecords>();

        Object.keys(dto || {})
            .map(group => Number(group))
            .forEach((group) => groups.set(group, UserExerciseGroupRecords.fromDto(dto[group])));

        return new UserExerciseRecords(groups);
    }

    static toDto(exerciseRecords: UserExerciseRecords): UserExerciseRecordsDto {
        const dto: UserExerciseRecordsDto = {};

        for (const group of exerciseRecords.groups.keys()) {
            dto[group] = UserExerciseGroupRecords.toDto(exerciseRecords.groups.get(group)!);
        }

        return dto;
    }

    static empty(groups: number[]): UserExerciseRecords {
        const records = new Map();

        for (let i = 0; i < groups.length; i++) {
            records.set(groups[i], new UserExerciseGroupRecords([]));
        }

        return new UserExerciseRecords(records);
    }

    constructor(
        public groups: Map<number, UserExerciseGroupRecords>,
    ) {
    }

    get groupKeys(): number[] {
        return Array.from(this.groups.keys());
    }

}