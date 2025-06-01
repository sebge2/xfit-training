import {ActivityType} from "./activity-type.ts";
import {TaskSet} from "../../board/task-set.ts";
import {BoardTextInfo} from "../../board/board-text-info.ts";
import {ActivityDto} from "../../dto/wod/activity/activity-dto.ts";
import {ActivityExercise} from "./activity-exercise.ts";
import {ActivityExerciseDto} from "../../dto/wod/activity/activity-exercise.dto.ts";
import {Sequence} from "./sequence.ts";
import {SequenceDto} from "../../dto/wod/activity/sequence.dto.ts";
import {Repetitions} from "./repetitions.ts";
import {RepetitionsDto} from "../../dto/wod/activity/repetitions.dto.ts";
import {Rest} from "../rest.ts";
import {RestDto} from "../../dto/wod/activity/rest.dto.ts";
import {Amrap} from "./amrap.ts";
import {AmrapDto} from "../../dto/wod/activity/amrap.dto.ts";
import {Enom} from "./enom.ts";
import {EnomDto} from "../../dto/wod/activity/enom.dto.ts";
import {ForTime} from "./for-time.ts";
import {ForTimeDto} from "../../dto/wod/activity/for-time.dto.ts";
import {v4 as uuidv4} from "uuid";

export abstract class Activity {

    static mapFromDto(dto: ActivityDto): Activity {
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

    static mapFromAllDto(dtos: ActivityDto[]): Activity[] {
        return dtos.map(dto => Activity.mapFromDto(dto));
    }

    public readonly id: string;

    protected constructor(
        public readonly type: ActivityType,
        public readonly comment: string | undefined,
    ) {
        this.id = uuidv4();
    }

    abstract toSequencerTasks(parent: BoardTextInfo): TaskSet;

}