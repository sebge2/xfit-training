import {Repetitions} from "../../../../model/wod/activity/repetitions.ts";
import {ActionsProps, ActivityContext, ActivityDisplay} from "../activity-display.tsx";
import {ActivityBox} from "../activity-box.tsx";
import {ACTIVITY_TYPE_LABELS} from "../../../../model/wod/activity/activity-type.ts";

type Props = ActionsProps & {
    repetitions: Repetitions,
    parentContext: ActivityContext,
};

export function RepetitionsDisplay({repetitions, parentContext, onUpdate: onUpdateDelegate}: Props) {
    const currentContext = {
        editing: parentContext.editing,
        parent: repetitions,
    };

    function onUpdate() {
        onUpdateDelegate(repetitions);
    }

    return (
        <>
            <ActivityBox delimiterTitle={ACTIVITY_TYPE_LABELS[repetitions.type]}
                         innerTitle={repetitions.repetitions + ' rounds'}
                         context={currentContext}>
                <ActivityDisplay activity={repetitions.activity}
                                 parentContext={currentContext}
                                 onUpdate={onUpdateDelegate}/>
            </ActivityBox>
        </>
    );
}