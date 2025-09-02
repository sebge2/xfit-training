import {UserExerciseGroupRecordsDto} from "../dto/record/user-exercise-group-records.dto.ts";
import {UserRecord} from "./user-record.tsx";

export class UserExerciseGroupRecords {

    static fromDto(dto: UserExerciseGroupRecordsDto): UserExerciseGroupRecords {
        return new UserExerciseGroupRecords(
            (dto.records || []).map(record => UserRecord.fromDto(record))
        );
    }

    static toDto(group: UserExerciseGroupRecords): UserExerciseGroupRecordsDto {
        return {
            records: group.records.map(record => UserRecord.toDto(record)),
        };
    }

    constructor(
        public readonly records: UserRecord[],
    ) {
    }

    last(): UserRecord | undefined {
        return (this.records.length > 0)
            ? this.records[this.records.length - 1]
            : undefined;
    }
}