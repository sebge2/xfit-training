import {UserExerciseGroupRecordsDto} from "../dto/record/user-exercise-group-records.dto.ts";
import {UserRecord} from "./user-record.tsx";

export class UserExerciseGroupRecords {

    static fromDto(id: number, dto: UserExerciseGroupRecordsDto): UserExerciseGroupRecords {
        return new UserExerciseGroupRecords(
            id,
            (dto?.records || []).map(record => UserRecord.fromDto(record))
        );
    }

    static toDto(group: UserExerciseGroupRecords): UserExerciseGroupRecordsDto {
        return {
            records: group.records.map(record => UserRecord.toDto(record)),
        };
    }

    constructor(
        public readonly id: number,
        public readonly records: UserRecord[],
    ) {
    }

    lastRecord(): UserRecord | undefined {
        return (this.records.length > 0)
            ? this.records[this.records.length - 1]
            : undefined;
    }

    addRecord(record: UserRecord) {
        this.records.push(record);

        this.records.sort((a, b) => (a.date.getTime() - b.date.getTime()) * -1);
    }
}