import {UserExerciseRecordsDto} from "../dto/record/user-exercise-records.dto.ts";
import {UserExerciseGroupRecords} from "./user-exercise-group-records.tsx";

export class UserExerciseRecords {

    static fromDto(dto: UserExerciseRecordsDto): UserExerciseRecords {
        const groups = new Map<number, UserExerciseGroupRecords>();

        Object.keys(dto)
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

    constructor(
        public groups: Map<number, UserExerciseGroupRecords>,
    ) {
    }

}