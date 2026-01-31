import style from "./Activity.module.scss";
import {ReactNode} from "react";
import {MoreActionButtonAction, MoreActionsButton} from "../../core/buttton/MoreActionButton.tsx";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import MoveUpIcon from '@mui/icons-material/MoveUp';
import {ActivityContext} from "./activity-display.tsx";
import {Sequence} from "../../../model/wod/activity/sequence.ts";

export enum BoxActionType {

    MOVE = 'MOVE',

    DELETE = 'DELETE',

    ADD_INNER_ACTIVITY = 'ADD_INNER_ACTIVITY'
}

type Props = {
    delimiterTitle?: string;
    innerTitle?: ReactNode;
    children?: ReactNode;
    parentContext?: ActivityContext,
    context: ActivityContext,
    onAction: (action: BoxActionType, param?: string) => void,
};

export function ActivityBox({delimiterTitle, innerTitle, children, parentContext, context, onAction}: Props) {
    const actions: MoreActionButtonAction[] = [];

    if (context?.editing) {
        if (context.activity instanceof Sequence) {
            actions.push(
                {
                    label: "Add Inner Activity",
                    onClick: () => onAction(BoxActionType.ADD_INNER_ACTIVITY),
                    icon: <AddIcon fontSize="small"/>
                }
            );
        }

        if (parentContext?.activity) {
            actions.push(
                {
                    label: "Delete",
                    onClick: () => onAction(BoxActionType.DELETE),
                    icon: <DeleteIcon fontSize="small"/>
                }
            );
        }

        if (parentContext?.activity instanceof Sequence && parentContext.activity.activities.length > 1) {
            actions.push(
                {
                    label: "Move",
                    onClick: () => onAction(BoxActionType.MOVE),
                    icon: <MoveUpIcon fontSize="small"/>
                }
            );
        }
    }
    return (
        <div className={style.activityBox}>
            {actions.length > 0 && (
                <div className={style.activityBoxActions}>
                    <MoreActionsButton actions={actions}/>
                </div>
            )}

            {delimiterTitle && <div className={style.activityBoxRightTitle}>
                {delimiterTitle}
            </div>}

            <div className={style.activityBoxContent}>
                {innerTitle && <div className={style.activityBoxTitle}>{innerTitle}</div>}

                <div className={style.activityBoxChildren}>
                    {children}
                </div>
            </div>
        </div>
    );
}