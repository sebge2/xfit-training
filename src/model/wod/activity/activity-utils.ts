import {ActivityDto} from "../../dto/wod/activity/activity-dto.ts";
import {ActivityType} from "./activity-type.ts";
import {ActivityExercise} from "./activity-exercise.ts";
import {ActivityExerciseDto} from "../../dto/wod/activity/activity-exercise.dto.ts";
import {Sequence} from "./sequence.ts";
import {SequenceDto} from "../../dto/wod/activity/sequence.dto.ts";
import {Repetitions} from "./repetitions.ts";
import {RepetitionsDto} from "../../dto/wod/activity/repetitions.dto.ts";
import {Rest} from "./rest.ts";
import {RestDto} from "../../dto/wod/activity/rest.dto.ts";
import {Amrap} from "./amrap.ts";
import {AmrapDto} from "../../dto/wod/activity/amrap.dto.ts";
import {Enom} from "./enom.ts";
import {EnomDto} from "../../dto/wod/activity/enom.dto.ts";
import {ForTime} from "./for-time.ts";
import {ForTimeDto} from "../../dto/wod/activity/for-time.dto.ts";
import {Activity} from "./activity.ts";

export function mapActivityFromDto(dto: ActivityDto): Activity {
    switch (dto.type) {
        case ActivityType.EXERCISE:
            return ActivityExercise.fromDto(<ActivityExerciseDto>dto);
        case ActivityType.SEQUENCE:
            return Sequence.fromDto(<SequenceDto>dto);
        case ActivityType.REPETITIONS:
            return Repetitions.fromDto(<RepetitionsDto>dto);
        case ActivityType.REST:
            return Rest.fromDto(<RestDto>dto);
        case ActivityType.AMRAP:
            return Amrap.fromDto(<AmrapDto>dto);
        case ActivityType.ENOM:
            return Enom.fromDto(<EnomDto>dto);
        case ActivityType.FOR_TIME:
            return ForTime.fromDto(<ForTimeDto>dto);
        default:
            throw Error(`Unsupported type ${dto.type}.`);
    }
}

export function mapActivityFromAllDto(dtos: ActivityDto[]): Activity[] {
    return (dtos || []).map(dto => mapActivityFromDto(dto));
}

export function mapActivityToDto(activity: Activity): ActivityDto {
    switch (activity.type) {
        case ActivityType.EXERCISE:
            return ActivityExercise.toDto(<ActivityExercise>activity);
        case ActivityType.SEQUENCE:
            return Sequence.toDto(<Sequence>activity);
        case ActivityType.REPETITIONS:
            return Repetitions.toDto(<Repetitions>activity);
        case ActivityType.REST:
            return Rest.toDto(<Rest>activity);
        case ActivityType.AMRAP:
            return Amrap.toDto(<Amrap>activity);
        case ActivityType.ENOM:
            return Enom.toDto(<Enom>activity);
        case ActivityType.FOR_TIME:
            return ForTime.toDto(<ForTime>activity);
        default:
            throw Error(`Unsupported type ${activity.type}.`);
    }
}

export function mapActivityToAllDto(activities: Activity[]): ActivityDto[] {
    return activities.map(dto => mapActivityToDto(dto));
}