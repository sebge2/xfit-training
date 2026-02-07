import {ForTime} from "../../../../model/wod/activity/for-time.ts";
import {ActivityContext, ActivityDisplay, ActivityProps} from "../activity-display.tsx";
import DurationDisplay from "../duration-display.tsx";
import {ActivityBox} from "../activity-box.tsx";
import {ACTIVITY_TYPE_LABELS} from "../../../../model/wod/activity/activity-type.ts";
import {Activity} from "../../../../model/wod/activity/activity.ts";
import {MoreActionButtonAction} from "../../../core/buttton/MoreActionButton.tsx";
import EditIcon from "@mui/icons-material/Edit";
import {useState} from "react";
import {ForTimeDataEditor} from "./for-time-data-editor.tsx";

type Props = ActivityProps & {
    activity: ForTime,
};

export function ForTimeDisplay({activity, parentContext, onUpdate: onUpdateDelegate}: Props) {
    const [editing, setEditing] = useState<boolean>(false);

    const currentContext: ActivityContext = {
        editing: parentContext.editing,
        activity: activity,
        childrenActions: [],
    };

    const actions: MoreActionButtonAction[] = [];
    if (currentContext.editing) {
        actions.push({
            label: "Edit",
            icon: <EditIcon/>,
            onClick: () => setEditing(true),
        });
    }

    function onUpdateData(updatedActivity: ForTime) {
        setEditing(false);
        onUpdateDelegate(updatedActivity);
    }

    function onCancelEditData() {
        setEditing(false);
    }

    function onChildActivityUpdate(child: Activity) {
        onUpdateDelegate(activity.updateActivity(child));
    }

    return (
        <>
            <ForTimeDataEditor forTime={activity} editing={editing} onUpdate={onUpdateData} onCancel={onCancelEditData}/>

            <ActivityBox delimiterTitle={ACTIVITY_TYPE_LABELS[activity.type]}
                         innerTitle={activity.duration &&
                             <span>Time Cap: <DurationDisplay duration={activity.duration}/></span>}
                         actions={[...actions, ...parentContext.childrenActions]}>
                <ActivityDisplay activity={activity.activity}
                                 parentContext={currentContext}
                                 onUpdate={onChildActivityUpdate}/>
            </ActivityBox>
        </>
    );
}