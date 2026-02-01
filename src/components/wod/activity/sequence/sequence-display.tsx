import {ActivityContext, ActivityDisplay, ActivityProps} from "../activity-display.tsx";
import {Sequence} from "../../../../model/wod/activity/sequence.ts";
import style from "../Activity.module.scss";
import {ActivityBox} from "../activity-box.tsx";
import {useState} from "react";
import {ActivityType} from "../../../../model/wod/activity/activity-type.ts";
import {ActivitySelectorDialog} from "../activity-selector-dialog.tsx";
import {createActivity} from "../../../../model/wod/activity/activity-utils.ts";
import {Activity} from "../../../../model/wod/activity/activity.ts";
import {MoreActionButtonAction} from "../../../core/buttton/MoreActionButton.tsx";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import MoveUpIcon from "@mui/icons-material/MoveUp";

type Props = ActivityProps & {
    activity: Sequence,
};

export function SequenceDisplay({activity, parentContext, onUpdate: onUpdateDelegate}: Props) {
    const [showDialog, setShowDialog] = useState<boolean>(false);

    function onAddChildActivityRequested() {
        setShowDialog(true);
    }

    function onCancelAddChildActivity() {
        setShowDialog(false);
    }

    function onAddChildActivity(activityType: ActivityType) {
        setShowDialog(false);

        onUpdateDelegate(activity.addActivity(createActivity(activityType)));
    }

    function onChildUpdate(child: Activity) {
        onUpdateDelegate(activity.updateActivity(child));
    }

    function onChildDelete(id: string) {
        onUpdateDelegate(activity.deleteActivity(id));
    }

    function onChildMove(id: string, index: number) {
        onUpdateDelegate(activity.moveActivity(id, index));
    }

    const sequenceActions: MoreActionButtonAction[] = [];
    if (parentContext?.editing) {
        sequenceActions.push(
            {
                label: "Add Inner Activity",
                onClick: onAddChildActivityRequested,
                icon: <AddIcon fontSize="small"/>
            }
        );
    }

    return <>
        <ActivitySelectorDialog open={showDialog} onSelected={onAddChildActivity} onCancel={onCancelAddChildActivity}>
        </ActivitySelectorDialog>

        <ActivityBox delimiterTitle={activity.name}
                     actions={[...sequenceActions, ...parentContext.childrenActions]}>
            <div className={style.sequenceActivity}>
                {activity.activities.map(child => {
                    const currentContext: ActivityContext = {
                        editing: parentContext.editing,
                        activity: activity,
                        childrenActions: [],
                    };

                    if (currentContext.editing) {
                        currentContext.childrenActions.push({
                            label: "Delete",
                            onClick: () => onChildDelete(child.id),
                            icon: <DeleteIcon fontSize="small"/>
                        });

                        currentContext.childrenActions.push({
                                label: "Move",
                                onClick: () => onChildMove(child.id, 0), // TODO
                                icon: <MoveUpIcon fontSize="small"/>
                            });
                    }

                    return <div key={child.id}>
                        <ActivityDisplay activity={child}
                                         parentContext={currentContext}
                                         onUpdate={onChildUpdate}/>
                    </div>;
                })}
            </div>
        </ActivityBox>
    </>;
}