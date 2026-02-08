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
    const hasDelimiterTitle = delimiterTitle && delimiterTitle.length > 0;

    return (
        <div className={`${style.activityBox} ${hasDelimiterTitle ? style.activityBoxWithDelimiter : style.activityBoxNoDelimiter}`}>
            {actions.length > 0 && (
                <div className={style.activityBoxActions}>
                    <MoreActionsButton actions={actions}/>
                </div>
            )}

            {hasDelimiterTitle && <div className={style.activityBoxDelimiter}>{delimiterTitle}</div>}

            <div className={style.activityBoxContent}>
                <div className={style.activityBoxTitle}>{innerTitle}</div>

                <div className={style.activityBoxChildren}>
                    {children}
                </div>
            </div>
        </div>
    );
}