import {Rest} from "../../../../model/wod/activity/rest.ts";
import DurationDisplay from "../duration-display.tsx";
import {ActivityBox} from "../activity-box.tsx";
import {ACTIVITY_TYPE_LABELS} from "../../../../model/wod/activity/activity-type.ts";
import {ActionsProps, ActivityContext} from "../activity-display.tsx";

type Props = ActionsProps & {
    rest: Rest,
    parentContext: ActivityContext,
};

export function RestDisplay({rest, parentContext, onUpdate: onUpdateDelegate}: Props) {
    const currentContext = {
        editing: parentContext.editing,
        parent: rest,
    };

    function onUpdate() {
        onUpdateDelegate(rest);
    }

    return (
        <>
            <ActivityBox delimiterTitle={ACTIVITY_TYPE_LABELS[rest.type]}
                         context={currentContext}>
                {rest.duration && <span>Rest: <DurationDisplay duration={rest.duration}/></span>}
            </ActivityBox>
        </>
    );
}