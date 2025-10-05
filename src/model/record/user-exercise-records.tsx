import {UserExerciseRecordsDto} from "../dto/record/user-exercise-records.dto.ts";
import {UserExerciseGroupRecords} from "./user-exercise-group-records.tsx";
import {UserRecord} from "./user-record.tsx";

export class UserExerciseRecords {

    static fromDto(dto: UserExerciseRecordsDto): UserExerciseRecords {
        const groups = new Map<number, UserExerciseGroupRecords>();

        Object.keys(dto || {})
            .map(group => Number(group))
            .forEach((group) => groups.set(group, UserExerciseGroupRecords.fromDto(group, dto[group])));

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
            records.set(groups[i], new UserExerciseGroupRecords(groups[i], []));
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

    group(group: number): UserExerciseGroupRecords {
        if (!this.groups.has(group)) {
            this.groups.set(group, new UserExerciseGroupRecords(group, []));
        }

        return this.groups.get(group)!;
    }

    addGroup(group: number): void {
        if (this.groups.has(group)) {
            return;
        }

        this.groups.set(group, new UserExerciseGroupRecords(group, []));
    }

    addRecord(group: number, newRecord: UserRecord): void {
        this.group(group).addRecord(newRecord);
    }

    deleteRecord(group: number, record: UserRecord): void {
        this.group(group).deleteRecord(record);
    }

    merge(other: UserExerciseRecords): void {
        for (const groupKey of other.groupKeys) {
            this.group(groupKey).merge(other.group(groupKey));
        }
    }

}