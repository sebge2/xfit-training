import style from "./Activity.module.scss";
import {ReactNode} from "react";
import {MoreActionButtonAction, MoreActionsButton} from "../../core/buttton/MoreActionButton.tsx";

type Props = {
    delimiterTitle?: string;
    title?: ReactNode;
    children?: ReactNode;

    actions: MoreActionButtonAction[],
};

export function ActivityBox({delimiterTitle, title, children, actions = []}: Props) {
    const hasDelimiter = delimiterTitle && delimiterTitle.length > 0;
    let boxContentStyle: string;
    if (title) {
        if (children) {
            boxContentStyle = style.activityBoxContentFull;
        } else {
            boxContentStyle = style.activityBoxContentOnlyTitle;
        }
    } else {
        if (children) {
            boxContentStyle = style.activityBoxContentOnlyChildren;
        } else {
            boxContentStyle = style.activityBoxContentEmpty;
        }
    }

    return (
        <div
            className={`${style.activityBox} ${hasDelimiter ? style.activityBoxWithDelimiter : style.activityBoxNoDelimiter}`}>
            {actions.length > 0 && (
                <div className={style.activityBoxActions}>
                    <MoreActionsButton actions={actions}/>
                </div>
            )}

            {hasDelimiter && <div className={style.activityBoxDelimiter}>{delimiterTitle}</div>}

            <div className={`${style.activityBoxContent} ${boxContentStyle}`}>
                {title && <div className={style.activityBoxTitle}>{title}</div>}
                {children && <div className={style.activityBoxChildren}>{children}</div>}
            </div>
        </div>
    );
}