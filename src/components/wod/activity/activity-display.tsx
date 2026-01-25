import {Activity} from "../../../model/wod/activity/activity.ts";
import {ActivityType} from "../../../model/wod/activity/activity-type.ts";
import {ActivityExerciseDisplay} from "./activity-exercise-display.tsx";
import {ForTimeDisplay} from "./for-time-display.tsx";
import {ActivityExercise} from "../../../model/wod/activity/activity-exercise.ts";
import {ForTime} from "../../../model/wod/activity/for-time.ts";
import {SequenceDisplay} from "./sequence-display.tsx";
import {Sequence} from "../../../model/wod/activity/sequence.ts";
import {AmrapDisplay} from "./amrap-display.tsx";
import {Amrap} from "../../../model/wod/activity/amrap.ts";
import {RestDisplay} from "./rest-display.tsx";
import {Rest} from "../../../model/wod/activity/rest.ts";
import {EnomDisplay} from "./enom-display.tsx";
import {Enom} from "../../../model/wod/activity/enom.ts";
import {RepetitionsDisplay} from "./repetitions-display.tsx";
import {Repetitions} from "../../../model/wod/activity/repetitions.ts";

export function ActivityDisplay({activity}: { activity: Activity }) {
    switch (activity.type) {
        case ActivityType.EXERCISE:
            return (<ActivityExerciseDisplay exercise={activity as ActivityExercise}/>);
        case ActivityType.SEQUENCE:
            return (<SequenceDisplay sequence={activity as Sequence}/>);
        case ActivityType.REPETITIONS:
            return (<RepetitionsDisplay repetitions={activity as Repetitions}/>);
        case ActivityType.REST:
            return (<RestDisplay rest={activity as Rest}/>);
        case ActivityType.AMRAP:
            return (<AmrapDisplay amrap={activity as Amrap}/>);
        case ActivityType.ENOM:
            return (<EnomDisplay enom={activity as Enom}/>);
        case ActivityType.FOR_TIME:
            return (<ForTimeDisplay forTime={activity as ForTime}/>);
        default:
            throw Error(`Unsupported type ${activity.type}.`);
    }
}