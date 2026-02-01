import {Enom} from "../../../../model/wod/activity/enom.ts";
import {ActionsProps, ActivityContext, ActivityDisplay} from "../activity-display.tsx";
import DurationDisplay from "../duration-display.tsx";
import {ActivityBox, BoxActionType} from "../activity-box.tsx";
import {ACTIVITY_TYPE_LABELS} from "../../../../model/wod/activity/activity-type.ts";
import {ReactNode} from "react";
import {InputMinuteSecond} from "../../../core/form/InputMinuteSecond.tsx";
import * as React from "react";

type Props = ActionsProps & {
    enom: Enom,
    parentContext: ActivityContext,
};

export function EnomDisplay({enom, parentContext, onUpdate: onUpdateDelegate}: Props) {
    const currentContext = {
        editing: parentContext.editing,
        parent: enom,
    };

    function onUpdate() {
        onUpdateDelegate(enom);
    }

    let title: ReactNode;
    if(parentContext.editing) {

        <InputMinuteSecond key={`value-${enom.id}`} formField={valueField}
                           onChange={(value) => {
                               setValueField(initValueField(value))
                           }}
        />
    } else {
        title = <>ENOM <DurationDisplay duration={enom.duration}/> {enom.repetitions} repetitions</>;
    }

    return <>
        <ActivityBox delimiterTitle={ACTIVITY_TYPE_LABELS[enom.type]}
                     innerTitle={title}
                     context={currentContext}>
            <ActivityDisplay activity={enom.activity}
                             parentContext={currentContext}
                             onUpdate={onUpdateDelegate}/>
        </ActivityBox>
    </>;
}