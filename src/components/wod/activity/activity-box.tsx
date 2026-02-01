import style from "./Activity.module.scss";
import {ReactNode} from "react";
import {MoreActionButtonAction, MoreActionsButton} from "../../core/buttton/MoreActionButton.tsx";

type Props = {
    delimiterTitle?: string;
    innerTitle?: ReactNode;
    children?: ReactNode;

    actions: MoreActionButtonAction[],
};

export function ActivityBox({delimiterTitle, innerTitle, children, actions = []}: Props) {
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