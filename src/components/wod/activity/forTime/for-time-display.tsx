import {ForTime} from "../../../../model/wod/activity/for-time.ts";
import {ActionsProps, ActivityContext, ActivityDisplay} from "../activity-display.tsx";
import DurationDisplay from "../duration-display.tsx";
import {ActivityBox} from "../activity-box.tsx";
import {ACTIVITY_TYPE_LABELS} from "../../../../model/wod/activity/activity-type.ts";

type Props = ActionsProps & {
    forTime: ForTime,
    parentContext: ActivityContext,
};

export function ForTimeDisplay({forTime, parentContext, onUpdate: onUpdateDelegate}: Props) {
    const currentContext = {
        editing: parentContext.editing,
        parent: forTime,
    };

    function onUpdate() {
        onUpdateDelegate(forTime);
    }

    return (
        <>
            <ActivityBox delimiterTitle={ACTIVITY_TYPE_LABELS[forTime.type]}
                         innerTitle={forTime.duration &&
                             <span>Time Cap: <DurationDisplay duration={forTime.duration}/></span>}
                         context={currentContext}>
                <ActivityDisplay activity={forTime.activity}
                                 parentContext={currentContext}
                                 onUpdate={onUpdateDelegate}/>
            </ActivityBox>
        </>
    );
}