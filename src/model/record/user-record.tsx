import {UserRecordDto} from "../dto/record/user-record.dto.ts";

export class UserRecord {

    static fromDto(dto: UserRecordDto): UserRecord {
        return new UserRecord(
            dto.value,
            dto.date,
        );
    }

    static toDto(record: UserRecord): UserRecordDto {
        return {
            value: record.value,
            date: record.date,
        };
    }

    constructor(
        public readonly value: number,
        public readonly date: Date,
    ) {
    }

}