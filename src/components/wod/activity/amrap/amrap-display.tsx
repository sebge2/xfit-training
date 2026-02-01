import {Amrap} from "../../../../model/wod/activity/amrap.ts";
import {ActionsProps, ActivityContext, ActivityDisplay} from "../activity-display.tsx";
import DurationDisplay from "../duration-display.tsx";
import {ActivityBox, BoxActionType} from "../activity-box.tsx";
import {ACTIVITY_TYPE_LABELS} from "../../../../model/wod/activity/activity-type.ts";

type Props = ActionsProps & {
    amrap: Amrap,
    parentContext: ActivityContext,
};

export function AmrapDisplay({amrap, parentContext, onUpdate: onUpdateDelegate}: Props) {
    const currentContext = {
        editing: parentContext.editing,
        parent: amrap,
    };
    function onUpdate() {
        onUpdateDelegate(amrap);
    }

    return (
        <>
            <ActivityBox delimiterTitle={ACTIVITY_TYPE_LABELS[amrap.type]}
                         innerTitle={amrap.duration &&
                             <span>Duration: <DurationDisplay duration={amrap.duration}/></span>}
                         context={currentContext}>
                <ActivityDisplay activity={amrap.activity}
                                 parentContext={currentContext}
                                 onUpdate={onUpdateDelegate}/>
            </ActivityBox>
        </>
    );
}