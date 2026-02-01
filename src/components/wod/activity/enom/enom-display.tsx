import {Enom} from "../../../../model/wod/activity/enom.ts";
import {ActivityContext, ActivityDisplay, ActivityProps} from "../activity-display.tsx";
import DurationDisplay from "../duration-display.tsx";
import {ActivityBox} from "../activity-box.tsx";
import {ACTIVITY_TYPE_LABELS} from "../../../../model/wod/activity/activity-type.ts";
import {ReactNode} from "react";

type Props = ActivityProps & {
    activity: Enom,
};

export function EnomDisplay({activity, parentContext, onUpdate: onUpdateDelegate}: Props) {
    const currentContext: ActivityContext = {
        editing: parentContext.editing,
        activity: activity,
        childrenActions: [],
    };

    function onUpdate() {
        onUpdateDelegate(activity);
    }

    let title: ReactNode;
    if (parentContext.editing) {

        // <InputMinuteSecond key={`value-${activity.id}`} formField={valueField}
        //                    onChange={(value) => {
        //                        setValueField(initValueField(value))
        //                    }}
        // />
    } else {
        title = <>ENOM <DurationDisplay duration={activity.duration}/> {activity.repetitions} repetitions</>;
    }

    return <>
        <ActivityBox delimiterTitle={ACTIVITY_TYPE_LABELS[activity.type]}
                     innerTitle={title}
                     actions={parentContext.childrenActions}>
            <ActivityDisplay activity={activity.activity}
                             parentContext={currentContext}
                             onUpdate={onUpdateDelegate}/>
        </ActivityBox>
    </>;
}