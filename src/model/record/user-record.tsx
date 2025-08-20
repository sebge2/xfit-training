import {UserRecordDto} from "../dto/record/user-record.dto.ts";
import {fromDateDto, toDateDto} from "../dto/date.dto.ts";

export class UserRecord {

    static fromDto(dto: UserRecordDto): UserRecord {
        return new UserRecord(
            dto.value,
            fromDateDto(dto.date),
        );
    }

    static toDto(record: UserRecord): UserRecordDto {
        return {
            value: record.value,
            date: toDateDto(record.date),
        };
    }

    constructor(
        public readonly value: number,
        public readonly date: Date,
    ) {
    }

}