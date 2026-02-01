import {Activity} from "../../../model/wod/activity/activity.ts";
import {ActivityType} from "../../../model/wod/activity/activity-type.ts";
import {ActivityExerciseDisplay} from "./exercise/activity-exercise-display.tsx";
import {ForTimeDisplay} from "./forTime/for-time-display.tsx";
import {ActivityExercise} from "../../../model/wod/activity/activity-exercise.ts";
import {ForTime} from "../../../model/wod/activity/for-time.ts";
import {SequenceDisplay} from "./sequence/sequence-display.tsx";
import {Sequence} from "../../../model/wod/activity/sequence.ts";
import {AmrapDisplay} from "./amrap/amrap-display.tsx";
import {Amrap} from "../../../model/wod/activity/amrap.ts";
import {RestDisplay} from "./rest/rest-display.tsx";
import {Rest} from "../../../model/wod/activity/rest.ts";
import {EnomDisplay} from "./enom/enom-display.tsx";
import {Enom} from "../../../model/wod/activity/enom.ts";
import {RepetitionsDisplay} from "./repetition/repetitions-display.tsx";
import {Repetitions} from "../../../model/wod/activity/repetitions.ts";

export interface ActivityContext {

    editing: boolean,

    activity?: Activity,
}

export type ActionsProps = {
    onUpdate: (activity: Activity) => void,
};

type Props = ActionsProps & {
    activity: Activity;
    parentContext: ActivityContext;
};

export function ActivityDisplay({activity, parentContext, onUpdate}: Props) {
    switch (activity.type) {
        case ActivityType.EXERCISE:
            return (<ActivityExerciseDisplay exercise={activity as ActivityExercise}
                                             parentContext={parentContext}
                                             onUpdate={onUpdate}/>);
        case ActivityType.SEQUENCE:
            return (<SequenceDisplay sequence={activity as Sequence}
                                     parentContext={parentContext}
                                     onUpdate={onUpdate}/>);
        case ActivityType.REPETITIONS:
            return (<RepetitionsDisplay repetitions={activity as Repetitions}
                                        parentContext={parentContext}
                                        onUpdate={onUpdate}/>);
        case ActivityType.REST:
            return (<RestDisplay rest={activity as Rest}
                                 parentContext={parentContext}
                                 onUpdate={onUpdate}/>);
        case ActivityType.AMRAP:
            return (<AmrapDisplay amrap={activity as Amrap}
                                  parentContext={parentContext}
                                  onUpdate={onUpdate}/>);
        case ActivityType.ENOM:
            return (<EnomDisplay enom={activity as Enom}
                                 parentContext={parentContext}
                                 onUpdate={onUpdate}/>);
        case ActivityType.FOR_TIME:
            return (<ForTimeDisplay forTime={activity as ForTime}
                                    parentContext={parentContext}
                                    onUpdate={onUpdate}/>);
        default:
            throw Error(`Unsupported type ${activity.type}.`);
    }
}