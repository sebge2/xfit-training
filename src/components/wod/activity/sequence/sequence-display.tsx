import {ActionsProps, ActivityContext, ActivityDisplay} from "../activity-display.tsx";
import {Sequence} from "../../../../model/wod/activity/sequence.ts";
import style from "../Activity.module.scss";
import {ActivityBox, BoxActionType} from "../activity-box.tsx";
import {useState} from "react";
import {ActivityType} from "../../../../model/wod/activity/activity-type.ts";
import {ActivitySelectorDialog} from "../activity-selector-dialog.tsx";
import {createActivity} from "../../../../model/wod/activity/activity-utils.ts";
import {Activity} from "../../../../model/wod/activity/activity.ts";

type Props = ActionsProps & {
    sequence: Sequence,
    parentContext: ActivityContext,
};

export function SequenceDisplay({sequence, parentContext, onUpdate: onUpdateDelegate, onAction}: Props) {
    const [showDialog, setShowDialog] = useState<boolean>(false);

    const currentContext: ActivityContext = {
        editing: parentContext.editing,
        activity: sequence,
    };

    function onActionOnSequence(action: BoxActionType, param?: string) {
        switch (action) {
            case BoxActionType.ADD_INNER_ACTIVITY:
                setShowDialog(true);
                break;
            case BoxActionType.DELETE:
            case BoxActionType.MOVE:
                onAction(action, param);
                break;
        }
    }

    function onChildAction(id: string, action: BoxActionType, param?: string) {
        switch (action) {
            case BoxActionType.ADD_INNER_ACTIVITY:
                throw Error("Not supported.");
            case BoxActionType.DELETE:
                onUpdateDelegate(sequence.deleteActivity(id));
                break;
            case BoxActionType.MOVE:
                onUpdateDelegate(sequence.moveActivity(id, Number(param)));
                break;
        }
    }

    function cancelAddActivity() {
        setShowDialog(false);
    }

    function onAddActivity(activityType: ActivityType) {
        setShowDialog(false);

        onUpdateDelegate(sequence.addActivity(createActivity(activityType)));
    }

    function onChildUpdate(activity: Activity) {
        onUpdateDelegate(sequence.updateActivity(activity));
    }

    return <>
        <ActivitySelectorDialog open={showDialog} onSelected={onAddActivity} onCancel={cancelAddActivity}>
        </ActivitySelectorDialog>

        <ActivityBox delimiterTitle={sequence.name}
                     parentContext={parentContext}
                     context={currentContext}
                     onAction={onActionOnSequence}>
            <div className={style.sequenceActivity}>
                {sequence.activities.map(activity => {
                    return <div key={activity.id}>
                        <ActivityDisplay activity={activity}
                                         parentContext={currentContext}
                                         onUpdate={onChildUpdate}
                                         onAction={(action, param) => onChildAction(activity.id, action, param)}/>
                    </div>;
                })}
            </div>
        </ActivityBox>
    </>;
}