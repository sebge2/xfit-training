import {Activity} from "./activity.ts";
import {ActivityType} from "./activity-type.ts";
import {ActivityExercise} from "./activity-exercise.ts";
import {Amrap} from "./amrap.ts";
import {Sequence} from "./sequence.ts";
import {Repetitions} from "./repetitions.ts";
import {Rest} from "./rest.ts";
import {Enom} from "./enom.ts";
import {ForTime} from "./for-time.ts";
import {ActivityDto} from "../dto/activity/activity-dto.ts";
import {ActivityExerciseDto} from "../dto/activity/activity-exercise.dto.ts";
import {EnomDto} from "../dto/activity/enom.dto.ts";
import {ForTimeDto} from "../dto/activity/for-time.dto.ts";
import {SequenceDto} from "../dto/activity/sequence.dto.ts";
import {RepetitionsDto} from "../dto/activity/repetitions.dto.ts";
import {RestDto} from "../dto/activity/rest.dto.ts";
import {AmrapDto} from "../dto/activity/amrap.dto.ts";

export class ActivityDeserializer {

    static deserialize(dto: ActivityDto): Activity {
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

    static deserializeAll(dtos: ActivityDto[]): Activity[] {
        return dtos.map(dto => this.deserialize(dto));
    }
}