import {ActivityContext, ActivityDisplay, ActivityProps} from "../activity-display.tsx";
import {Sequence} from "../../../../model/wod/activity/sequence.ts";
import style from "../Activity.module.scss";
import {useState} from "react";
import {ActivityType} from "../../../../model/wod/activity/activity-type.ts";
import {ActivitySelectorDialog} from "./activity-selector-dialog.tsx";
import {createActivity} from "../../../../model/wod/activity/activity-utils.ts";
import {Activity} from "../../../../model/wod/activity/activity.ts";
import {MoreActionButtonAction} from "../../../core/buttton/MoreActionButton.tsx";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import MoveUpIcon from "@mui/icons-material/MoveUp";
import {ActivityMoveSelector} from "./activity-move-dialog.tsx";
import {ActivityBox} from "../activity-box.tsx";

type Props = ActivityProps & {
    activity: Sequence,
};

export function SequenceDisplay({activity, parentContext, onUpdate: onUpdateDelegate}: Props) {
    const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
    const [childToMove, setChildToMove] = useState<Activity | undefined>(undefined);

    function onAddChildActivityRequested() {
        setShowAddDialog(true);
    }

    function onCancelAddChildActivity() {
        setShowAddDialog(false);
    }

    function onAddChildActivity(activityType: ActivityType) {
        setShowAddDialog(false);

        onUpdateDelegate(activity.addActivity(createActivity(activityType)));
    }

    function onMoveChildActivityRequested(child: Activity) {
        setChildToMove(child);
    }

    function onCancelMoveChildActivity() {
        setChildToMove(undefined);
    }

    function onChildUpdate(child: Activity) {
        onUpdateDelegate(activity.updateActivity(child));
    }

    function onChildDelete(id: string) {
        onUpdateDelegate(activity.deleteActivity(id));
    }

    function onChildMove(newIndex: number) {
        setChildToMove(undefined);

        onUpdateDelegate(activity.moveActivity(childToMove?.id as string, newIndex));
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
        <ActivitySelectorDialog open={showAddDialog}
                                onSelected={onAddChildActivity}
                                onCancel={onCancelAddChildActivity}/>
        <ActivityMoveSelector key={childToMove?.id}
                              open={!!childToMove}
                              activities={activity.activities}
                              childIndexToMove={activity.activities.findIndex(act => act.id === childToMove?.id)}
                              onSelected={onChildMove}
                              onCancel={onCancelMoveChildActivity}/>

        <ActivityBox delimiterTitle={activity.name}
                     actions={[...sequenceActions, ...(parentContext.childrenActions || [])]}>
            <div className={style.sequenceActivity}>
                {activity.activities.map(child => {
                    const currentContext: ActivityContext = {
                        editing: parentContext.editing,
                        activity: activity,
                        childrenActions: [],
                    };

                    if (currentContext.editing) {
                        currentContext.childrenActions.push({
                            label: "Move",
                            onClick: () => onMoveChildActivityRequested(child),
                            icon: <MoveUpIcon fontSize="small"/>
                        });

                        currentContext.childrenActions.push({
                            label: "Delete",
                            onClick: () => onChildDelete(child.id),
                            icon: <DeleteIcon fontSize="small"/>
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